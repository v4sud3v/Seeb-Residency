document.addEventListener("DOMContentLoaded", () => {
    console.log("Website ready!");
  });
  

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("inquiry-form");
    const responseDiv = document.getElementById("form-response");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // Prevent form from redirecting
  
      // Collect form data
      const formData = new FormData(form);
      const jsonData = Object.fromEntries(formData.entries());
  
      // Send AJAX request to Web3Forms
      try {
        const response = await fetch("https://api.web3forms.com/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        });
  
        if (response.ok) {
          responseDiv.textContent = "Your inquiry has been sent successfully!";
          responseDiv.classList.add("success");
          form.reset(); // Clear the form
        } else {
          responseDiv.textContent = "Something went wrong. Please try again later.";
          responseDiv.classList.add("error");
        }
      } catch (error) {
        responseDiv.textContent = "An error occurred. Please check your internet connection.";
        responseDiv.classList.add("error");
      }
    });
  });
  