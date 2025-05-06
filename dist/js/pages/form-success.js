/**
 * Form success page functionality
 */

// Export the main function to initialize the success page
export function initSuccessPage() {
    console.log("Initializing success page");

    // Get URL parameters from hash part
    const hashParams = window.location.hash.split('?');
    let submissionType = '';

    if (hashParams.length > 1) {
        const urlParams = new URLSearchParams(hashParams[1]);
        submissionType = urlParams.get('type');
    }

    const successMessageElement = document.getElementById('success-message');
    if (!successMessageElement) return;

    // Set appropriate success message based on submission type
    if (submissionType === 'nda') {
        successMessageElement.innerHTML = 'Your NDA has been submitted and will be processed shortly. We will be in touch with you soon.';
    } else if (submissionType === 'contact') {
        successMessageElement.innerHTML = 'We will be in touch with you shortly regarding your interest in Progress.';
    } else {
        successMessageElement.innerHTML = 'We have received your submission.';
    }

    // Add event listener to return home button
    const returnHomeButton = document.getElementById('return-home');
    if (returnHomeButton) {
        returnHomeButton.addEventListener('click', function() {
            window.location.href = '/';
        });
    }
}

// Initialize when DOM is ready if this script is loaded directly
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the success page
    const successPage = document.getElementById('success');
    if (successPage && (successPage.classList.contains('active-page') || window.location.hash.startsWith('#success'))) {
        console.log("Success page is active, initializing");
        initSuccessPage();
    }
});

// Export as default
export default initSuccessPage;