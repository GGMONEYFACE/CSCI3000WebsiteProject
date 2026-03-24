// Login/Signup JavaScript with Industry-Standard Validation
// Note: This is client-side only for demo. For production security, use server-side authentication with HTTPS, bcrypt, JWT, etc.

document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    loginTab.addEventListener('click', () => switchTab('login'));
    signupTab.addEventListener('click', () => switchTab('signup'));

    function switchTab(tab) {
        if (tab === 'login') {
            loginTab.classList.add('active');
            signupTab.classList.remove('active');
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
        } else {
            signupTab.classList.add('active');
            loginTab.classList.remove('active');
            signupForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
        }
    }

    // Form validation and submission
    loginForm.addEventListener('submit', handleLogin);
    signupForm.addEventListener('submit', handleSignup);

    // Input validation on blur
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });

    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        let error = '';

        switch (field.id) {
            case 'login-email':
            case 'signup-email':
                if (!isValidEmail(value)) {
                    error = 'Please enter a valid email address.';
                }
                break;
            case 'signup-name':
                if (value.length < 2) {
                    error = 'Name must be at least 2 characters.';
                }
                break;
            case 'login-password':
                if (value.length < 1) {
                    error = 'Password is required.';
                }
                break;
            case 'signup-password':
                if (!isStrongPassword(value)) {
                    error = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character.';
                }
                break;
            case 'confirm-password':
                const password = document.getElementById('signup-password').value;
                if (value !== password) {
                    error = 'Passwords do not match.';
                }
                break;
        }

        if (error) {
            showError(field, error);
            return false;
        }
        return true;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isStrongPassword(password) {
        // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return strongRegex.test(password);
    }

    function showError(field, message) {
        clearError({ target: field });
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '0.9rem';
        errorDiv.style.marginTop = '5px';
        field.parentNode.appendChild(errorDiv);
        field.style.borderColor = 'red';
    }

    function clearError(e) {
        const field = e.target;
        const errorMsg = field.parentNode.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
        field.style.borderColor = '#ddd';
    }

    function handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        const remember = document.getElementById('remember').checked;

        if (!validateField({ target: document.getElementById('login-email') }) ||
            !validateField({ target: document.getElementById('login-password') })) {
            return;
        }

        // Mock authentication (replace with real API call)
        const users = JSON.parse(localStorage.getItem('ckafUsers') || '[]');
        const user = users.find(u => u.email === email);

        if (user && user.password === password) { // Insecure: passwords should be hashed
            alert('Login successful!');
            if (remember) {
                localStorage.setItem('loggedInUser', JSON.stringify({ email: user.email, name: user.name }));
            }
            // Redirect to dashboard or something
        } else {
            showError(document.getElementById('login-password'), 'Invalid email or password.');
        }
    }

    function handleSignup(e) {
        e.preventDefault();
        
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const terms = document.getElementById('terms').checked;

        if (!validateField({ target: document.getElementById('signup-name') }) ||
            !validateField({ target: document.getElementById('signup-email') }) ||
            !validateField({ target: document.getElementById('signup-password') }) ||
            !validateField({ target: document.getElementById('confirm-password') })) {
            return;
        }

        if (!terms) {
            alert('Please agree to the Terms of Service.');
            return;
        }

        // Check if user exists
        const users = JSON.parse(localStorage.getItem('ckafUsers') || '[]');
        if (users.find(u => u.email === email)) {
            showError(document.getElementById('signup-email'), 'Email already registered.');
            return;
        }

        // Add user (insecure: no hashing)
        users.push({ name, email, password });
        localStorage.setItem('ckafUsers', JSON.stringify(users));

        alert('Account created successfully! Please log in.');
        switchTab('login');
    }
});