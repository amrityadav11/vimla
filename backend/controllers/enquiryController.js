const Enquiry = require('../models/Enquiry');
const { sendEnquiryNotification } = require('../services/emailService');

exports.createEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.create(req.body);
        // Send email notification (non-blocking)
        sendEnquiryNotification(enquiry).catch(console.error);
        res.status(201).json({ success: true, message: 'Enquiry submitted successfully. We will contact you soon.', data: { id: enquiry._id } });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getAllEnquiries = async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        const query = status ? { status } : {};
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const [enquiries, total] = await Promise.all([
            Enquiry.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
            Enquiry.countDocuments(query),
        ]);
        res.json({ success: true, data: enquiries, total, page: parseInt(page) });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.updateEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!enquiry) return res.status(404).json({ success: false, message: 'Enquiry not found.' });
        res.json({ success: true, data: enquiry });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deleteEnquiry = async (req, res) => {
    try {
        await Enquiry.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Enquiry deleted.' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
