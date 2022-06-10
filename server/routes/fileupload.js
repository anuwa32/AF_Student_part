const path = require('path');
const multer = require('multer');
const StudentUpload = require('../models/fileupload');
const Router = require('express').Router();
const ObjectId = require('mongodb').ObjectID;

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, './StdFileUpload'); //where th all uploaded files are saved
        },
        filename(req, file, cb) {
            cb(null, `${new Date().getTime()}_${file.originalname}`);
        }
    }),
    limits: {
        fileSize: 10000000  // Maximum file size 10MB = 1000000 bytes
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls|ppt|pptx)$/)) {
            return cb(
                new Error(
                    'only upload files with  jpeg, jpg, png, pdf, doc, docx, xslx, xls format.'
                )
            );
        }
        cb(undefined, true); 
    }
});

Router.post('/upload',
    upload.single('file'),
    async (req, res) => {
        try {
            const { groupName, submissionName } = req.body;
            const { path, type } = req.file;
            const file = new StudentUpload({
                groupName: groupName,
                submissionType: submissionName,
                file_path: path,
                file_type: type,
                feedback: 'N/A',
            });
            await file.save();
            res.send('Your file uploaded successfully.');
        } catch (error) {
            res.status(400).send('Error while uploading file. Please you can try again later.');
        }
    },
    (error, req, res, next) => {
        if (error) {
            res.status(500).send(error.message);
        }
    }
);
