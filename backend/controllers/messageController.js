const ContactMessage = require('../models/ContactMessage');
const { sendContactNotification } = require('../services/emailService');

exports.createMessage = async (req, res) => {
    try {
        const msg = await ContactMessage.create(req.body);
        sendContactNotification(msg).catch(console.error);
        res.status(201).json({ success: true, message: 'Message sent successfully. We will get back to you soon.' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getAllMessages = async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        const query = status ? { status } : {};
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const [messages, total] = await Promise.all([
            ContactMessage.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
            ContactMessage.countDocuments(query),
        ]);
        res.json({ success: true, data: messages, total });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.updateMessage = async (req, res) => {
    try {
        const msg = await ContactMessage.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!msg) return res.status(404).json({ success: false, message: 'Message not found.' });
        res.json({ success: true, data: msg });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        await ContactMessage.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Message deleted.' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
