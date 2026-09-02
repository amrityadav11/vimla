const WebsiteSetting = require('../models/WebsiteSetting');

exports.getPublicSettings = async (req, res) => {
    try {
        const settings = await WebsiteSetting.find();
        const obj = {};
        settings.forEach((s) => { obj[s.key] = s.value; });
        res.json({ success: true, data: obj });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.updateSettings = async (req, res) => {
    try {
        const updates = req.body; // { key: value, ... }
        const ops = Object.entries(updates).map(([key, value]) => ({
            updateOne: {
                filter: { key },
                update: { $set: { value } },
                upsert: true,
            },
        }));
        await WebsiteSetting.bulkWrite(ops);
        const all = await WebsiteSetting.find();
        const obj = {};
        all.forEach((s) => { obj[s.key] = s.value; });
        res.json({ success: true, data: obj });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getStats = async (req, res) => {
    try {
        const Test = require('../models/Test');
        const Enquiry = require('../models/Enquiry');
        const Package = require('../models/Package');
        const ContactMessage = require('../models/ContactMessage');
        const [totalTests, activeTests, totalEnquiries, pendingEnquiries, totalPackages, unreadMessages] = await Promise.all([
            Test.countDocuments(),
            Test.countDocuments({ isAvailable: true }),
            Enquiry.countDocuments(),
            Enquiry.countDocuments({ status: 'new' }),
            Package.countDocuments({ isActive: true }),
            ContactMessage.countDocuments({ status: 'new' }),
        ]);
        res.json({ success: true, data: { totalTests, activeTests, totalEnquiries, pendingEnquiries, totalPackages, unreadMessages } });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
