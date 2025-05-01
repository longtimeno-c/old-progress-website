/**
 * Navigation functionality
 */

/**
 * Initialize navigation functionality
 */
export function initNavigation() {
    // Add event listeners to navigation items
    document.querySelectorAll('[data-navigate]').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default hash navigation
            const pageId = this.dataset.navigate;
            navigateToPage(pageId);
        });
    });

    // Handle direct access via URL hash
    window.addEventListener('hashchange', handleHashChange);

    // Check initial hash on page load
    handleHashChange();

    console.log("Navigation initialized");
}

/**
 * Handle hash change events
 */
function handleHashChange() {
    // Get page ID from hash (remove the # symbol)
    const hash = window.location.hash.substring(1);

    console.log("Hash changed to:", hash);

    if (hash) {
        navigateToPage(hash);
    } else {
        // Default to home or another page if no hash is present
        // navigateToPage('home');
    }
}

/**
 * Navigate to the specified page
 * @param {string} pageId - ID of the page to navigate to
 */
export function navigateToPage(pageId) {
    console.log("Navigating to page:", pageId);

    // Validate the pageId exists
    const targetPage = document.getElementById(pageId);
    console.log("Target page element exists:", !!targetPage);

    if (!targetPage) {
        console.error("Page not found:", pageId);
        console.log("Available pages:",
            Array.from(document.querySelectorAll('.page')).map(page => page.id).join(', '));
        return false;
    }

    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active-page');
    });

    // Show selected page
    targetPage.classList.add('active-page');

    // Update active nav state
    document.querySelectorAll('.nav-item').forEach(navItem => {
        navItem.classList.remove('active');
    });

    // Find the nav item that corresponds to this page and add active class
    document.querySelectorAll('.nav-item').forEach(navItem => {
        if (navItem.dataset.navigate === pageId) {
            navItem.classList.add('active');
        }
    });

    // Update sparkles on active navigation item
    if (window.updateActiveSparkles) {
        window.updateActiveSparkles();
    }

    // Initialize page-specific functionality
    if (pageId === 'about') {
        if (typeof window.initAboutPage === 'function') {
            window.initAboutPage();
        }
    } else if (pageId === 'nda') {
        // Load NDA page functionality
        import('../pages/nda.js')
            .then(module => {
                console.log("NDA module loaded successfully");
                // Call the initialization functions
                if (typeof module.initSignatureCanvas === 'function') {
                    module.initSignatureCanvas();
                }
                if (typeof module.initNDASubmission === 'function') {
                    module.initNDASubmission();
                }
                if (typeof module.default === 'function') {
                    module.default();
                }
            })
            .catch(error => {
                console.error("Failed to load NDA module:", error);

                // Fallback to global functions if available
                if (typeof window.initSignatureCanvas === 'function') {
                    window.initSignatureCanvas();
                }
                if (typeof window.initNDASubmission === 'function') {
                    window.initNDASubmission();
                }
            });
    }

    // Reset scroll position
    window.scrollTo(0, 0);

    // Update URL hash without triggering page reload
    window.history.pushState(null, '', `#${pageId}`);

    return true;
}