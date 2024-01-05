require('dotenv').config(); // Load environment variables from .env file
const { google } = require('googleapis');
const json2csv = require('json2csv').parse;

exports.handler = async (event) => {
    try {
        if (event.httpMethod !== 'POST') {
            return { statusCode: 405, body: 'Method Not Allowed' };
        }

        const { userInfo, inventoryList } = JSON.parse(event.body);

        // Extract the customer's name from userInfo and set a default if not provided
        const customerName = userInfo.name || 'Customer';

        // CSV conversion for user info and inventory list
        const userInfoCSV = json2csv(userInfo, { fields: ['name', 'phone', 'email'] });
        const inventoryFields = ['itemName', 'quantity', 'cubicFeet', 'totalCubicFeet'];
        const inventoryCSV = json2csv(inventoryList, { fields: inventoryFields });

        const combinedCSV = `User Information:\n${userInfoCSV}\n\nInventory List:\n${inventoryCSV}`;

        // Convert the private key from a single-line string to a standard PEM format
        const privateKey = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');

        // Initialize Google Drive API client with the private key from environment variables
        const auth = new google.auth.GoogleAuth({
            credentials: {
                type: process.env.TYPE,
                project_id: process.env.PROJECT_ID,
                private_key_id: process.env.PRIVATE_KEY_ID,
                private_key: privateKey,
                client_email: process.env.CLIENT_EMAIL,
                client_id: process.env.CLIENT_ID,
                auth_uri: process.env.AUTH_URI,
                token_uri: process.env.TOKEN_URI,
                auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
                client_x509_cert_url: process.env.CLIENT_X509_CERT_URL
            },
            scopes: ['https://www.googleapis.com/auth/drive']
        });

        const drive = google.drive({ version: 'v3', auth });

        // File metadata and media content with the customer's name in the file name
        const fileMetadata = {
            name: `${customerName}_MoveData.csv`, // Set the file name with customer's name
            mimeType: 'text/csv',
            parents: ['1qNn5A6xyPmxqfy3_zJ6GaXo-JLkYgpcW'] // Replace with your actual folder ID
        };
        const media = {
            mimeType: 'text/csv',
            body: combinedCSV
        };

        // Create and upload the file to Google Drive
        const response = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id'
        });

        // Successful response
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Data processed and uploaded successfully', fileId: response.data.id })
        };
    } catch (error) {
        // Error handling
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to process data', error: error.message })
        };
    }
};
