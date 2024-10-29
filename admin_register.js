document.addEventListener("DOMContentLoaded", () => {
    const adminForm = document.getElementById("adminRegistrationForm");
    const usernameInput = document.getElementById("username");
    const facultyInput = document.getElementById("faculty");
    const passwordInput = document.getElementById("adminPassword");

    const usernameError = document.getElementById("usernameError");
    const facultyError = document.getElementById("facultyError");
    const passwordError = document.getElementById("adminPasswordError");

    const loadingText = document.getElementById("loadingText");
    const successMessage = document.getElementById("successMessage");

    const predefinedAdminPassword = "password";

    adminForm.addEventListener("submit", (e) => {
        e.preventDefault();
        usernameError.style.display = "none";
        facultyError.style.display = "none";
        passwordError.style.display = "none";

        let valid = true;

        if (!usernameInput.value.trim()) {
            usernameError.style.display = "block";
            valid = false;
        }

        if (!facultyInput.value.trim()) {
            facultyError.style.display = "block";
            valid = false;
        }

        if (passwordInput.value !== predefinedAdminPassword) {
            passwordError.style.display = "block";
            passwordError.innerText = "Invalid admin password. Please use the provided admin registration password.";
            valid = false;
        }

        if (valid) {
            loadingText.style.display = "block";

            setTimeout(() => {
                loadingText.style.display = "none";
                successMessage.style.display = "block";

                setTimeout(() => {
                    window.location.href = "index.html"; // Redirect to home page after 2 seconds
                }, 2000);
            }, 1000);
        }
    });
});
