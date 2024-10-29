// JavaScript to handle form validation, camera functionality, and form submission

// Next button event to validate form and ensure 9+ courses are entered
document.getElementById('nextBtn').addEventListener('click', function() {
    const form = document.getElementById('registrationForm');
    const coursesField = document.getElementById('courses');
    const courseError = document.getElementById('courseError');

    // Validate form fields
    if (form.checkValidity()) {
        const courses = coursesField.value.split(',').map(course => course.trim()).filter(course => course !== '');

        // Validate courses length (must be 9 or more)
        if (courses.length >= 9) {
            courseError.style.display = 'none';  // Hide error if validation passes
            document.getElementById('form-container').style.display = 'none';
            document.getElementById('camera-section').style.display = 'block';
        } else {
            courseError.style.display = 'block';  // Show error if validation fails
        }
    } else {
        form.reportValidity();  // Trigger built-in validation messages
    }
});

// Access camera and handle video stream
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snapButton = document.getElementById('snap');
const recaptureButton = document.getElementById('recapture');
const submitButton = document.getElementById('submitBtn');
const imageData = document.getElementById('imageData');
const loadingMessage = document.getElementById('loadingMessage');
const context = canvas.getContext('2d');

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(error => {
        alert("Unable to access camera. Please check your settings.");
        console.error("Error accessing the camera:", error);
    });

// Capture photo and save as base64 string
snapButton.addEventListener('click', () => {
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    // Set canvas dimensions to video size
    canvas.width = videoWidth;
    canvas.height = videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Show canvas and hide video
    canvas.style.display = 'block';
    video.style.display = 'none';

    // Toggle visibility of buttons
    snapButton.style.display = 'none';
    recaptureButton.style.display = 'block';
    submitButton.style.display = 'block';

    // Store image data as base64
    const dataUrl = canvas.toDataURL('image/png');
    imageData.value = dataUrl;
    // BACKEND NOTE: Send `imageData` alongside other form data to save in the database
});

// Recapture photo to show video again
recaptureButton.addEventListener('click', () => {
    context.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas
    canvas.style.display = 'none';
    video.style.display = 'block';

    // Toggle buttons
    snapButton.style.display = 'block';
    recaptureButton.style.display = 'none';
    submitButton.style.display = 'none';
});

// Submit form with loading message and redirect
document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent actual form submission

    // Show loading message and disable submit button
    loadingMessage.style.display = 'block';
    submitButton.disabled = true;

    setTimeout(() => {
        // Simulate submission delay, then redirect to home page
        window.location.href = 'index.html';
    }, 2000);  // Adjust delay as needed (2 seconds here)
});

document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent actual form submission
    const loadingMessage = document.getElementById('loadingMessage');
    const feedbackModal = document.getElementById('feedbackModal');
    const closeBtn = document.querySelector('.close-btn');

    // Show loading message
    loadingMessage.style.display = 'block';

    setTimeout(() => {
        // Hide loading, show feedback modal
        loadingMessage.style.display = 'none';
        feedbackModal.style.display = 'block'; // Change to 'block' instead of 'flex'
        console.log("Feedback modal displayed");
    }, 2000);

    // Close modal when "X" button is clicked
    closeBtn.addEventListener('click', () => {
        feedbackModal.style.display = 'none';
        window.location.href = 'index.html';
    });
});
