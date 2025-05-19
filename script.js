document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Mobile dropdown toggle
    if (window.innerWidth <= 968) {
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('.nav-link');
            link.addEventListener('click', (e) => {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
            });
        });
    }

    // Remove mobile menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 968) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}); 