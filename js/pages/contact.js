/**
 * Contact page functionality
 */

// Initialize the contact form when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initInputGlowEffect();
});

/**
 * Initialize the contact form
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // If using vanishing input and it's active, handle differently
        const vanishingContainer = document.getElementById('vanishing-container');
        const contributionTextarea = document.getElementById('contribution');

        if (vanishingContainer &&
            contributionTextarea &&
            contributionTextarea.value.trim() &&
            !contributionTextarea.classList.contains('animating')) {
            vanishAndSubmit(this);
        } else {
            // Standard submission
            alert('Your information has been submitted. Thank you for your interest in Progress!');
            this.reset();
        }
    });
}

/**
 * Initialize the glowing effect on input fields
 */
function initInputGlowEffect() {
    // Add mouse move event listeners to all glow containers
    const glowContainers = document.querySelectorAll('#contact .input-glow-container');

    glowContainers.forEach(container => {
        container.addEventListener('mousemove', function(e) {
            // Get the position of the mouse relative to the container
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Update CSS variables with the mouse position
            this.style.setProperty('--mouse-x', `${x}px`);
            this.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}