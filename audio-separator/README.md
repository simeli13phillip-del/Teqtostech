# TeQtos Steamer

A simple Python app to separate vocals and instrumentals from audio files, suitable for DJ tools and remix creation.

## Features
- Extracts vocals (acapella) and instrument tracks from audio
- Supports 2-stem separation (`vocals` + `accompaniment`)
- Easy CLI workflow for batch processing

## Requirements
- Python 3.10 recommended for Spleeter compatibility
- `ffmpeg` installed and available on your PATH

## Setup
1. Create a Python virtual environment with the Python 3.10 launcher:

```powershell
py -3.10 -m venv venv
```

2. Activate the environment:

- Windows PowerShell:
  ```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\venv\Scripts\Activate.ps1
```
- Windows CMD:
  ```cmd
venv\Scripts\activate.bat
```
- macOS / Linux:
  ```bash
source venv/bin/activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

## Usage

```bash
python app.py --input path/to/song.mp3 --output path/to/output --stems 2
```

Example:

```bash
python app.py --input sample.mp3 --output separated --stems 2
```

The output folder will contain separate files for each stem.

## Web UI

A small drag-and-drop web interface is available using Flask.

1. Install dependencies:

```bash
pip install -r requirements.txt
```

2. Run the web app:

```bash
python web.py
```

3. Open your browser and visit:

```text
http://127.0.0.1:5000/
```

4. Drag an audio file into the upload area or choose one with the file picker.

The app will return a ZIP archive containing separated stems.

## Notes
- `2` stems produces `vocals` and `accompaniment`
- `4` stems produces `vocals`, `drums`, `bass`, and `other`
- For DJ tooling, you can use the separated stems in remix software or DJ apps
