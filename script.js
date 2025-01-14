document.addEventListener("DOMContentLoaded", () => {
  // Menu toggle functionality
  const menuToggle = document.querySelector('.menu-toggle');
  const navbarLinks = document.querySelector('.navbar-links');

  menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      navbarLinks.classList.toggle('active');
  });

  // Form handling
  const form = document.getElementById("inquiry-form");
  const responseDiv = document.getElementById("form-response");

  form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Validate phone number
      const phoneInput = form.querySelector('input[name="phone"]');
      const phoneNumber = phoneInput.value;
      if (!/^\d{10}$/.test(phoneNumber)) {
          responseDiv.textContent = "Please enter a valid 10-digit phone number";
          responseDiv.className = "error";
          responseDiv.style.display = "block";
          setTimeout(() => {
              responseDiv.style.display = "none";
          }, 3000);
          return;
      }

      // Collect form data
      const formData = new FormData(form);
      const jsonData = Object.fromEntries(formData.entries());

      try {
          const response = await fetch("https://formspree.io/f/xbllwona", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(jsonData),
          });

          if (response.ok) {
              responseDiv.textContent = "Your inquiry has been sent successfully!";
              responseDiv.className = "success";
              form.reset();
          } else {
              responseDiv.textContent = "Something went wrong. Please try again later.";
              responseDiv.className = "error";
          }
      } catch (error) {
          responseDiv.textContent = "An error occurred. Please check your internet connection.";
          responseDiv.className = "error";
      }

      responseDiv.style.display = "block";
      setTimeout(() => {
          responseDiv.style.display = "none";
      }, 3000);
  });
});

// Location Slider Functionality
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.location-slider');
    const slides = document.querySelectorAll('.location-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevButton = document.querySelector('.slider-nav.prev');
    const nextButton = document.querySelector('.slider-nav.next');
    let currentSlide = 0;
    let autoScrollInterval;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Update dots
    function updateDots() {
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Go to specific slide
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        currentSlide = index;
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        slides[currentSlide].classList.add('active');
        updateDots();
        resetAutoScroll();
    }

    // Next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Auto scroll
    function startAutoScroll() {
        autoScrollInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    // Reset auto scroll
    function resetAutoScroll() {
        clearInterval(autoScrollInterval);
        startAutoScroll();
    }

    // Event listeners
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            nextSlide();
        } else if (touchEndX - touchStartX > 50) {
            prevSlide();
        }
    });

    // Initialize
    slides[0].classList.add('active');
    startAutoScroll();
});

// Add this to your main JavaScript file
function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Call on load and resize
window.addEventListener('load', setVH);
window.addEventListener('resize', setVH);