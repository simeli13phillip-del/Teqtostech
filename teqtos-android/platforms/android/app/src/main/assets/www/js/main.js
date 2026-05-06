// TeQtos Main JavaScript

// Check authentication state and update navigation
document.addEventListener('DOMContentLoaded', function() {
    checkAuthState();

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });

        // Close menu when a link is clicked
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Simple validation
            if (name && email && subject && message) {
                // Show success message
                showSuccessMessage();
                
                // Reset form
                contactForm.reset();
                
                // In a real application, you would send this data to a server
                console.log('Form submitted:', { name, email, subject, message });
            }
        });
    }

    // Top Candidates Section Enhancements
    const candidateCards = document.querySelectorAll('.bg-gray-800.rounded-xl.overflow-hidden.shadow-xl');

    candidateCards.forEach(card => {
        // Add entrance animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        // Trigger animation on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        observer.observe(card);

        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Skill tags hover effect
    const skillTags = document.querySelectorAll('.bg-gray-700.text-gray-300.px-2.py-1.rounded');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#3b82f6';
            this.style.color = 'white';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
            this.style.color = '';
        });
    });

    // Smooth scroll for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Function to show success message
function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.classList.remove('hidden');
        
        // Hide message after 5 seconds
        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 5000);
    }
}

// Scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add active nav link indicator
function updateActiveNavLink() {
    const links = document.querySelectorAll('nav a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        const linkPage = href.split('/').pop();
        
        if (linkPage === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('text-blue-600', 'font-semibold');
        } else {
            link.classList.remove('text-blue-600', 'font-semibold');
        }
    });
}

// Call on page load
updateActiveNavLink();

// Authentication state management
function checkAuthState() {
    const userData = localStorage.getItem('teqtos_user');
    
    if (userData) {
        const user = JSON.parse(userData);
        if (user.isLoggedIn) {
            // User is logged in - update navigation
            updateNavForLoggedInUser(user);
        }
    }
}

function updateNavForLoggedInUser(user) {
    // Find the auth buttons in desktop navigation
    const desktopNav = document.getElementById('desktop-auth-nav');
    if (desktopNav) {
        // Replace sign in/join buttons with user info and logout
        const userInfo = document.createElement('div');
        userInfo.className = 'flex items-center space-x-4';
        
        const userName = document.createElement('span');
        userName.className = 'text-gray-300';
        userName.textContent = `Welcome, ${user.firstName || user.email.split('@')[0]}!`;
        
        const logoutBtn = document.createElement('button');
        logoutBtn.className = 'text-gray-300 hover:text-red-400 transition px-4 py-2';
        logoutBtn.textContent = 'Sign Out';
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('teqtos_user');
            location.reload();
        });
        
        userInfo.appendChild(userName);
        userInfo.appendChild(logoutBtn);
        
        // Replace the auth buttons
        desktopNav.innerHTML = '';
        desktopNav.appendChild(userInfo);
    }
    
    // Update mobile menu as well
    const mobileAuthSection = document.getElementById('mobile-auth-section');
    if (mobileAuthSection) {
        mobileAuthSection.innerHTML = `
            <div class="text-gray-300 py-2">Welcome, ${user.firstName || user.email.split('@')[0]}!</div>
            <button class="block w-full text-left text-gray-300 hover:text-red-400 py-2" onclick="localStorage.removeItem('teqtos_user'); location.reload();">Sign Out</button>
        `;
    }
}
