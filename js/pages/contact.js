/**
 * Contact page functionality
 */

// Initialize the contact form when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
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