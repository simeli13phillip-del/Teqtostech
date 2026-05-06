const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('audio-file');
const browseButton = document.getElementById('browse-button');
const fileName = document.getElementById('file-name');
const uploadForm = document.getElementById('upload-form');
const progressDiv = document.getElementById('progress');
const resultsDiv = document.getElementById('results');
const stemsContainer = document.getElementById('stems-container');
const downloadButton = document.getElementById('download-button');

let zipUrl = null;

function updateFileLabel(file) {
  fileName.textContent = file ? file.name : 'No file selected';
}

browseButton.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', () => {
  updateFileLabel(fileInput.files[0]);
});

dropZone.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (event) => {
  event.preventDefault();
  dropZone.classList.remove('dragover');

  const droppedFiles = event.dataTransfer.files;
  if (droppedFiles.length > 0) {
    fileInput.files = droppedFiles;
    updateFileLabel(droppedFiles[0]);
  }
});

uploadForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(uploadForm);

  // Hide form and show progress
  uploadForm.style.display = 'none';
  progressDiv.style.display = 'block';

  // Simulate progress
  const progressFill = document.querySelector('.progress-fill');
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 10;
    if (progress > 90) progress = 90;
    progressFill.style.width = progress + '%';
  }, 500);

  try {
    const response = await fetch('/separate', {
      method: 'POST',
      body: formData,
    });

    clearInterval(interval);
    progressFill.style.width = '100%';

    if (response.ok) {
      const data = await response.json();

      if (data.error) {
        alert(data.error);
        resetForm();
        return;
      }

      // Show results
      progressDiv.style.display = 'none';
      resultsDiv.style.display = 'block';

      stemsContainer.innerHTML = '';
      data.stems.forEach(stem => {
        const player = document.createElement('div');
        player.className = 'stem-player';
        player.innerHTML = `
          <label>${stem.name}</label>
          <audio controls>
            <source src="${stem.url}" type="audio/wav">
          </audio>
        `;
        stemsContainer.appendChild(player);
      });
    } else {
      alert('Error separating audio. Please try again.');
      resetForm();
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error separating audio. Please try again.');
    resetForm();
  }
});

downloadButton.addEventListener('click', async () => {
  // For demo, trigger a separate download; in real app, have a ZIP endpoint
  const formData = new FormData(uploadForm);
  const response = await fetch('/download_zip', {
    method: 'POST',
    body: formData,
  });
  if (response.ok) {
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'separated_stems.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
});

function resetForm() {
  uploadForm.style.display = 'block';
  progressDiv.style.display = 'none';
  resultsDiv.style.display = 'none';
  document.querySelector('.progress-fill').style.width = '0%';
}
