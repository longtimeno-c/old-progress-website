/**
 * Text highlighting effects
 */

/**
 * Initialize highlights on the About page
 */
function initAboutHighlights() {
    const highlightElements = [
        document.getElementById('highlight1'),
        document.getElementById('highlight2'),
        document.getElementById('highlight3'),
        document.getElementById('highlight4'),
        document.getElementById('highlight5'),
        document.getElementById('highlight6')
    ];

    // Activate highlights with a staggered animation
    highlightElements.forEach((element, index) => {
        if (element) {
            setTimeout(() => {
                element.classList.add('active');
            }, index * 500);
        }
    });
}