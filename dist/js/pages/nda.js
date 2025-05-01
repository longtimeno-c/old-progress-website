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

    submitButton.addEventListener('click', async function() {
        const canvas = document.getElementById('signature-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const name = document.getElementById('signee-name')?.value;
        const email = document.getElementById('signee-email')?.value; // Make sure this matches the ID in your HTML
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

            // Get signature as base64 image
            const signatureImage = canvas.toDataURL('image/png');

            // Get the current date
            const currentDate = new Date().toISOString().split('T')[0];

            // Send data to Google Apps Script to generate PDF and send email
            const scriptUrl = 'https://script.google.com/macros/s/AKfycbyW3j2ol9xektJ1vbVy0MlzqlXV3VMp3_s7l2sLqwf5VmjWvJO5y1lwrpqeMcSOkloPxQ/exec';

            // Create a hidden form to submit data (avoids CORS issues)
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = scriptUrl;
            form.style.display = 'none';

            // Add form fields
            const addField = (name, value) => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = name;
                input.value = value;
                form.appendChild(input);
            };

            // Add all the data fields
            addField('action', 'submitNDA');
            addField('name', name);
            addField('email', email);
            addField('company', company || 'Not provided');
            addField('date', currentDate);
            addField('signature', signatureImage);
            addField('adminEmail', 'maxgorynski@gmail.com'); // This ensures the PDF goes to the correct email

            // Add success URL that will redirect back to our site
            const successUrl = window.location.href.split('#')[0]; // Get current URL without hash
            addField('successUrl', successUrl);

            // Append the form to the document
            document.body.appendChild(form);

            // Submit the form
            form.submit();

            // Alert will be shown when redirected back

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