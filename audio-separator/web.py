import sys
sys.path.insert(0, r"C:\Users\simel\AppData\Local\Packages\PythonSoftwareFoundation.Python.3.13_qbz5n2kfra8p0\LocalCache\local-packages\Python313\site-packages")

import os
os.environ['PYTHONPATH'] = r"C:\Users\simel\AppData\Local\Packages\PythonSoftwareFoundation.Python.3.13_qbz5n2kfra8p0\LocalCache\local-packages\Python313\site-packages"

import tempfile
import uuid
from pathlib import Path

from flask import Flask, jsonify, render_template, request
from werkzeug.utils import secure_filename

from app import separate_audio

ALLOWED_EXTENSIONS = {"mp3", "wav", "flac", "ogg", "m4a", "aac"}
app = Flask(__name__, static_folder="static", static_url_path="/static", template_folder="templates")
app.secret_key = "replace-this-secret"

STORAGE_DIR = Path(app.static_folder) / "outputs"
STORAGE_DIR.mkdir(parents=True, exist_ok=True)


def allowed_file(filename: str) -> bool:
    return "." in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")


@app.route("/separate", methods=["POST"])
def upload_and_separate():
    uploaded_file = request.files.get("audio_file")
    stems = request.form.get("stems", "2")

    if not uploaded_file or uploaded_file.filename == "":
        return jsonify({"error": "Please select an audio file to upload."}), 400

    if not allowed_file(uploaded_file.filename):
        return jsonify({"error": "Only audio files are supported. Please choose MP3, WAV, FLAC, OGG, M4A, or AAC."}), 400

    try:
        stems_value = int(stems)
    except ValueError:
        stems_value = 2

    if stems_value not in (2, 4):
        stems_value = 2

    filename = secure_filename(uploaded_file.filename)

    try:
        request_id = uuid.uuid4().hex
        session_dir = STORAGE_DIR / request_id
        session_dir.mkdir(parents=True, exist_ok=True)

        input_path = session_dir / filename
        output_path = session_dir
        uploaded_file.save(str(input_path))

        output_dir = separate_audio(str(input_path), str(output_path), stems=stems_value)

        stems_data = []
        for stem_file in output_dir.rglob("*.wav"):
            if stem_file.is_file():
                stem_name = stem_file.stem
                rel_path = stem_file.relative_to(Path(app.static_folder))
                stems_data.append({
                    "name": stem_name,
                    "url": f"/{app.static_url_path.strip('/')}/{rel_path.as_posix()}"
                })

        if not stems_data:
            return jsonify({"error": "No stems were generated. Please try a different file."}), 500

        return jsonify({"stems": stems_data})
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.route("/download_zip", methods=["POST"])
def download_zip():
    # This is a simplified version; in real app, store session data
    return jsonify({"error": "ZIP download not implemented yet"}), 400


if __name__ == "__main__":
    app.run(debug=True, use_reloader=False, port=5001)
