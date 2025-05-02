// Google Sheets API Utility
const GOOGLE_SHEETS_CONFIG = {
    SHEET_ID: '1BDp1gaKEGyBH4Ljj0JjNfZ6EtmM9CykFF3kdbElKlnQ',
    SHEET_NAME: 'Progress Website Contact Form Submissions'
};

/**
 * Submit form data to Google Sheets using a hidden form submission approach
 * @param {Object} formData - Form submission data
 * @returns {Promise} - Resolves with submission result
 */
async function submitToGoogleSheets(formData) {
    return new Promise((resolve, reject) => {
        try {
            console.log('Submitting form data to Google Sheets:', formData);

            // Using the Google Apps Script Web App URL
            const scriptUrl = 'https://script.google.com/macros/s/AKfycbx0js7jO_HczbvKGAfABRbUVm9lKqAaG6sqYowG-gx85PW6cfrVKfwzeJI16TT1t669ZA/exec';

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
            addField('sheetId', GOOGLE_SHEETS_CONFIG.SHEET_ID);
            addField('sheetName', GOOGLE_SHEETS_CONFIG.SHEET_NAME);
            addField('timestamp', new Date().toISOString());
            addField('fullName', formData.fullName);
            addField('email', formData.email);
            addField('city', formData.city);
            addField('occupation', formData.occupation);
            addField('contribution', formData.contribution);

            // Add success URL that will redirect back to our site
            const successUrl = window.location.href.split('#')[0]; // Get current URL without hash
            addField('successUrl', successUrl);

            // Append the form to the document
            document.body.appendChild(form);

            // Submit the form
            form.submit();

            // Since form submission will navigate away, we resolve immediately
            resolve({ success: true, message: 'Form submitted successfully' });

            // Clean up the form (though page will likely navigate away)
            setTimeout(() => {
                document.body.removeChild(form);
            }, 1000);

        } catch (error) {
            console.error('Google Sheets submission error:', error);
            reject(error);
        }
    });
}

export { GOOGLE_SHEETS_CONFIG, submitToGoogleSheets };