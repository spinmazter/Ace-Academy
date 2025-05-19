document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.gallery-carousel');
    const items = document.querySelectorAll('.gallery-item');
    const progressBar = document.querySelector('.progress-bar');
    let currentRotation = 0;
    let lastRotation = 0;
    const totalItems = items.length;
    const anglePerItem = 360 / totalItems;

    // Set initial positions
    items.forEach((item, index) => {
        const angle = anglePerItem * index;
        item.style.transform = `rotateY(${angle}deg) translateZ(500px)`;
    });

    // Navigation controls
    document.querySelector('.gallery-control.prev').addEventListener('click', () => {
        stopAnimation();
        currentRotation += anglePerItem;
        updateGallery();
        setTimeout(startAnimation, 50);
    });

    document.querySelector('.gallery-control.next').addEventListener('click', () => {
        stopAnimation();
        currentRotation -= anglePerItem;
        updateGallery();
        setTimeout(startAnimation, 50);
    });

    function updateGallery() {
        carousel.style.transform = `rotateY(${currentRotation}deg)`;
        
        // Calculate progress (normalized between 0-100)
        const progress = ((currentRotation % 360) + 360) % 360;
        const progressPercentage = (progress / 360) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }

    // Mouse/Touch drag functionality
    let isDragging = false;
    let startX = 0;
    let startRotation = 0;

    function startDragging(e) {
        isDragging = true;
        startX = e.type === 'mousedown' ? e.pageX : e.touches[0].pageX;
        startRotation = currentRotation;
        stopAnimation();
        carousel.classList.add('dragging');
    }

    function drag(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        const currentX = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
        const diff = currentX - startX;
        
        // Make rotation more sensitive but smooth
        currentRotation = startRotation + (diff * 0.5);
        updateGallery();
    }

    function stopDragging() {
        if (!isDragging) return;
        
        isDragging = false;
        carousel.classList.remove('dragging');
        lastRotation = currentRotation;
        startAnimation();
    }

    function stopAnimation() {
        carousel.style.animation = 'none';
    }

    function startAnimation() {
        // Store the current rotation
        const currentDeg = currentRotation % 360;
        
        // Reset the rotation to prevent accumulation
        carousel.style.transform = `rotateY(${currentDeg}deg)`;
        
        // Force a reflow
        void carousel.offsetWidth;
        
        // Restart the animation from the current position
        carousel.style.animation = `initialRotation 60s linear infinite`;
    }

    carousel.addEventListener('mousedown', startDragging);
    carousel.addEventListener('touchstart', startDragging);
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('touchend', stopDragging);

    // Pause rotation on hover
    carousel.addEventListener('mouseenter', () => {
        carousel.style.animationPlayState = 'paused';
    });

    carousel.addEventListener('mouseleave', () => {
        if (!isDragging) {
            carousel.style.animationPlayState = 'running';
        }
    });
}); 