/**
 * New Port City - Contact Page JavaScript
 * Handles form validation, tabs, FAQ accordion and animations
 * Last Updated: 2025-03-07
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initFormValidation();
    initMapTabs();
    initFaqAccordion();
    
    // Record user visit for analytics
    recordVisit();
});

/**
 * Form Validation and Submission
 */
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form fields
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const message = document.getElementById('message');
        const interest = document.getElementById('interest');
        
        // Validate required fields
        let isValid = true;
        
        if (!validateField(name, 'Please enter your name')) {
            isValid = false;
        }
        
        if (!validateEmail(email)) {
            isValid = false;
        }
        
        if (!validateField(message, 'Please enter your message')) {
            isValid = false;
        }
        
        // If form is valid, submit it
        if (isValid) {
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual AJAX submission)
            setTimeout(function() {
                // Reset form
                contactForm.reset();
                
                // Show success message
                showFormMessage('success', 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
                
                // Restore button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // In a real application, you would use fetch or axios to submit the form:
                /*
                fetch('your-endpoint', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: name.value,
                        email: email.value,
                        phone: phone.value,
                        message: message.value,
                        interest: interest.value,
                        newsletter: document.getElementById('newsletter').checked
                    })
                })
                .then(response => response.json())
                .then(data => {
                    contactForm.reset();
                    showFormMessage('success', 'Thank you! Your message has been sent successfully.');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                })
                .catch(error => {
                    showFormMessage('error', 'Oops! Something went wrong. Please try again later.');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
                */
            }, 1500);
        }
    });
    
    // Add live validation on blur
    document.getElementById('name').addEventListener('blur', function() {
        validateField(this, 'Please enter your name');
    });
    
    document.getElementById('email').addEventListener('blur', function() {
        validateEmail(this);
    });
    
    document.getElementById('message').addEventListener('blur', function() {
        validateField(this, 'Please enter your message');
    });
}

function validateField(field, errorMessage) {
    const parent = field.closest('.form-group');
    
    // Remove any existing error messages
    const existingError = parent.querySelector('.error-message');
    if (existingError) {
        parent.removeChild(existingError);
    }
    
    // Check if field is empty
    if (!field.value.trim()) {
        // Create error message
        const error = document.createElement('div');
        error.className = 'error-message';
        error.innerText = errorMessage;
        error.style.color = '#dc3545';
        error.style.fontSize = '12px';
        error.style.marginTop = '5px';
        
        // Add error styling to input wrapper
        field.closest('.input-wrapper').style.borderColor = '#dc3545';
        
        // Append error message
        parent.appendChild(error);
        return false;
    } else {
        // Reset input styling
        field.closest('.input-wrapper').style.borderColor = '';
        return true;
    }
}

function validateEmail(field) {
    const parent = field.closest('.form-group');
    
    // Remove any existing error messages
    const existingError = parent.querySelector('.error-message');
    if (existingError) {
        parent.removeChild(existingError);
    }
    
    // Simple email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!field.value.trim() || !emailPattern.test(field.value)) {
        // Create error message
        const error = document.createElement('div');
        error.className = 'error-message';
        error.innerText = 'Please enter a valid email address';
        error.style.color = '#dc3545';
        error.style.fontSize = '12px';
        error.style.marginTop = '5px';
        
        // Add error styling to input wrapper
        field.closest('.input-wrapper').style.borderColor = '#dc3545';
        
        // Append error message
        parent.appendChild(error);
        return false;
    } else {
        // Reset input styling
        field.closest('.input-wrapper').style.borderColor = '';
        return true;
    }
}

function showFormMessage(type, message) {
    // Remove any existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
    
    // Style the message
    messageElement.style.padding = '15px';
    messageElement.style.marginBottom = '20px';
    messageElement.style.borderRadius = '5px';
    messageElement.style.display = 'flex';
    messageElement.style.alignItems = 'center';
    messageElement.style.gap = '10px';
    
    if (type === 'success') {
        messageElement.style.backgroundColor = 'rgba(40, 167, 69, 0.1)';
        messageElement.style.color = '#28a745';
    } else {
        messageElement.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
        messageElement.style.color = '#dc3545';
    }
    
    // Add to DOM
    const formContainer = document.querySelector('.contact-form-container');
    formContainer.insertBefore(messageElement, formContainer.firstChild);
    
    // Scroll to message
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageElement.style.opacity = '0';
        messageElement.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.parentNode.removeChild(messageElement);
            }
        }, 500);
    }, 5000);
}

/**
 * Map Tabs Functionality
 */
function initMapTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    if (!tabButtons.length) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Add active class to current button and pane
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

/**
 * FAQ Accordion Functionality
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (!faqItems.length) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle the active class on the item
            if (item.classList.contains('active')) {
                item.classList.remove('active');
            } else {
                // Optional: Close other open items
                // document.querySelectorAll('.faq-item.active').forEach(activeItem => {
                //    activeItem.classList.remove('active');
                // });
                
                item.classList.add('active');
            }
        });
    });
}

/**
 * Analytics Tracking
 */
function recordVisit() {
    // This would typically send data to your analytics system
    const currentPage = window.location.pathname;
    const referrer = document.referrer;
    const timestamp = new Date().toISOString();
    const userAgent = navigator.userAgent;
    
    // Log visit for demonstration purposes
    console.log('Page Visit:', {
        page: currentPage,
        referrer: referrer,
        timestamp: timestamp,
        userAgent: userAgent
    });
    
    // In a real implementation, you would send this data to your backend:
    /*
    fetch('/api/analytics/record-visit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            page: currentPage,
            referrer: referrer,
            timestamp: timestamp,
            userAgent: userAgent
        })
    });
    */
}