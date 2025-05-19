document.addEventListener('DOMContentLoaded', () => {
    // Initialize HeaderFooterManager
    const manager = new HeaderFooterManager();
    manager.init();

    // Additional images to be loaded
    const additionalImages = [
        {
            src: 'https://raw.githubusercontent.com/spinmazter/AcademyKuda/main/img/new12.jpg',
            name: 'Nicke',
            description: 'U15s, South Africa Games..!',
            category: 'tournaments'
        },
        {
            src: 'https://raw.githubusercontent.com/spinmazter/AcademyKuda/main/img/new10.jpg',
            name: 'Madelize',
            description: 'U19s, South Africa Games..!',
            category: 'tournaments'
        },
        {
            src: 'https://raw.githubusercontent.com/spinmazter/AcademyKuda/main/img/1.jpg',
            name: 'Liam',
            description: 'U15s, South Africa Games..!',
            category: 'tournaments'
        },
        {
            src: 'https://raw.githubusercontent.com/spinmazter/AcademyKuda/main/img/cert1.jpg',
            name: 'Werner',
            description: 'Opens, Gauteng North Closed..!',
            category: 'tournaments'
        },
        {
            src: 'https://raw.githubusercontent.com/spinmazter/AcademyKuda/main/img/cert2.jpg',
            name: 'Nicke',
            description: 'U19s, Gauteng North Closed..!',
            category: 'tournaments'
        },
        // ... Add all other images here
        {
            src: 'https://raw.githubusercontent.com/spinmazter/AcademyKuda/main/img/storm.jpg',
            name: 'Storm',
            description: 'U19s, Gauteng North Open..!',
            category: 'tournaments'
        }
    ];

    // Gallery filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryGrid = document.querySelector('.gallery-grid');
    const itemsPerPage = 12;
    let currentPage = 1;
    let loadedImages = 0;

    // Function to show initial items
    function showItems() {
        // Clear existing items
        galleryGrid.innerHTML = '';
        loadedImages = 0;
        loadMoreImages();
    }

    // Show initial items
    showItems();

    // Filter button click handlers
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');
            // Reset and show filtered items
            galleryGrid.innerHTML = '';
            loadedImages = 0;
            filterGallery(filter);
            loadMoreImages();
        });
    });

    // Load more button handler
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            loadMoreImages();
        });
    }

    function createGalleryItem(image) {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.setAttribute('data-category', image.category);
        
        div.innerHTML = `
            <div class="gallery-card">
                <img src="${image.src}" alt="${image.name}">
                <div class="gallery-overlay">
                    <h3>${image.name}</h3>
                    <p>${image.description}</p>
                </div>
            </div>
        `;

        // Add animation classes
        div.style.opacity = '0';
        div.style.transform = 'translateY(20px)';
        div.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        return div;
    }

    function loadMoreImages() {
        const activeFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
        const filteredImages = additionalImages.filter(img => activeFilter === 'all' || img.category === activeFilter);
        const imagesToLoad = filteredImages.slice(loadedImages, loadedImages + itemsPerPage);

        imagesToLoad.forEach(image => {
            const galleryItem = createGalleryItem(image);
            galleryGrid.appendChild(galleryItem);
            
            // Trigger reflow
            galleryItem.offsetHeight;
            
            // Add animation
            setTimeout(() => {
                galleryItem.style.opacity = '1';
                galleryItem.style.transform = 'translateY(0)';
            }, 100);
        });

        loadedImages += itemsPerPage;

        // Update load more button visibility
        if (loadMoreBtn) {
            loadMoreBtn.style.display = loadedImages >= filteredImages.length ? 'none' : 'block';
        }
    }

    function filterGallery(filter) {
        const items = document.querySelectorAll('.gallery-item');
        items.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Add animation on scroll
    const animateOnScroll = () => {
        const items = document.querySelectorAll('.gallery-item');
        items.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight * 0.8) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    };

    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial check for visible items
    animateOnScroll();

    // Show all items if URL has #all hash
    if (window.location.hash === '#all') {
        while (loadedImages < additionalImages.length) {
            loadMoreImages();
        }
    }
}); 