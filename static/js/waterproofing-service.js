// Waterproofing Service Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Animate service cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Observe feature items
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });

    // Add active class to navigation
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Back to top button functionality
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #30cfd0;
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
    `;
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
        } else {
            backToTopBtn.style.opacity = '0';
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Waterproofing methods and materials
    const waterproofingMethods = [
        { name: 'Liquid Membrane', application: 'Spray or roller', areas: 'Basements, roofs' },
        { name: 'Sheet Membrane', application: 'Adhesive installation', areas: 'Foundations, walls' },
        { name: 'Cementitious', application: 'Brush or trowel', areas: 'Bathrooms, water tanks' },
        { name: 'Bituminous Coating', application: 'Hot or cold application', areas: 'Flat roofs' },
        { name: 'Polyurethane', application: 'Liquid application', areas: 'All areas' }
    ];

    console.log('Waterproofing methods available:', waterproofingMethods);

    // Warning signs of water damage
    const warningSignsOfWaterDamage = [
        "Damp or musty odors",
        "Visible mold or mildew growth",
        "Water stains on walls or ceilings",
        "Peeling or bubbling paint",
        "Warped or damaged flooring",
        "Increased humidity levels",
        "Efflorescence (white chalky deposits)"
    ];

    console.log('Warning signs to watch for:', warningSignsOfWaterDamage);

    // Inspection checklist feature
    function createInspectionChecklist() {
        const checklistAreas = [
            'Foundation and basement',
            'Roof and gutters',
            'Bathrooms and kitchen',
            'Windows and doors',
            'Exterior walls',
            'Plumbing fixtures'
        ];
        return checklistAreas;
    }

    // Make checklist available if needed
    window.waterproofingChecklist = createInspectionChecklist();

    // Moisture detection tips
    const moistureDetectionTips = [
        "Regularly inspect vulnerable areas",
        "Use a moisture meter for accurate readings",
        "Check after heavy rainfall",
        "Monitor indoor humidity levels",
        "Look for condensation on windows"
    ];

    console.log('Moisture detection tips:', moistureDetectionTips);
});
