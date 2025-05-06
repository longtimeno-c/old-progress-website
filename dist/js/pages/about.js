/**
 * About page functionality
 */

import { initAboutHighlights } from '../components/highlights.js';

/**
 * Initialize the About page
 */
export function initAboutPage() {
    console.log("Initializing About page highlights");
    // Initialize highlights with a small delay
    setTimeout(initAboutHighlights, 500);
}

// Also initialize when DOM is ready if this script is loaded directly
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the About page
    const aboutPage = document.getElementById('about');
    if (aboutPage && (aboutPage.classList.contains('active-page') || window.location.hash === '#about')) {
        console.log("About page is active, initializing");
        initAboutPage();
    }
});