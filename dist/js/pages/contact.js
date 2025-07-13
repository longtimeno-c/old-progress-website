/**
 * Contact page functionality
 */
import { submitToGoogleSheets } from '../utils/google-sheet-config.js';

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

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Collect form data
        const formData = {
            fullName: document.getElementById('full-name').value,
            email: document.getElementById('email').value,
            city: document.getElementById('city').value,
            occupation: document.getElementById('occupation').value,
            contribution: document.getElementById('contribution').value
        };

        try {
            // Disable the submit button
            const submitButton = contactForm.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Submitting...';
            }

            // Submit to Google Sheets via backend
            await submitToGoogleSheets(formData);

            // If using vanishing input and it's active, handle differently
            const contributionTextarea = document.getElementById('contribution');

            if (contributionTextarea &&
                contributionTextarea.value.trim() &&
                window.vanishAndSubmit &&
                !contributionTextarea.classList.contains('animating')) {

                // Use vanishing effect with a callback to redirect after animation
                window.vanishAndSubmit(contactForm, function() {
                    window.location.href = '/#success?type=contact';
                });
            } else {
                // Standard submission - redirect to success page
                window.location.href = '/#success?type=contact';
            }
        } catch (error) {
            alert('There was an error submitting your information. Please try again.');
            console.error('Submission error:', error);

            // Re-enable the submit button on error
            const submitButton = contactForm.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Submit';
            }
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

// Export functions if needed for modular use
export { submitToGoogleSheets, initContactForm, initInputGlowEffect };