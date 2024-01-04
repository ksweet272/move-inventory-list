// mergedFunction.js
require('dotenv').config(); // Load environment variables from .env file
const { google } = require('googleapis');
const json2csv = require('json2csv').parse;

exports.handler = async (event) => {
    try {
        if (event.httpMethod !== 'POST') {
            return { statusCode: 405, body: 'Method Not Allowed' };
        }

        const { userInfo, inventoryList } = JSON.parse(event.body);

        // CSV conversion for user info and inventory list
        const userInfoCSV = json2csv(userInfo, { fields: ['name', 'phone', 'email'] });
        const inventoryFields = ['itemName', 'quantity', 'cubicFeet', 'totalCubicFeet'];
        const inventoryCSV = json2csv(inventoryList, { fields: inventoryFields });

        const combinedCSV = `User Information:\n${userInfoCSV}\n\nInventory List:\n${inventoryCSV}`;

        // Initialize Google Drive API client
        const auth = new google.auth.GoogleAuth({
            keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
            scopes: ['https://www.googleapis.com/auth/drive']
        });

        const drive = google.drive({ version: 'v3', auth });

        // File metadata and media content
        const fileMetadata = {
            name: 'MoveData.csv',
            mimeType: 'text/csv'
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
