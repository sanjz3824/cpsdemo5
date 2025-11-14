

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    console.log('Physics PhD Landing Page loaded successfully!');
    
    // Initialize all functionality
    initSmoothScrolling();
    initBackToTop();
    initScrollAnimations();
    initMobileMenu();
    initParticleEffects();
    initContactForm();
    addFormMessageStyles();
});

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Back to Top Button Functionality
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (!backToTopButton) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll Animations for Sections
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 0.8s ease forwards`;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Mobile Menu Toggle Functionality
function initMobileMenu() {
    // Create mobile menu toggle button if not exists
    const header = document.querySelector('.header');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!header || !navMenu) return;
    
    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'mobile-toggle';
    toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
    toggleButton.setAttribute('aria-label', 'Toggle navigation');
    
    header.appendChild(toggleButton);
    
    // Toggle menu visibility
    toggleButton.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        toggleButton.classList.toggle('active');
        
        // Change icon
        if (toggleButton.classList.contains('active')) {
            toggleButton.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            toggleButton.classList.remove('active');
            toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Particle Animation Effects
function initParticleEffects() {
    // Create subtle particle effects for physics theme
    const createParticles = () => {
        const container = document.body;
        const particleCount = Math.min(50, window.innerWidth / 100);
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: fixed;
                width: 2px;
                height: 2px;
                background: rgba(57, 73, 171, 0.3);
                border-radius: 50%;
                pointer-events: none;
                z-index: -1;
                animation: float ${3 + Math.random() * 4}s infinite;
                left: ${Math.random() * 100}vw;
                top: ${Math.random() * 100}vh;
                opacity: ${0.1 + Math.random() * 0.3};
            `;
            container.appendChild(particle);
        }
    };
    
    // Add keyframes for float animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-10px) rotate(2deg); }
            66% { transform: translateY(-5px) rotate(-2deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Create particles on load and resize
    createParticles();
    window.addEventListener('resize', () => {
        // Remove old particles
        document.querySelectorAll('.particle').forEach(p => p.remove());
        createParticles();
    });
}

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        submitForm(formData);
    });
}

// Form submission handler
async function submitForm(formData) {
    try {
        // Show loading state
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success
        showFormMessage('Message sent successfully! I will get back to you soon.', 'success');
        document.getElementById('contact-form').reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
    } catch (error) {
        showFormMessage('Failed to send message. Please try again.', 'error');
        document.querySelector('.submit-btn').disabled = false;
    }
}

// Show form messages
function showFormMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        background: ${type === 'success' ? 'var(--success)' : 'var(--error)'};
        color: white;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
        text-align: center;
    `;
    
    document.body.appendChild(messageDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
}

// Add keyframes for form messages
function addFormMessageStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Accessibility Enhancements
function initAccessibility() {
    // Add ARIA labels and roles
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.setAttribute('role', 'region');
        section.setAttribute('aria-label', section.id || `section-${index}`);
    });
    
    // Enhance keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu if open
            const mobileToggle = document.querySelector('.mobile-toggle');
            const navMenu = document.querySelector('.nav-menu');
            
            if (mobileToggle && navMenu) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
}

// Performance Optimizations
function initPerformance() {
    // Lazy load images if needed
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.loading !== 'lazy') {
            img.loading = 'lazy';
        }
    });
    
    // Optimize animations for performance
    const animatedElements = document.querySelectorAll('.research-card, .publication-card');
    animatedElements.forEach(el => {
        el.style.willChange = 'transform';
    });
}

// Initialize accessibility and performance
document.addEventListener('DOMContentLoaded', function() {
    initAccessibility();
    initPerformance();
});
