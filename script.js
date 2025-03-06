// New Port City Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
    
    // Feature Selector
    const featureOptions = document.querySelectorAll('.feature-option');
    const featureDetails = document.querySelectorAll('.feature-detail');
    
    if (featureOptions.length > 0) {
        featureOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                featureOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Get the feature ID
                const featureId = this.getAttribute('data-feature');
                
                // Hide all feature details
                featureDetails.forEach(detail => detail.classList.remove('active'));
                
                // Show the selected feature detail
                document.getElementById(featureId).classList.add('active');
            });
        });
    }
    
    // Horizontal Scrolling
    const scrollContent = document.querySelector('.scroll-content');
    const scrollItems = document.querySelectorAll('.scroll-item');
    const scrollLeftBtn = document.querySelector('.scroll-left');
    const scrollRightBtn = document.querySelector('.scroll-right');
    const scrollDotsContainer = document.querySelector('.scroll-dots');
    
    if (scrollContent && scrollItems.length > 0) {
        let currentIndex = 0;
        const itemCount = scrollItems.length;
        
        // Create dots
        for (let i = 0; i < itemCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('scroll-dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('data-index', i);
            scrollDotsContainer.appendChild(dot);
            
            dot.addEventListener('click', function() {
                goToSlide(parseInt(this.getAttribute('data-index')));
            });
        }
        
        const scrollDots = document.querySelectorAll('.scroll-dot');
        
        // Scroll functions
        function updateScroll() {
            const scrollWidth = scrollItems[0].offsetWidth + parseInt(getComputedStyle(scrollItems[0]).marginLeft) * 2;
            scrollContent.style.transform = `translateX(-${currentIndex * scrollWidth}px)`;
            
            // Update dots
            scrollDots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        function goToSlide(index) {
            currentIndex = index;
            if (currentIndex < 0) currentIndex = 0;
            if (currentIndex >= itemCount) currentIndex = itemCount - 1;
            updateScroll();
        }
        
        // Event listeners for buttons
        if (scrollLeftBtn) {
            scrollLeftBtn.addEventListener('click', function() {
                goToSlide(currentIndex - 1);
            });
        }
        
        if (scrollRightBtn) {
            scrollRightBtn.addEventListener('click', function() {
                goToSlide(currentIndex + 1);
            });
        }
    }
    
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.dot');
    
    if (testimonialSlides.length > 0 && testimonialDots.length > 0) {
        testimonialDots.forEach(dot => {
            dot.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                
                // Hide all slides
                testimonialSlides.forEach(slide => slide.classList.remove('active'));
                
                // Show selected slide
                testimonialSlides[slideIndex].classList.add('active');
                
                // Update dots
                testimonialDots.forEach(d => d.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Auto rotate testimonials
        let testimonialIndex = 0;
        setInterval(() => {
            testimonialIndex = (testimonialIndex + 1) % testimonialSlides.length;
            
            // Hide all slides
            testimonialSlides.forEach(slide => slide.classList.remove('active'));
            
            // Show next slide
            testimonialSlides[testimonialIndex].classList.add('active');
            
            // Update dots
            testimonialDots.forEach(d => d.classList.remove('active'));
            testimonialDots[testimonialIndex].classList.add('active');
        }, 5000);
    }
    
    // Animated Statistics
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const options = {
            threshold: 0.5
        };
        
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const countTo = parseInt(target.getAttribute('data-count'));
                    let count = 0;
                    const duration = 2000; // 2 seconds
                    const interval = duration / countTo;
                    
                    const counter = setInterval(() => {
                        count++;
                        target.textContent = count;
                        
                        if (count >= countTo) {
                            clearInterval(counter);
                        }
                    }, interval);
                    
                    observer.unobserve(target);
                }
            });
        }, options);
        
        statNumbers.forEach(stat => {
            statsObserver.observe(stat);
        });
    }
    
    // Scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.vision-image, .feature-card, .stat-card, .scroll-item, .testimonial-content');
        
        const options = {
            threshold: 0.2
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    animateOnScroll();

    // Animate timeline if it exists on the page
    if (document.querySelector('.timeline')) {
        animateTimeline();
    }

    // Animate mission and values cards
    const missionValuesCards = document.querySelectorAll('.mission-card, .values-card');
    if (missionValuesCards.length > 0) {
        const options = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        missionValuesCards.forEach(card => {
            observer.observe(card);
        });
    }

    // Animate leadership cards
    const leaderCards = document.querySelectorAll('.leader-card');
    if (leaderCards.length > 0) {
        const options = {
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        leaderCards.forEach(card => {
            observer.observe(card);
        });
    }
});

// Function to animate the timeline
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const options = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    timelineItems.forEach(item => {
        observer.observe(item);
    });
}