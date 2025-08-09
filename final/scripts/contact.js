document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");
    const formResponse = document.getElementById("form-response");

    if (!contactForm) {
        console.warn("Contact form not found on this page.");
        return;
    }

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const nameInput = document.getElementById("name");
        const userName = nameInput.value.trim();

        const submitButton = contactForm.querySelector("button[type='submit']");
        submitButton.textContent = "Sending...🚀"
        submitButton.disabled = true;

        setTimeout(() => {
            formResponse.innerHTML = `<strong>Thank you, ${userName}! 🎉</strong> Your message has been sent successfully. We'll get back to you soon 💻`;
            formResponse.className = "success";
            formResponse.style.display = "block";

            contactForm.reset();

            submitButton.textContent = "Send Message";
            submitButton.disabled = false;

            setTimeout(() => {
                formResponse.style.display = "none";
            }, 5000);

        }, 1500);
    });
});
