// Payment Settings JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Payment method management
    const paymentMethods = document.querySelectorAll('.payment-method');

    paymentMethods.forEach(method => {
        const setDefaultBtn = method.querySelector('.set-default-btn');
        const removeBtn = method.querySelector('.remove-btn');

        if (setDefaultBtn) {
            setDefaultBtn.addEventListener('click', function() {
                // Remove default from all methods
                document.querySelectorAll('.default-badge').forEach(badge => {
                    badge.classList.add('hidden');
                });

                // Add default to clicked method
                const badge = method.querySelector('.default-badge');
                if (badge) {
                    badge.classList.remove('hidden');
                }

                // Update button states
                document.querySelectorAll('.set-default-btn').forEach(btn => {
                    btn.textContent = 'Set as Default';
                    btn.classList.remove('text-gray-400');
                    btn.classList.add('text-blue-400');
                });

                this.textContent = 'Default';
                this.classList.remove('text-blue-400');
                this.classList.add('text-gray-400');
            });
        }

        if (removeBtn) {
            removeBtn.addEventListener('click', function() {
                if (confirm('Are you sure you want to remove this payment method?')) {
                    method.remove();
                }
            });
        }
    });

    // Add payment method buttons
    const addPaymentButtons = document.querySelectorAll('[data-payment-type]');

    addPaymentButtons.forEach(button => {
        button.addEventListener('click', function() {
            const paymentType = this.getAttribute('data-payment-type');
            alert(`Redirecting to add ${paymentType}...`);
            // In a real implementation, this would redirect to the payment processor
        });
    });

    // Credit card form validation
    const cardForm = document.getElementById('cardForm');
    if (cardForm) {
        cardForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const cardNumber = document.getElementById('cardNumber').value;
            const expiryDate = document.getElementById('expiryDate').value;
            const cvv = document.getElementById('cvv').value;
            const cardholderName = document.getElementById('cardholderName').value;

            // Basic validation
            if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
                alert('Please fill in all fields');
                return;
            }

            if (cardNumber.replace(/\s/g, '').length < 13) {
                alert('Please enter a valid card number');
                return;
            }

            if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
                alert('Please enter expiry date in MM/YY format');
                return;
            }

            if (cvv.length < 3) {
                alert('Please enter a valid CVV');
                return;
            }

            // Simulate successful addition
            alert('Card added successfully!');
            cardForm.reset();
        });
    }

    // Format card number input
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            value = value.replace(/\D/g, '');
            value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            e.target.value = value;
        });
    }

    // Format expiry date input
    const expiryInput = document.getElementById('expiryDate');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }

    // Subscription management
    const changePlanBtn = document.querySelector('.change-plan-btn');
    const cancelSubscriptionBtn = document.querySelector('.cancel-subscription-btn');

    if (changePlanBtn) {
        changePlanBtn.addEventListener('click', function() {
            window.location.href = 'premium.html';
        });
    }

    if (cancelSubscriptionBtn) {
        cancelSubscriptionBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to cancel your subscription? You will lose access to premium features.')) {
                alert('Subscription cancelled. You will retain access until the end of your billing period.');
            }
        });
    }

    // Download invoice buttons
    const downloadButtons = document.querySelectorAll('.download-invoice-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Invoice download started...');
            // In a real implementation, this would trigger a download
        });
    });
});