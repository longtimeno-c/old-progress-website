/**
 * NDA form functionality
 */

// Initialize the NDA form when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initSignatureCanvas();
    initNDASubmission();
});

/**
 * Initialize the signature canvas
 */
function initSignatureCanvas() {
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
function initNDASubmission() {
    const submitButton = document.getElementById('submit-nda');
    if (!submitButton) return;

    submitButton.addEventListener('click', function() {
        const canvas = document.getElementById('signature-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const name = document.getElementById('signee-name')?.value;

        if (!name) {
            alert('Please enter your name.');
            return;
        }

        // Check if signature exists
        const signatureData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        const hasSignature = Array.from(signatureData).some(pixel => pixel !== 0);

        if (!hasSignature) {
            alert('Please sign the document.');
            return;
        }

        // In a real implementation, this would generate a PDF and send it to the specified email
        alert('NDA submitted successfully. A copy has been sent to the administrators.');
    });
}