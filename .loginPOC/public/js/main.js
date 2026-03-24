// Client-side JavaScript for CKAF POC

// Password strength validation
function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength &&
           hasUpperCase &&
           hasLowerCase &&
           hasNumbers &&
           hasSpecialChar;
}

// Real-time password validation for signup
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirmPassword');

    if (passwordInput && confirmInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const isValid = validatePassword(password);

            this.style.borderColor = isValid ? '#28a745' : '#dc3545';

            // Also check confirm password match
            if (confirmInput.value) {
                confirmInput.style.borderColor = (confirmInput.value === password) ? '#28a745' : '#dc3545';
            }
        });

        confirmInput.addEventListener('input', function() {
            const password = passwordInput.value;
            const confirm = this.value;

            this.style.borderColor = (confirm === password) ? '#28a745' : '#dc3545';
        });
    }
});

// Form validation before submit
function validateForm(formType) {
    if (formType === 'signup') {
        const password = document.getElementById('password').value;
        const confirm = document.getElementById('confirmPassword').value;

        if (!validatePassword(password)) {
            alert('Password must be at least 8 characters with uppercase, lowercase, number, and special character.');
            return false;
        }

        if (password !== confirm) {
            alert('Passwords do not match.');
            return false;
        }
    }

    return true;
}

// Add form validation to signup form
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.querySelector('form[action="/auth/signup"]');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            if (!validateForm('signup')) {
                e.preventDefault();
            }
        });
    }
});