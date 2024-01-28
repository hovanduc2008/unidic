const {google} = require('googleapis');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const stream = require('stream');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;


const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client
});

const self = module.exports = {
    setFilePublic: async (fileId) => {
        try {
            await drive.permissions.create({
                fileId: fileId,
                requestBody: {
                    role: 'reader',
                    type: 'anyone'
                }
            })
            const getUrl = await drive.files.get({
                fileId: fileId,
                fields: 'webViewLink, webContentLink, thumbnailLink, exportLinks', 
            })

            return getUrl;
        }catch(e) {
            console.log(e);
        }
    },
    uploadImageHandler: async (file) => {
        try {
            return {
                url: {
                    webContentLink: process.env.HOST+'/images/' + file.filename,
                    thumbnailLink: process.env.HOST+'/images/' + file.filename,
                    webViewLink: process.env.HOST+'/images/' + file.filename + '?export=download'
                },
                mimeType: file.mimetype
            };
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    },
    uploadVideoHandler: async (file) => {
        try {
            return {
                url: {
                    webContentLink: '../public/videos/' + file.filename,
                    webViewLink: '../public/videos/' + file.filename + '?export=download'
                },
                mimeType: file.mimetype
            };
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    },
    deleteFile: async (req, res) => {
        try {
            const deleteFile = await drive.files.delete(
                {
                    fileId: req.body.id
                }
            )
            return {
                data: deleteFile.data,
                status: deleteFile.status
            }
        }catch(e) {
            console.error(e);
        }
    },
}
