const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true, trim: true },
        mobile: { type: String, required: true, trim: true },
        email: { type: String, trim: true, lowercase: true },
        testOrPackage: { type: String, required: true, trim: true },
        preferredDate: { type: Date },
        preferredTime: { type: String, trim: true },
        homeCollection: { type: Boolean, default: false },
        message: { type: String, trim: true },
        status: {
            type: String,
            enum: ['new', 'contacted', 'scheduled', 'completed', 'cancelled'],
            default: 'new',
        },
        adminNotes: { type: String, trim: true },
        source: { type: String, default: 'website' },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Enquiry', enquirySchema);
