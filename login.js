const form = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const loading = document.getElementById('loading');

// Set your known password here for validation
const correctPassword = "password"; 

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    let valid = true;

    // Clear previous error messages
    usernameError.style.display = 'none';
    passwordError.style.display = 'none';

    // Validate username
    if (usernameInput.value.trim() === '') {
        usernameError.style.display = 'block';
        valid = false;
    }

    // Validate password
    if (passwordInput.value.trim() === '') {
        passwordError.style.display = 'block';
        valid = false;
    } else if (passwordInput.value !== correctPassword) {
        passwordError.innerText = "Incorrect password.";
        passwordError.style.display = 'block';
        valid = false;
    }

    // If valid, simulate form submission and redirect
    if (valid) {
        loading.style.display = 'block';  // Show loading message
        setTimeout(() => {
            loading.style.display = 'none';  // Hide loading message
            alert('Login successful');
            window.location.href = 'scan.html'; // Redirect to the scan page after successful login
        }, 2000);  // Simulate a delay of 2 seconds
    }
});
