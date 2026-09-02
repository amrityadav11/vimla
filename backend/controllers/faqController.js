const FAQ = require('../models/FAQ');

exports.getActiveFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
        res.json({ success: true, data: faqs });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getAllFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.find().sort({ order: 1 });
        res.json({ success: true, data: faqs });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.createFAQ = async (req, res) => {
    try {
        const faq = await FAQ.create(req.body);
        res.status(201).json({ success: true, data: faq });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.updateFAQ = async (req, res) => {
    try {
        const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!faq) return res.status(404).json({ success: false, message: 'FAQ not found.' });
        res.json({ success: true, data: faq });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deleteFAQ = async (req, res) => {
    try {
        await FAQ.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'FAQ deleted.' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
