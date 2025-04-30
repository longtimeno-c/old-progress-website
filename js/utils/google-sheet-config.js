// Google Sheets API Utility
const GOOGLE_SHEETS_CONFIG = {
    SHEET_ID: '1BDp1gaKEGyBH4Ljj0JjNfZ6EtmM9CykFF3kdbElKlnQ',
    SHEET_NAME: 'Submissions'
};

/**
 * Submit form data to Google Sheets
 * @param {Object} formData - Form submission data
 * @returns {Promise} - Resolves with submission result
 */
async function submitToGoogleSheets(formData) {
    try {
        // For production, replace this with your actual backend endpoint
        const response = await fetch('/api/submit-to-sheets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
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
            })
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to submit to Google Sheets: ${errorBody}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Google Sheets submission error:', error);
        throw error;
    }
}

export { GOOGLE_SHEETS_CONFIG, submitToGoogleSheets };