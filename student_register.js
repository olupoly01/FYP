// Form submission handling
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const coursesField = document.getElementById('courses');
    const courseError = document.getElementById('courseError');
    const selfieField = document.getElementById('selfie');
    const selfieError = document.getElementById('selfieError');
    
    const courses = coursesField.value.split(',').map(course => course.trim()).filter(course => course !== '');

    let isValid = true;

    // Validate courses
    if (courses.length >= 9) {
        courseError.style.display = 'none';
    } else {
        courseError.style.display = 'block';
        isValid = false;
    }

    // Validate selfie upload
    if (selfieField.files.length > 0) {
        selfieError.style.display = 'none';
    } else {
        selfieError.style.display = 'block';
        isValid = false;
    }

    // If all validations pass, show feedback modal
    if (isValid) {
        showFeedbackModal();
    }
});


// Function to show feedback modal
function showFeedbackModal() {
    const loadingMessage = document.getElementById('loadingMessage');
    const feedbackModal = document.getElementById('feedbackModal');
    const closeBtn = document.querySelector('.close-btn');

    // Show loading message
    loadingMessage.style.display = 'block';

    setTimeout(() => {
        // Hide loading message and show modal
        loadingMessage.style.display = 'none';
        feedbackModal.style.display = 'flex';

        // Close modal on clicking the close button
        closeBtn.addEventListener('click', () => {
            feedbackModal.style.display = 'none';
            window.location.href = 'index.html';
        });
    }, 2000); // 2-second delay
}
