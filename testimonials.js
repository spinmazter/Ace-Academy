document.addEventListener('DOMContentLoaded', function() {
    // Get all video wrappers
    const videoWrappers = document.querySelectorAll('.video-wrapper');

    videoWrappers.forEach(wrapper => {
        const video = wrapper.querySelector('video');
        const playButton = wrapper.querySelector('.play-button');

        if (video && playButton) {
            // Hide play button when video is playing
            video.addEventListener('play', () => {
                playButton.style.display = 'none';
            });

            // Show play button when video is paused
            video.addEventListener('pause', () => {
                playButton.style.display = 'flex';
            });

            // Show play button when video ends
            video.addEventListener('ended', () => {
                playButton.style.display = 'flex';
            });

            // Handle play button click
            playButton.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            });

            // Handle video click
            video.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        }
    });

    // Animate testimonials on scroll
    const testimonials = document.querySelectorAll('.testimonial-card, .featured-testimonial');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    testimonials.forEach(testimonial => {
        testimonial.style.opacity = '0';
        testimonial.style.transform = 'translateY(20px)';
        testimonial.style.transition = 'all 0.6s ease-out';
        observer.observe(testimonial);
    });

    // Smooth scroll for CTA buttons
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}); 