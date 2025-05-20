class HeaderFooterManager {
    constructor() {
        this.headerContent = `
            <div class="nav-brand">
                <a href="index.html">
                    <img src="https://raw.githubusercontent.com/spinmazter/AcademyKuda/9ab263ef6376029e8caeae104f7c6e2584c29f27/img/ace%20logo2.jpg" alt="Ace Logo" class="logo">
                </a>
            </div>
            
            <div class="hamburger">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>

            <ul class="nav-menu">
                <li class="nav-item"><a href="index.html" class="nav-link">Home</a></li>
                <li class="nav-item"><a href="about.html" class="nav-link">About</a></li>
                
                <li class="nav-item dropdown">
                    <a href="#" class="nav-link">Programs <i class="fas fa-chevron-down"></i></a>
                    <ul class="dropdown-menu">
                        <li><a href="highperformance.html">High Performance</a></li>
                        <li><a href="one.html">One on One</a></li>
                        <li><a href="group.html">Group Training</a></li>
                        <li><a href="vacation.html">Vacation Training</a></li>
                        <li><a href="extra.html">Extra Murals</a></li>
                        <li><a href="para.html">Para Classes</a></li>
                        <li><a href="tournaments.html">Tournaments</a></li>
                    </ul>
                </li>
                
                <li class="nav-item dropdown">
                    <a href="#" class="nav-link">Gallery <i class="fas fa-chevron-down"></i></a>
                    <ul class="dropdown-menu">
                        <li><a href="pictures.html">Pictures</a></li>
                        <li><a href="videos.html">Videos</a></li>
                    </ul>
                </li>
                
                <li class="nav-item"><a href="testimonials.html" class="nav-link">Testimonials</a></li>
                <li class="nav-item"><a href="contact.html" class="nav-link">Contact</a></li>
            </ul>
        `;

        this.footerContent = `
            <div class="footer-content">
                <div class="footer-section about">
                    <div class="footer-logo">
                        <img src="https://raw.githubusercontent.com/spinmazter/AcademyKuda/9ab263ef6376029e8caeae104f7c6e2584c29f27/img/ace%20logo2.jpg" alt="Ace Academy Logo" class="footer-logo-img">
                        <h3>Ace Table Tennis Academy</h3>
                    </div>
                    <p class="footer-description">
                        Transforming passionate players into champions through world-class table tennis training and personalized coaching.
                    </p>
                    <div class="socials">
                        <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-youtube"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-whatsapp"></i></a>
                    </div>
                </div>

                <div class="footer-section quick-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="programs.html">Training Programs</a></li>
                        <li><a href="tournaments.html">Tournaments</a></li>
                        <li><a href="gallery.html">Gallery</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </div>

                <div class="footer-section programs">
                    <h3>Our Programs</h3>
                    <ul>
                        <li><a href="highperformance.html">High Performance</a></li>
                        <li><a href="one.html">One on One Training</a></li>
                        <li><a href="group.html">Group Training</a></li>
                        <li><a href="vacation.html">Holiday Programs</a></li>
                        <li><a href="para.html">Para Table Tennis</a></li>
                    </ul>
                </div>

                <div class="footer-section contact-info">
                    <h3>Contact Us</h3>
                    <div class="contact-details">
                        <div class="contact-item">
                            <i class="fas fa-phone"></i>
                            <span>+27 69 748 0306</span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-envelope"></i>
                            <span>kudakwashe914@gmail.com</span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>1120 Haarhoff Street<br>Waverly<br>Pretoria, 0186</span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-clock"></i>
                            <span>Mon - Fri: 06:00 - 20:00<br>Sat: 08:00 - 16:00<br>Sun: 08:00 - 13:00</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <div class="footer-bottom-content">
                    <p>&copy; ${new Date().getFullYear()} Ace Table Tennis Academy. All rights reserved.</p>
                    <div class="footer-bottom-links">
                        <a href="privacy.html">Privacy Policy</a>
                        <a href="terms.html">Terms & Conditions</a>
                    </div>
                </div>
            </div>
        `;
    }

    // Initialize header and footer
    init() {
        this.insertHeader();
        this.insertFooter();
        this.setupMobileMenu();
        this.setupDropdowns();
        this.highlightCurrentPage();
    }

    // Insert header into the page
    insertHeader() {
        const header = document.querySelector('nav.navbar');
        if (header) {
            header.innerHTML = this.headerContent;
        }
    }

    // Insert footer into the page
    insertFooter() {
        const footer = document.querySelector('footer.footer');
        if (footer) {
            footer.innerHTML = this.footerContent;
        }
    }

    // Setup mobile menu functionality
    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }

    // Setup dropdown menus
    setupDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const dropdownLink = dropdown.querySelector('.nav-link');
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            
            // For mobile devices
            dropdownLink.addEventListener('click', (e) => {
                if (window.innerWidth <= 968) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });

            // Handle clicks on dropdown menu items
            dropdownMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 968) {
                        // Only close the dropdown menu, not the entire mobile menu
                        dropdown.classList.remove('active');
                    }
                });
            });

            // For desktop hover
            dropdown.addEventListener('mouseenter', () => {
                if (window.innerWidth > 968) {
                    dropdown.classList.add('active');
                }
            });

            dropdown.addEventListener('mouseleave', () => {
                if (window.innerWidth > 968) {
                    dropdown.classList.remove('active');
                }
            });
        });
    }

    // Highlight current page in navigation
    highlightCurrentPage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }
}

// Initialize HeaderFooterManager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const manager = new HeaderFooterManager();
    manager.init();
}); 