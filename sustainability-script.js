// Sustainability Page Specific Scripts

document.addEventListener('DOMContentLoaded', function() {
    // Initiatives Slider
    const slides = document.querySelectorAll('.initiative-slide');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;

    function showSlide(n) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    prevButton.addEventListener('click', () => showSlide(currentSlide - 1));
    nextButton.addEventListener('click', () => showSlide(currentSlide + 1));

    // Auto-advance slides every 5 seconds
    setInterval(() => showSlide(currentSlide + 1), 5000);

    // Animated Metrics
    const metricNumbers = document.querySelectorAll('.metric-number');
    
    if (metricNumbers.length > 0) {
        const options = {
            threshold: 0.5
        };
        
        const metricsObserver = new IntersectionObserver((entries, observer) => {
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
        
        metricNumbers.forEach(metric => {
            metricsObserver.observe(metric);
        });
    }

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.pillar-card, .metric-card, .engagement-content');
        
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
});