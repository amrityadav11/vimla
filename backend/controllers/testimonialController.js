const Testimonial = require('../models/Testimonial');

exports.getApprovedTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find({ isApproved: true }).sort({ order: 1, createdAt: -1 });
        res.json({ success: true, data: testimonials });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });
        res.json({ success: true, data: testimonials });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.createTestimonial = async (req, res) => {
    try {
        const t = await Testimonial.create(req.body);
        res.status(201).json({ success: true, data: t });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.updateTestimonial = async (req, res) => {
    try {
        const t = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!t) return res.status(404).json({ success: false, message: 'Testimonial not found.' });
        res.json({ success: true, data: t });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deleteTestimonial = async (req, res) => {
    try {
        await Testimonial.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Testimonial deleted.' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
