// Investment Page Specific Scripts

document.addEventListener('DOMContentLoaded', function() {
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
                    const countTo = parseFloat(target.getAttribute('data-count'));
                    let count = 0;
                    const duration = 2000; // 2 seconds
                    const interval = duration / (countTo * 100);
                    
                    const counter = setInterval(() => {
                        count += 0.1;
                        target.textContent = count.toFixed(1);
                        
                        if (count >= countTo) {
                            target.textContent = countTo;
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

    // Modal functionality
    const modal = document.getElementById('investmentModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const openModalButtons = document.querySelectorAll('.open-modal');
    const closeModal = document.querySelector('.close-modal');

    openModalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            updateModalContent(category);
            modal.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });

    function updateModalContent(category) {
        const content = {
            commercial: {
                title: 'Commercial Real Estate Investment',
                content: `
                    <p>Invest in New Port City's thriving commercial real estate market, featuring:</p>
                    <ul>
                        <li>Prime locations in the central business district</li>
                        <li>State-of-the-art office spaces with smart building technology</li>
                        <li>High-traffic retail areas in pedestrian-friendly zones</li>
                        <li>Mixed-use developments combining residential, commercial, and recreational spaces</li>
                    </ul>
                    <p>Expected ROI: 8-12% annually</p>
                    <a href="contact.html" class="btn btn-primary">Contact Our Investment Team</a>
                `
            },
            residential: {
                title: 'Residential Development Investment',
                content: `
                    <p>Be part of New Port City's innovative residential projects, including:</p>
                    <ul>
                        <li>Luxury waterfront condominiums with world-class amenities</li>
                        <li>Smart home communities featuring the latest in home automation</li>
                        <li>Sustainable, mixed-income housing developments</li>
                        <li>Urban micro-living concepts for young professionals</li>
                    </ul>
                    <p>Expected ROI: 7-10% annually</p>
                    <a href="contact.html" class="btn btn-primary">Contact Our Investment Team</a>
                `
            },
            infrastructure: {
                title: 'Infrastructure Project Investment',
                content: `
                    <p>Contribute to the backbone of New Port City with investments in critical infrastructure:</p>
                    <ul>
                        <li>Renewable energy generation and smart grid systems</li>
                        <li>Advanced water management and treatment facilities</li>
                        <li>Next-generation public transportation networks</li>
                        <li>5G and fiber optic communication infrastructure</li>
                    </ul>
                    <p>Expected ROI: 6-9% annually</p>
                    <a href="contact.html" class="btn btn-primary">Contact Our Investment Team</a>
                `
            },
            technology: {
                title: 'Technology Venture Investment',
                content: `
                    <p>Invest in cutting-edge technology startups and ventures shaping the future of urban living:</p>
                    <ul>
                        <li>IoT and smart city management platforms</li>
                        <li>Clean tech and sustainability solutions</li>
                        <li>Urban mobility and autonomous vehicle technologies</li>
                        <li>AI-driven urban planning and optimization tools</li>
                    </ul>
                    <p>Expected ROI: Variable, with potential for high returns</p>
                    <a href="contact.html" class="btn btn-primary">Contact Our Investment Team</a>
                `
            }
        };

        modalTitle.textContent = content[category].title;
        modalContent.innerHTML = content[category].content;
    }

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.category-card, .process-step, .testimonial-slide');
        
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