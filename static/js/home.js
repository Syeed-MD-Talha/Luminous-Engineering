        // Mobile Menu Toggle
        const mobileMenuButton = document.getElementById('mobileMenuButton');
        const mobileMenu = document.getElementById('mobileMenu');

        mobileMenuButton.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuButton.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = mobileMenu.contains(event.target);
            const isClickOnButton = mobileMenuButton.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnButton && mobileMenu.classList.contains('active')) {
                mobileMenuButton.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });

        // Floating Particles Animation
        function setupParticles() {
            const particlesContainer = document.getElementById('particles');
            if (!particlesContainer) return;

            const particleCount = window.innerWidth < 768 ? 20 : 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                
                const duration = 3 + Math.random() * 4;
                particle.style.animation = `float ${duration}s ease-in-out infinite`;
                particle.style.animationDelay = Math.random() * 2 + 's';
                
                particlesContainer.appendChild(particle);
            }

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
        function setupScrollReveal() {
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

        // Animated Stats Counter
        function setupStatsCounter() {
            const counters = document.querySelectorAll('.stats-counter');
            
            const observerOptions = {
                threshold: 0.5
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = entry.target;
                        const target = parseInt(counter.dataset.count);
                        let current = 0;
                        const increment = target / 50;
                        const duration = 2000;
                        const stepTime = duration / 50;
                        
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                counter.textContent = target;
                                clearInterval(timer);
                            } else {
                                counter.textContent = Math.round(current);
                            }
                        }, stepTime);
                        
                        observer.unobserve(counter);
                    }
                });
            }, observerOptions);

            counters.forEach(counter => {
                observer.observe(counter);
            });
        }

        // Smooth Navigation
        function setupNavigation() {
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

        }

        // Initialize when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            setupParticles();
            setupScrollReveal();
            setupStatsCounter();
            setupNavigation();
        });

        // Service Cards Click Handler
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('click', function() {
                const serviceName = this.querySelector('h3').textContent;
                setTimeout(() => {
                    window.location.href = `services.html?service=${encodeURIComponent(serviceName)}`;
                }, 300);
            });
        });
        