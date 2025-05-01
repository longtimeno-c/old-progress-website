/**
 * Helper utility functions
 */

/**
 * Safely get an element by ID with optional default value
 * @param {string} id - The ID of the element to get
 * @param {*} defaultValue - The default value to return if element is not found
 * @returns {HTMLElement|*} - The element or default value
 */
function getElementByIdSafe(id, defaultValue = null) {
    const element = document.getElementById(id);
    return element || defaultValue;
}

/**
 * Format a date as a string in the specified locale
 * @param {Date} date - The date to format
 * @param {string} locale - The locale to use for formatting (default: 'en-GB')
 * @returns {string} - The formatted date string
 */
function formatDate(date, locale = 'en-GB') {
    return date.toLocaleDateString(locale);
}

/**
 * Debounce a function to limit how often it can be called
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to wait between calls
 * @returns {Function} - The debounced function
 */
function debounce(func, wait = 100) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
}

/**
 * Add a class to an element with a delay
 * @param {HTMLElement} element - The element to add the class to
 * @param {string} className - The class to add
 * @param {number} delay - The delay in milliseconds
 */
function addClassWithDelay(element, className, delay = 0) {
    if (!element) return;

    setTimeout(() => {
        element.classList.add(className);
    }, delay);
}