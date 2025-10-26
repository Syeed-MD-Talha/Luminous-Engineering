// Premium Interactive Functionality for Luminous Engineering

class PremiumWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupParticles();
        this.setupScrollReveal();
        this.setupTextAnimations();
        this.setupStatsCounter();
        this.setupServiceCards();
        this.setupNavigation();
        this.setupCTAButtons();
    }

    // Floating Particles Animation
    setupParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random positioning
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Random animation duration
            const duration = 3 + Math.random() * 4;
            particle.style.animation = `float ${duration}s ease-in-out infinite`;
            particle.style.animationDelay = Math.random() * 2 + 's';
            
            particlesContainer.appendChild(particle);
        }

        // Add CSS animation for particles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
                25% { transform: translateY(-20px) translateX(10px); opacity: 1; }
                50% { transform: translateY(-10px) translateX(-10px); opacity: 0.8; }
                75% { transform: translateY(-30px) translateX(5px); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    // Scroll Reveal Animation
    setupScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });
    }

    // Text Splitting Animation
    setupTextAnimations() {
        // Initialize Splitting.js for text animations
        if (typeof Splitting !== 'undefined') {
            Splitting();
        }

        // Animate hero title
        const heroTitle = document.querySelector('[data-splitting]');
        if (heroTitle) {
            const chars = heroTitle.querySelectorAll('.char');
            
            anime({
                targets: chars,
                opacity: [0, 1],
                translateY: [50, 0],
                rotateZ: [10, 0],
                duration: 800,
                delay: anime.stagger(50),
                easing: 'easeOutExpo'
            });
        }
    }

    // Animated Stats Counter
    setupStatsCounter() {
        const counters = document.querySelectorAll('.stats-counter');
        
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.count);
                    
                    anime({
                        targets: counter,
                        innerHTML: [0, target],
                        duration: 2000,
                        round: 1,
                        easing: 'easeOutExpo',
                        update: function(anim) {
                            counter.innerHTML = Math.round(anim.animatables[0].target.innerHTML);
                        }
                    });
                    
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    // Service Cards Interactive Effects
    setupServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                anime({
                    targets: card,
                    scale: 1.02,
                    rotateX: 5,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                anime({
                    targets: card,
                    scale: 1,
                    rotateX: 0,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
        });
    }

    // Smooth Navigation
    setupNavigation() {
        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navigation background on scroll
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('.glass-nav');
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(26, 26, 26, 0.95)';
            } else {
                nav.style.background = 'rgba(26, 26, 26, 0.9)';
            }
        });
    }

    // CTA Buttons Functionality
    setupCTAButtons() {
        // Get Quote buttons
        document.querySelectorAll('.btn-primary').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.showQuoteModal();
            });
        });

        // Call Now button
        const callButton = document.querySelector('button:contains("Call Now")');
        if (callButton) {
            callButton.addEventListener('click', () => {
                window.location.href = 'tel:+6591234567';
            });
        }
    }

    // Quote Modal
    showQuoteModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 border border-yellow-400">
                <div class="text-center mb-6">
                    <h3 class="text-2xl font-bold text-yellow-400 mb-2">Get Your Free Quote</h3>
                    <p class="text-gray-300">Tell us about your project and get an instant estimate</p>
                </div>
                
                <form class="space-y-4">
                    <div>
                        <label class="block text-gray-300 mb-2">Service Type</label>
                        <select class="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-yellow-400 focus:outline-none">
                            <option>Select Service</option>
                            <option>Painting</option>
                            <option>Electrical</option>
                            <option>Bathroom Renovation</option>
                            <option>Kitchen Renovation</option>
                            <option>Handyman Services</option>
                            <option>Complete Renovation</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-gray-300 mb-2">Property Size</label>
                        <select class="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-yellow-400 focus:outline-none">
                            <option>Select Size</option>
                            <option>HDB 3-Room</option>
                            <option>HDB 4-Room</option>
                            <option>HDB 5-Room</option>
                            <option>Condo < 1000 sqft</option>
                            <option>Condo > 1000 sqft</option>
                            <option>Landed Property</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-gray-300 mb-2">Timeline</label>
                        <select class="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-yellow-400 focus:outline-none">
                            <option>Select Timeline</option>
                            <option>As soon as possible</option>
                            <option>Within 1 month</option>
                            <option>Within 3 months</option>
                            <option>Planning stage</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-gray-300 mb-2">Contact Number</label>
                        <input type="tel" class="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-yellow-400 focus:outline-none" placeholder="+65 9XXX XXXX">
                    </div>
                    
                    <div class="flex space-x-4 pt-4">
                        <button type="submit" class="flex-1 bg-yellow-400 text-black p-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                            Get Quote
                        </button>
                        <button type="button" class="flex-1 border border-gray-600 text-gray-300 p-3 rounded-lg hover:bg-gray-800 transition-colors" onclick="this.closest('.fixed').remove()">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Animate modal appearance
        anime({
            targets: modal,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
        
        anime({
            targets: modal.querySelector('.bg-gray-900'),
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 400,
            delay: 100,
            easing: 'easeOutBack'
        });
        
        // Close modal on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Handle form submission
        modal.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleQuoteSubmission(modal);
        });
    }

    // Handle Quote Form Submission
    handleQuoteSubmission(modal) {
        // Show loading state
        const submitBtn = modal.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            modal.innerHTML = `
                <div class="bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 border border-yellow-400 text-center">
                    <div class="text-6xl mb-4">✅</div>
                    <h3 class="text-2xl font-bold text-yellow-400 mb-4">Quote Request Sent!</h3>
                    <p class="text-gray-300 mb-6">
                        Thank you for your interest! Our team will contact you within 24 hours 
                        with a detailed quote for your project.
                    </p>
                    <button class="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors" onclick="this.closest('.fixed').remove()">
                        Close
                    </button>
                </div>
            `;
            
            // Animate success message
            anime({
                targets: modal.querySelector('.bg-gray-900'),
                scale: [0.8, 1],
                opacity: [0, 1],
                duration: 400,
                easing: 'easeOutBack'
            });
        }, 2000);
    }

    // Utility method to check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PremiumWebsite();
});

// Add some premium interactive effects

// Mouse trail effect for hero section
let mouseTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    mouseTrail.push({ x: e.clientX, y: e.clientY });
    
    if (mouseTrail.length > maxTrailLength) {
        mouseTrail.shift();
    }
});

// Enhanced button hover effects
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('mouseenter', function() {
        anime({
            targets: this,
            scale: 1.05,
            duration: 200,
            easing: 'easeOutQuad'
        });
    });
    
    button.addEventListener('mouseleave', function() {
        anime({
            targets: this,
            scale: 1,
            duration: 200,
            easing: 'easeOutQuad'
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-bg');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        anime({
            targets: loader,
            opacity: 0,
            duration: 500,
            complete: () => {
                loader.style.display = 'none';
            }
        });
    }
    
    // Animate page entrance
    anime({
        targets: 'body',
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutQuad'
    });
});

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Smooth page transitions
function navigateToPage(url) {
    anime({
        targets: 'body',
        opacity: 0,
        duration: 300,
        complete: () => {
            window.location.href = url;
        }
    });
}

// Add click handlers for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        const serviceName = this.querySelector('h3').textContent;
        
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.className = 'absolute inset-0 bg-yellow-400 opacity-20 rounded-2xl';
        ripple.style.transform = 'scale(0)';
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        anime({
            targets: ripple,
            scale: [0, 1.5],
            opacity: [0.2, 0],
            duration: 600,
            easing: 'easeOutQuad',
            complete: () => {
                ripple.remove();
            }
        });
        
        // Navigate to services page with filter
        setTimeout(() => {
            window.location.href = `services.html?service=${encodeURIComponent(serviceName)}`;
        }, 300);
    });
});

// Enhanced testimonial animations
document.querySelectorAll('.testimonial-card').forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        anime({
            targets: card,
            rotateY: 5,
            scale: 1.02,
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        anime({
            targets: card,
            rotateY: 0,
            scale: 1,
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
});