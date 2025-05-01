// Google Sheets API Utility
const GOOGLE_SHEETS_CONFIG = {
    SHEET_ID: '1BDp1gaKEGyBH4Ljj0JjNfZ6EtmM9CykFF3kdbElKlnQ',
    SHEET_NAME: 'Progress Website Contact Form Submissions'
};

/**
 * Submit form data to Google Sheets
 * @param {Object} formData - Form submission data
 * @returns {Promise} - Resolves with submission result
 */
async function submitToGoogleSheets(formData) {
    try {
        console.log('Submitting form data to Google Sheets:', formData);

        // Use the current Vercel preview URL
        const apiUrl = '/api/submit-to-sheets';;
        console.log('Using API URL:', apiUrl);

        const requestBody = {
            sheetId: GOOGLE_SHEETS_CONFIG.SHEET_ID,
            sheetName: GOOGLE_SHEETS_CONFIG.SHEET_NAME,
            data: [
                new Date().toISOString(), // Timestamp
                formData.fullName,
                formData.email,
                formData.city,
                formData.occupation,
                formData.contribution
            ]
        };

        console.log('Request payload:', requestBody);

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Error response body:', errorBody);
            throw new Error(`Failed to submit to Google Sheets: ${errorBody}`);
        }

        const result = await response.json();
        console.log('Successful response:', result);
        return result;
    } catch (error) {
        console.error('Google Sheets submission error:', error);
        throw error;
    }
}

export { GOOGLE_SHEETS_CONFIG, submitToGoogleSheets };