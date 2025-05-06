/**
 * Text highlighting effects
 */

/**
 * Initialize highlights on the About page
 */
export function initAboutHighlights() {
    console.log("Initializing highlights");
    const highlightElements = [
        document.getElementById('highlight1'),
        document.getElementById('highlight2'),
        document.getElementById('highlight3'),
        document.getElementById('highlight4'),
        document.getElementById('highlight5'),
        document.getElementById('highlight6')
    ];

    console.log("Found highlight elements:", highlightElements);

    // Activate highlights with a staggered animation
    highlightElements.forEach((element, index) => {
        if (element) {
            setTimeout(() => {
                element.classList.add('active');
                console.log(`Activated highlight ${index + 1}`);
            }, index * 500);
        }
    });
}