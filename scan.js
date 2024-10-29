const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const loadingMessage = document.getElementById('loadingMessage');

// Access the camera and stream to video element
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(error => {
        console.error("Error accessing the camera: ", error);
    });

// Capture photo function
function capturePhoto() {
    loadingMessage.style.display = 'block';

    // Draw the current frame from the video on the canvas
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to data URL (base64) and send it to the backend
    const imageData = canvas.toDataURL('image/png');
    
    fetch('scan_student.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageData })
    })
    .then(response => response.json())
    .then(data => {
        loadingMessage.style.display = 'none';
        if (data.success) {
            window.location.href = `student_details.html?id=${data.student_id}`;
        } else {
            alert('Student not recognized.');
        }
    })
    .catch(error => {
        loadingMessage.style.display = 'none';
        console.error('Error processing scan:', error);
        alert('An error occurred. Please try again.');
    });
}
