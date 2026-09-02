const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        phone: { type: String, trim: true },
        email: { type: String, trim: true, lowercase: true },
        subject: { type: String, trim: true },
        message: { type: String, required: true, trim: true },
        isRead: { type: Boolean, default: false },
        status: {
            type: String,
            enum: ['new', 'read', 'replied', 'archived'],
            default: 'new',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
