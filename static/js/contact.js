// Particle Background Animation
function createParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 20;
        const duration = Math.random() * 20 + 10;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(212, 175, 55, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            animation: float ${duration}s linear infinite;
            animation-delay: ${delay}s;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// Add particle animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Mobile Menu Toggle
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.setAttribute('aria-expanded', 'false');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const expanded = mobileMenu.classList.contains('active');
        mobileMenuButton.setAttribute('aria-expanded', expanded);
        document.body.classList.toggle('menu-open', expanded);
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
        });
    });
}

// Navbar Scroll Effect
const navbar = document.querySelector('.glass-nav');

const handleNavbarState = () => {
    if (!navbar) return;
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
};

window.addEventListener('scroll', handleNavbarState);
handleNavbarState();

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all items
        faqItems.forEach(faq => faq.classList.remove('active'));
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Form Validation
const contactForm = document.getElementById('contactForm');
const formMessage = document.querySelector('.form-message');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            service: document.getElementById('service').value,
            propertyType: document.getElementById('propertyType').value,
            message: document.getElementById('message').value.trim(),
            preferredDate: document.getElementById('preferredDate').value,
            newsletter: document.getElementById('newsletter').checked
        };
        
        // Basic validation
        if (!formData.firstName || !formData.lastName) {
            showMessage('Please enter your full name.', 'error');
            return;
        }
        
        if (!validateEmail(formData.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        if (!validatePhone(formData.phone)) {
            showMessage('Please enter a valid phone number.', 'error');
            return;
        }
        
        if (formData.service === '') {
            showMessage('Please select a service.', 'error');
            return;
        }
        
        if (!formData.message || formData.message.length < 10) {
            showMessage('Please provide a detailed message (at least 10 characters).', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg> Sending...';
        
        // Simulate form submission (replace with actual API call)
        try {
            await simulateFormSubmission(formData);
            showMessage('Thank you for contacting us! We will get back to you within 24 hours.', 'success');
            contactForm.reset();
        } catch (error) {
            showMessage('Something went wrong. Please try again or contact us directly.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Phone validation (accepts various formats)
function validatePhone(phone) {
    const re = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,5}[-\s\.]?[0-9]{1,5}$/;
    return re.test(phone);
}

// Show form message
function showMessage(message, type) {
    if (!formMessage) return;
    
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Hide success message after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Simulate form submission
function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // In production, replace this with actual API call
            console.log('Form Data:', data);
            resolve();
        }, 2000);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.contact-info-card, .faq-item, .concierge-card, .stat-card, .response-timeline-card, .operations-card, .coverage-card, .social-media-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Input focus animations
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
        this.parentElement.style.transition = 'transform 0.3s ease';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content-wrapper');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 500);
    }
});

// Map interaction - Add custom styling to iframe when loaded
const mapIframe = document.querySelector('.map-wrapper iframe');
if (mapIframe) {
    mapIframe.addEventListener('load', () => {
        console.log('Map loaded successfully');
    });
}

// Real-time form field validation feedback
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

if (emailInput) {
    emailInput.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = '#f44336';
        } else if (this.value) {
            this.style.borderColor = '#4CAF50';
        }
    });
    
    emailInput.addEventListener('input', function() {
        if (this.style.borderColor === 'rgb(244, 67, 54)') {
            this.style.borderColor = 'rgba(212, 175, 55, 0.2)';
        }
    });
}

if (phoneInput) {
    phoneInput.addEventListener('blur', function() {
        if (this.value && !validatePhone(this.value)) {
            this.style.borderColor = '#f44336';
        } else if (this.value) {
            this.style.borderColor = '#4CAF50';
        }
    });
    
    phoneInput.addEventListener('input', function() {
        if (this.style.borderColor === 'rgb(244, 67, 54)') {
            this.style.borderColor = 'rgba(212, 175, 55, 0.2)';
        }
    });
}

// Character counter for message textarea
const messageTextarea = document.getElementById('message');
if (messageTextarea) {
    const charCountDiv = document.createElement('div');
    charCountDiv.style.cssText = 'text-align: right; font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;';
    charCountDiv.textContent = '0 characters';
    messageTextarea.parentElement.appendChild(charCountDiv);
    
    messageTextarea.addEventListener('input', function() {
        const length = this.value.length;
        charCountDiv.textContent = `${length} characters`;
        
        if (length < 10 && length > 0) {
            charCountDiv.style.color = '#f44336';
        } else if (length >= 10) {
            charCountDiv.style.color = '#4CAF50';
        } else {
            charCountDiv.style.color = 'var(--text-muted)';
        }
    });
}

// Initialize particles on page load
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    
    // Add stagger animation to contact cards
    const contactCards = document.querySelectorAll('.contact-info-card');
    contactCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// WhatsApp float button animation
const whatsappFloat = document.querySelector('.whatsapp-float');
if (whatsappFloat) {
    let pulseInterval = setInterval(() => {
        whatsappFloat.style.transform = 'scale(1.1)';
        setTimeout(() => {
            whatsappFloat.style.transform = 'scale(1)';
        }, 300);
    }, 3000);
    
    whatsappFloat.addEventListener('mouseenter', () => {
        clearInterval(pulseInterval);
    });
}

// Set minimum date for date picker to today
const dateInput = document.getElementById('preferredDate');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Add active class to current nav link
const currentPage = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});
