const mongoose = require('mongoose');

const studentFileUpload = mongoose.Schema(
    {
        groupName: { type: String, required: true, trim: true },
        submissionType: { type: String, required: true, trim: true },
        file_path: { type: String, required: true },
        file_type: { type: String, required: true },
        feedback: { type: String, required: true, trim: true }
    },

    {
        timestamps: true
    }
);

const StudentUpload = mongoose.model('studentUpload', studentFileUpload);

module.exports = StudentUpload;