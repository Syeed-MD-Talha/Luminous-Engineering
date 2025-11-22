document.addEventListener('DOMContentLoaded', () => {
    // Mobile Services Dropdown Toggle
    const mobileServicesToggle = document.getElementById('mobileServicesToggle');
    const mobileServicesDropdown = document.getElementById('mobileServicesDropdown');

    if (mobileServicesToggle && mobileServicesDropdown) {
        mobileServicesToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.toggle('active');
            mobileServicesDropdown.classList.toggle('hidden');
            mobileServicesDropdown.classList.toggle('flex');
            
            // Rotate arrow
            const svg = this.querySelector('svg');
            if (svg) {
                if (this.classList.contains('active')) {
                    svg.style.transform = 'rotate(180deg)';
                } else {
                    svg.style.transform = 'rotate(0deg)';
                }
            }
        });
    }
});
