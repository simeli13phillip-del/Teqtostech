// Authentication Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const signinTab = document.getElementById('signinTab');
    const signupTab = document.getElementById('signupTab');
    const signinForm = document.getElementById('signinForm');
    const signupForm = document.getElementById('signupForm');

    // Check URL parameters to determine which tab to show
    const urlParams = new URLSearchParams(window.location.search);
    const activeTab = urlParams.get('tab');

    if (activeTab === 'signup') {
        // Show signup tab
        signupTab.classList.add('bg-gray-700', 'text-white');
        signupTab.classList.remove('text-gray-400');
        signinTab.classList.remove('bg-gray-700', 'text-white');
        signinTab.classList.add('text-gray-400');

        signupForm.classList.remove('hidden');
        signinForm.classList.add('hidden');
    } else {
        // Default to signin tab
        signinTab.classList.add('bg-gray-700', 'text-white');
        signinTab.classList.remove('text-gray-400');
        signupTab.classList.remove('bg-gray-700', 'text-white');
        signupTab.classList.add('text-gray-400');

        signinForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
    }

    // Tab switching functionality
    signinTab.addEventListener('click', function() {
        signinTab.classList.add('bg-gray-700', 'text-white');
        signinTab.classList.remove('text-gray-400');
        signupTab.classList.remove('bg-gray-700', 'text-white');
        signupTab.classList.add('text-gray-400');

        signinForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
    });

    signupTab.addEventListener('click', function() {
        signupTab.classList.add('bg-gray-700', 'text-white');
        signupTab.classList.remove('text-gray-400');
        signinTab.classList.remove('bg-gray-700', 'text-white');
        signinTab.classList.add('text-gray-400');

        signupForm.classList.remove('hidden');
        signinForm.classList.add('hidden');
    });

    // Form validation and submission
    const signinFormElement = document.querySelector('#signinForm form');
    const signupFormElement = document.querySelector('#signupForm form');

    signinFormElement.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('signinEmail').value;
        const password = document.getElementById('signinPassword').value;

        if (email && password) {
            // Simulate login success and store user session
            const userData = {
                email: email,
                isLoggedIn: true,
                loginTime: new Date().toISOString()
            };
            localStorage.setItem('teqtos_user', JSON.stringify(userData));

            showMessage('Sign in successful! Welcome back to TeQtos.', 'success');
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1500);
        } else {
            showMessage('Please fill in all fields', 'error');
        }
    });

    signupFormElement.addEventListener('submit', function(e) {
        e.preventDefault();

        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const accountType = document.querySelector('input[name="accountType"]:checked');

        if (firstName && lastName && email && password && accountType) {
            if (password.length < 6) {
                showMessage('Password must be at least 6 characters', 'error');
                return;
            }

            // Store user data
            const userData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                accountType: accountType.value,
                isLoggedIn: true,
                signupTime: new Date().toISOString()
            };
            localStorage.setItem('teqtos_user', JSON.stringify(userData));

            // Log account type for demonstration
            console.log('Account type:', accountType.value);

            showMessage('Account created successfully! Welcome to TeQtos.', 'success');
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1500);
        } else {
            showMessage('Please fill in all fields and select account type', 'error');
        }
    });
});

function showMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.auth-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `auth-message fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
        type === 'success'
            ? 'bg-green-500 text-white'
            : 'bg-red-500 text-white'
    }`;
    messageDiv.textContent = message;

    document.body.appendChild(messageDiv);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}