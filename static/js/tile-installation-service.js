// Tile Installation Service Page JavaScript

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
        background: #a8edea;
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

    // Tile types and materials
    const tileTypes = [
        { name: 'Ceramic', uses: 'Walls and floors', durability: 'High' },
        { name: 'Porcelain', uses: 'All areas including outdoor', durability: 'Very High' },
        { name: 'Natural Stone', uses: 'Premium installations', durability: 'High' },
        { name: 'Glass', uses: 'Backsplashes and accent walls', durability: 'Medium' },
        { name: 'Mosaic', uses: 'Decorative applications', durability: 'Medium-High' }
    ];

    console.log('Available tile types:', tileTypes);

    // Tile calculator (optional feature)
    function calculateTilesNeeded(length, width, tileSize, wastePercentage = 10) {
        const areaSquareFeet = length * width;
        const tileSizeSquareFeet = (tileSize * tileSize) / 144; // Convert inches to square feet
        const tilesNeeded = areaSquareFeet / tileSizeSquareFeet;
        const tilesWithWaste = tilesNeeded * (1 + wastePercentage / 100);
        return Math.ceil(tilesWithWaste);
    }

    // Make calculator available globally if needed
    window.calculateTilesNeeded = calculateTilesNeeded;

    // Pattern visualization (can be enhanced with actual visuals)
    const tilePatterns = [
        'Straight Stack',
        'Running Bond',
        'Herringbone',
        'Diagonal',
        'Chevron',
        'Basketweave'
    ];

    console.log('Popular tile patterns:', tilePatterns);
});
