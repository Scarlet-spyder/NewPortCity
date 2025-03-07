// Lifestyle Page Specific Scripts

document.addEventListener("DOMContentLoaded", () => {
    // Features Slider
    const slides = document.querySelectorAll(".feature-slide")
    const prevButton = document.querySelector(".prev-slide")
    const nextButton = document.querySelector(".next-slide")
    const dotsContainer = document.querySelector(".slider-dots")
    let currentSlide = 0
  
    function showSlide(n) {
      slides[currentSlide].classList.remove("active")
      dots[currentSlide].classList.remove("active")
      currentSlide = (n + slides.length) % slides.length
      slides[currentSlide].classList.add("active")
      dots[currentSlide].classList.add("active")
    }
  
    // Create dots
    slides.forEach((_, index) => {
      const dot = document.createElement("div")
      dot.classList.add("slider-dot")
      if (index === 0) dot.classList.add("active")
      dot.addEventListener("click", () => showSlide(index))
      dotsContainer.appendChild(dot)
    })
  
    const dots = document.querySelectorAll(".slider-dot")
  
    prevButton.addEventListener("click", () => showSlide(currentSlide - 1))
    nextButton.addEventListener("click", () => showSlide(currentSlide + 1))
  
    // Auto-advance slides every 5 seconds
    setInterval(() => showSlide(currentSlide + 1), 5000)
  
    // Community Highlights Filter
    const filterButtons = document.querySelectorAll(".filter-btn")
    const highlightCards = document.querySelectorAll(".highlight-card")
  
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter")
  
        filterButtons.forEach((btn) => btn.classList.remove("active"))
        button.classList.add("active")
  
        highlightCards.forEach((card) => {
          if (filter === "all" || card.getAttribute("data-category") === filter) {
            card.style.display = "block"
            setTimeout(() => {
              card.style.opacity = "1"
              card.style.transform = "scale(1)"
            }, 50)
          } else {
            card.style.opacity = "0"
            card.style.transform = "scale(0.8)"
            setTimeout(() => {
              card.style.display = "none"
            }, 300)
          }
        })
      })
    })
  
    // Animate highlight cards on scroll
    const animateHighlightCards = () => {
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
  
      highlightCards.forEach((card) => {
        observer.observe(card)
      })
    }
  
    animateHighlightCards()
  
    // Animate elements on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(".neighborhood-card, .timeline-item, .testimonial-slide")
  
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
  
    // Parallax effect for hero section
    window.addEventListener("scroll", () => {
      const heroSection = document.querySelector(".lifestyle-hero")
      const scrollPosition = window.pageYOffset
      heroSection.style.backgroundPositionY = scrollPosition * 0.7 + "px"
    })
  })
  
  