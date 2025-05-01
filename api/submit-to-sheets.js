import { google } from 'googleapis';

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Validate request method
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    // Log incoming request for debugging
    console.log('Incoming request body:', req.body);

    try {
        // Authenticate with Google Sheets
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets']
        });

        const sheets = google.sheets({ version: 'v4', auth });

        // Log authentication details for debugging
        console.log('Authenticated with email:', process.env.GOOGLE_CLIENT_EMAIL);

        // Submit data to Google Sheets
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: req.body.sheetId,
            range: `${req.body.sheetName}!A1:F1`,
            valueInputOption: 'RAW',
            insertDataOption: 'INSERT_ROWS',
            resource: {
                values: [req.body.data]
            }
        });

        console.log('Sheets submission response:', response.data);

        res.status(200).json({
            message: 'Submission successful',
            response: response.data
        });
    } catch (error) {
        console.error('Detailed submission error:', error);
        res.status(500).json({
            message: 'Submission failed',
            error: error.toString(),
            details: error.response ? error.response.data : null
        });
    }
}