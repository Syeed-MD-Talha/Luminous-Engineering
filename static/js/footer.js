document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const yearTargets = document.querySelectorAll('[data-footer-year]');

    yearTargets.forEach((node) => {
        node.textContent = currentYear;
    });

    const socialLinks = document.querySelectorAll('.footer-social-links a[target="_blank"]');
    socialLinks.forEach((link) => {
        const rel = link.getAttribute('rel') || '';
        if (!rel.toLowerCase().includes('noopener')) {
            link.setAttribute('rel', `${rel} noopener noreferrer`.trim());
        }
    });
});
