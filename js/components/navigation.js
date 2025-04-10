/**
 * Navigation functionality
 */

/**
 * Initialize navigation functionality
 */
function initNavigation() {
    // Add event listeners to navigation items
    document.querySelectorAll('[data-navigate]').forEach(item => {
        item.addEventListener('click', function() {
            const pageId = this.dataset.navigate;
            navigateToPage(pageId);
        });
    });

    // Add hover effects to navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            activateNavItemGradient(this);
        });

        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                deactivateNavItemGradient(this);
            }
        });
    });
}

/**
 * Navigate to the specified page
 * @param {string} pageId - ID of the page to navigate to
 */
function navigateToPage(pageId) {
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
            activateNavItemGradient(navItem);
        } else {
            deactivateNavItemGradient(navItem);
        }
    });

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

/**
 * Activate the gradient effect on a navigation item
 * @param {HTMLElement} item - The navigation item to activate
 */
function activateNavItemGradient(item) {
    item.style.setProperty('--moving-gradient', 'radial-gradient(75% 181.16% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%)');
}

/**
 * Deactivate the gradient effect on a navigation item
 * @param {HTMLElement} item - The navigation item to deactivate
 */
function deactivateNavItemGradient(item) {
    item.style.setProperty('--moving-gradient', 'radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)');
}