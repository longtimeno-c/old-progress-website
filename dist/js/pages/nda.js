/**
 * NDA form functionality
 */

// Export the functions for use in navigation.js
export function initSignatureCanvas() {
    console.log("Initializing signature canvas");
    const canvas = document.getElementById('signature-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let isDrawing = false;

    /**
     * Start drawing when mouse/touch is down
     */
    function startDrawing(e) {
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(getX(e), getY(e));
    }

    /**
     * Draw when mouse/touch is moving
     */
    function draw(e) {
        if (!isDrawing) return;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'white';

        ctx.lineTo(getX(e), getY(e));
        ctx.stroke();
    }

    /**
     * Stop drawing when mouse/touch is up or out
     */
    function stopDrawing() {
        isDrawing = false;
    }

    /**
     * Get X coordinate from event
     */
    function getX(e) {
        return e.type.includes('touch') ?
            e.touches[0].clientX - canvas.getBoundingClientRect().left :
            e.clientX - canvas.getBoundingClientRect().left;
    }

    /**
     * Get Y coordinate from event
     */
    function getY(e) {
        return e.type.includes('touch') ?
            e.touches[0].clientY - canvas.getBoundingClientRect().top :
            e.clientY - canvas.getBoundingClientRect().top;
    }

    // Add mouse event listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Add touch event listeners
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);

    // Initialize clear button
    const clearButton = document.getElementById('clear-signature');
    if (clearButton) {
        clearButton.addEventListener('click', function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
    }
}

/**
 * Initialize NDA submission
 */
export function initNDASubmission() {
    console.log("Initializing NDA submission");
    const submitButton = document.getElementById('submit-nda');
    if (!submitButton) return;

    submitButton.addEventListener('click', function() {
        const canvas = document.getElementById('signature-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const name = document.getElementById('signee-name')?.value;
        const email = document.getElementById('signee-email')?.value;
        const company = document.getElementById('signee-company')?.value;

        // Validate form fields
        if (!name) {
            alert('Please enter your name.');
            return;
        }

        if (!email) {
            alert('Please enter your email address.');
            return;
        }

        // Check if signature exists
        const signatureData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        const hasSignature = Array.from(signatureData).some(pixel => pixel !== 0);

        if (!hasSignature) {
            alert('Please sign the document.');
            return;
        }

        try {
            // Disable submit button to prevent multiple submissions
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';

            // Use your working deployment URL
            const scriptUrl = 'https://script.google.com/macros/s/AKfycbx0js7jO_HczbvKGAfABRbUVm9lKqAaG6sqYowG-gx85PW6cfrVKfwzeJI16TT1t669ZA/exec';

            // Build URL with query parameters
            const params = new URLSearchParams({
                'action': 'submitNDA',
                'name': name,
                'email': email,
                'company': company || 'Not provided',
                'date': new Date().toISOString().split('T')[0],
                'adminEmail': 'maxgorynski@gmail.com',
                'successUrl': window.location.href.split('#')[0]
            });

            // Navigate to the URL - this will open in the same tab
            window.location.href = `${scriptUrl}?${params.toString()}`;

        } catch (error) {
            console.error('NDA submission error:', error);
            alert('There was an error submitting the NDA. Please try again.');

            // Re-enable the submit button
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
        }
    });
}

// Default function to initialize both
export default function initNDAPage() {
    console.log("Initializing NDA page");
    initSignatureCanvas();
    initNDASubmission();
}

// Also initialize when DOM is ready if this script is loaded directly
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the NDA page
    const ndaPage = document.getElementById('nda');
    if (ndaPage && (ndaPage.classList.contains('active-page') || window.location.hash === '#nda')) {
        console.log("NDA page is active, initializing");
        initSignatureCanvas();
        initNDASubmission();
    }
});

window.initSignatureCanvas = initSignatureCanvas;
window.initNDASubmission = initNDASubmission;