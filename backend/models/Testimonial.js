const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        location: { type: String, trim: true },
        review: { type: String, required: true, trim: true },
        rating: { type: Number, min: 1, max: 5, default: 5 },
        isApproved: { type: Boolean, default: false },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
