/**
 * Sparkles effect for navigation items
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeSparkles();
});

/**
 * Initialize sparkles on all navigation items
 */
function initializeSparkles() {
    // Get all navigation items
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(navItem => {
        // Create sparkles container if it doesn't exist
        let sparklesContainer = navItem.querySelector('.sparkles-container');
        if (!sparklesContainer) {
            sparklesContainer = document.createElement('div');
            sparklesContainer.className = 'sparkles-container';
            navItem.appendChild(sparklesContainer);
        }

        // Add event listeners
        navItem.addEventListener('mouseenter', function() {
            createSparkles(sparklesContainer);
        });

        navItem.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                removeSparkles(sparklesContainer);
            }
        });
    });

    // Set sparkles on active item
    updateActiveSparkles();

    // Update sparkles when page changes
    window.addEventListener('hashchange', updateActiveSparkles);
}

/**
 * Update sparkles on the active navigation item
 */
function updateActiveSparkles() {
    // Remove sparkles from all items first
    document.querySelectorAll('.nav-item').forEach(item => {
        const container = item.querySelector('.sparkles-container');
        if (container) {
            removeSparkles(container);
        }
    });

    // Add sparkles to active item
    const activeItem = document.querySelector('.nav-item.active');
    if (activeItem) {
        const container = activeItem.querySelector('.sparkles-container');
        if (container) {
            createSparkles(container);
        }
    }
}

/**
 * Create sparkles in the container
 * @param {HTMLElement} container - Container element for sparkles
 */
function createSparkles(container) {
    // Clear existing sparkles
    container.innerHTML = '';

    // Create new sparkles
    const numSparkles = Math.floor(Math.random() * 15) + 15; // 15-30 sparkles
    const colors = ['#ffffff', '#f0f0f0', '#e0e0e0', '#c8102e', '#012169'];

    for (let i = 0; i < numSparkles; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';

        // Set random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // Set random size (1-3px)
        const size = Math.random() * 2 + 1;

        // Set random duration (0.7-2s)
        const duration = (Math.random() * 1.3 + 0.7).toFixed(1);

        // Set random delay (0-1s)
        const delay = (Math.random() * 1).toFixed(1);

        // Set random max opacity (0.5-1)
        const maxOpacity = (Math.random() * 0.5 + 0.5).toFixed(1);

        // Choose random color
        const color = colors[Math.floor(Math.random() * colors.length)];

        // Apply styles
        sparkle.style.setProperty('--x', `${x}%`);
        sparkle.style.setProperty('--y', `${y}%`);
        sparkle.style.setProperty('--size', `${size}px`);
        sparkle.style.setProperty('--duration', `${duration}s`);
        sparkle.style.setProperty('--delay', `${delay}s`);
        sparkle.style.setProperty('--max-opacity', maxOpacity);
        sparkle.style.backgroundColor = color;

        // Add sparkle to container
        container.appendChild(sparkle);
    }
}

/**
 * Remove all sparkles from the container
 * @param {HTMLElement} container - Container element for sparkles
 */
function removeSparkles(container) {
    container.innerHTML = '';
}

// Make functions available globally
window.createSparkles = createSparkles;
window.removeSparkles = removeSparkles;
window.updateActiveSparkles = updateActiveSparkles;