// Contact Page Specific Scripts

document.addEventListener("DOMContentLoaded", () => {
    // Form Validation and Submission
    const contactForm = document.getElementById("contactForm")
  
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
  
      if (validateForm()) {
        // Simulate form submission
        showThankYouMessage()
        contactForm.reset()
      }
    })
  
    function validateForm() {
      let isValid = true
      const requiredFields = contactForm.querySelectorAll("[required]")
  
      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false
          showError(field, "This field is required")
        } else {
          clearError(field)
        }
      })
  
      const emailField = contactForm.querySelector("#email")
      if (emailField.value && !isValidEmail(emailField.value)) {
        isValid = false
        showError(emailField, "Please enter a valid email address")
      }
  
      return isValid
    }
  
    function showError(field, message) {
      const errorElement = field.parentElement.querySelector(".error-message") || document.createElement("div")
      errorElement.className = "error-message"
      errorElement.textContent = message
      field.parentElement.appendChild(errorElement)
      field.classList.add("error")
    }
  
    function clearError(field) {
      const errorElement = field.parentElement.querySelector(".error-message")
      if (errorElement) {
        errorElement.remove()
      }
      field.classList.remove("error")
    }
  
    function isValidEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    }
  
    function showThankYouMessage() {
      const thankYouMessage = document.createElement("div")
      thankYouMessage.className = "thank-you-message"
      thankYouMessage.textContent = "Thank you for your message. We will get back to you soon!"
      contactForm.parentElement.insertBefore(thankYouMessage, contactForm)
  
      setTimeout(() => {
        thankYouMessage.remove()
      }, 5000)
    }
  
    // Interactive Map
    let google // Declare google variable
    function initMap() {
      const mapOptions = {
        center: { lat: 40.7128, lng: -74.006 }, // Example coordinates (New York City)
        zoom: 13,
      }
      const map = new google.maps.Map(document.getElementById("map"), mapOptions)
  
      const marker = new google.maps.Marker({
        position: mapOptions.center,
        map: map,
        title: "New Port City",
      })
    }
  
    // Load Google Maps API
    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  
    // Expose initMap function globally
    window.initMap = initMap
  
    // FAQ Accordion
    const faqItems = document.querySelectorAll(".faq-item")
  
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question")
  
      question.addEventListener("click", () => {
        const isOpen = item.classList.contains("open")
  
        // Close all other FAQ items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("open")
          }
        })
  
        // Toggle the clicked FAQ item
        item.classList.toggle("open")
      })
    })
  
    // Animate elements on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(".info-card, .faq-item, .map-container")
  
      const options = {
        threshold: 0.2,
      }
  
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in")
            observer.unobserve(entry.target)
          }
        })
      }, options)
  
      elements.forEach((element) => {
        observer.observe(element)
      })
    }
  
    animateOnScroll()
  })
  
  