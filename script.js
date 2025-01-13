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