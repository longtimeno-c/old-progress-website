/**
 * Navigation functionality
 */

/**
 * Initialize navigation functionality
 */
export function initNavigation() {
    // Add event listeners to navigation items
    document.querySelectorAll('[data-navigate]').forEach(item => {
        item.addEventListener('click', function() {
            const pageId = this.dataset.navigate;
            navigateToPage(pageId);
        });
    });
}

/**
 * Navigate to the specified page
 * @param {string} pageId - ID of the page to navigate to
 */
export function navigateToPage(pageId) {
    // Validate the pageId exists
    const targetPage = document.getElementById(pageId);
    if (!targetPage) {
        console.error("Page not found:", pageId);
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

    // Reset scroll position
    window.scrollTo(0, 0);

    // Initialize page-specific functionality
    if (pageId === 'about') {
        initAboutPage();
    }

    // Update URL hash without triggering page reload
    window.history.pushState(null, '', `#${pageId}`);

    return false;
}