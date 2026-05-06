import sys
sys.path.insert(0, r"C:\Users\simel\AppData\Local\Packages\PythonSoftwareFoundation.Python.3.13_qbz5n2kfra8p0\LocalCache\local-packages\Python313\site-packages")

import argparse
import os
import warnings
from pathlib import Path

warnings.filterwarnings("ignore")


def find_ffmpeg_dir() -> str | None:
    candidates = [
        r"C:\ffmpeg\bin",
        r"C:\ffmpeg\ffmpeg-8.1-full_build\bin",
        r"C:\Program Files\ffmpeg\bin",
        r"C:\Program Files (x86)\ffmpeg\bin",
        r"C:\Users\simel\ffmpeg\bin",
        r"C:\Users\simel\AppData\Local\Programs\ffmpeg\bin",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return candidate
    return None


def try_demucs_separation(input_path: str, output_path: str, stems: int = 2) -> Path | None:
    """Try Demucs separation with timeout using stronger AI models."""
    import subprocess
    
    input_file = Path(input_path)
    output_dir = Path(output_path)
    
    models = ["htdemucs", "mdx_extra", "mdx_extra_q"]
    for model in models:
        demucs_cmd = [
            sys.executable, "-m", "demucs",
            "-n", model,
            "-d", "cpu",
            "--two-stems", "vocals",
            "--shifts", "2",
            "--overlap", "0.25",
            "-j", "4",
            "-o", str(output_dir),
            str(input_file)
        ]

        try:
            print(f"Trying Demucs model: {model}")
            result = subprocess.run(demucs_cmd, timeout=300, capture_output=True, text=True)
            print(f"Demucs stdout (model={model}): {result.stdout}")
            print(f"Demucs stderr (model={model}): {result.stderr}")
            if result.returncode != 0:
                print(f"Demucs model {model} failed with return code {result.returncode}")
                continue

            demucs_out = output_dir / model / input_file.stem
            if demucs_out.exists():
                print(f"Demucs separation successful with model {model}.")
                return demucs_out
            print(f"Demucs model {model} completed but output directory not found: {demucs_out}")
        except subprocess.TimeoutExpired:
            print(f"Demucs model {model} timed out after 300s.")
        except Exception as e:
            print(f"Demucs error with model {model}: {e}")

    print("All Demucs models failed, falling back to librosa.")
    return None


def try_librosa_separation(input_path: str, output_path: str, stems: int = 2) -> Path:
    """Lightweight librosa-based separation using HPSS."""
    try:
        import librosa
        import soundfile as sf
        import numpy as np
    except ImportError:
        raise RuntimeError("librosa or soundfile not installed. Install with: pip install librosa soundfile")
    
    input_file = Path(input_path)
    output_dir = Path(output_path)
    output_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"Loading audio with librosa: {input_file.name}")
    y, sr = librosa.load(str(input_file), sr=None, mono=False)
    
    if y.ndim == 1:
        y = np.array([y, y])
    
    # Convert to mono for separation if stereo
    if y.shape[0] > 1:
        y_mono = librosa.to_mono(y)
    else:
        y_mono = y[0]
    
    print("Separating using Harmonic-Percussive Source Separation (HPSS)...")
    # HPSS: harmonic (vocals) vs percussive (instruments) - tuned for better separation
    y_harm, y_perc = librosa.effects.hpss(y_mono, kernel_size=61, margin=2.0)
    
    # For stereo output, expand mono stems to stereo
    if y.shape[0] > 1:
        # Use original stereo width
        vocals = np.tile(y_harm, (2, 1))
        accomp = np.tile(y_perc, (2, 1))
    else:
        vocals = np.array([y_harm, y_harm])
        accomp = np.array([y_perc, y_perc])
    
    result_dir = output_dir / "librosa" / input_file.stem
    result_dir.mkdir(parents=True, exist_ok=True)
    
    # Save stems
    vocals_out = result_dir / "vocals.wav"
    no_vocals_out = result_dir / "no_vocals.wav"
    
    sf.write(str(vocals_out), vocals.T, sr)  # Transpose for soundfile
    sf.write(str(no_vocals_out), accomp.T, sr)
    
    print(f"Separation complete. Results in: {result_dir}")
    return result_dir


def separate_audio(input_path: str, output_path: str, stems: int = 2) -> Path:
    input_file = Path(input_path)
    output_dir = Path(output_path)

    if not input_file.exists():
        raise FileNotFoundError(f"Input file not found: {input_file}")

    if stems not in (2, 4):
        raise ValueError("Stems must be 2 or 4.")

    output_dir.mkdir(parents=True, exist_ok=True)

    ffmpeg_dir = find_ffmpeg_dir()
    if ffmpeg_dir:
        os.environ["PATH"] = f"{ffmpeg_dir}{os.pathsep}{os.environ.get('PATH', '')}"
        print(f"Using ffmpeg from: {ffmpeg_dir}")

    print(f"Separating '{input_file.name}' into {stems} stems...")
    
    # Try Demucs first
    result = try_demucs_separation(str(input_file), str(output_dir), stems)
    if result:
        return result
    
    # Fallback to librosa
    print("Using librosa fallback...")
    return try_librosa_separation(str(input_file), str(output_dir), stems)


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Extract vocals and instrument stems from audio files."
    )
    parser.add_argument(
        "--input", "-i", required=True, help="Path to the input audio file."
    )
    parser.add_argument(
        "--output", "-o", required=True, help="Directory where separated stems are saved."
    )
    parser.add_argument(
        "--stems",
        type=int,
        choices=[2, 4],
        default=2,
        help="Number of stems to separate (2 or 4).",
    )
    return parser


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()
    separate_audio(args.input, args.output, args.stems)


if __name__ == "__main__":
    main()
