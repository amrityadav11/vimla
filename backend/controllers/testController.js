const Test = require('../models/Test');
const slugify = require('slugify');

// Public
exports.getAllTests = async (req, res) => {
    try {
        const { search, category, popular, available, page = 1, limit = 50 } = req.query;
        const query = {};
        if (available !== 'all') query.isAvailable = true;
        if (category) query.category = category;
        if (popular === 'true') query.isPopular = true;
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { tags: { $in: [search.toLowerCase()] } },
                { shortDescription: { $regex: search, $options: 'i' } },
            ];
        }
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const [tests, total] = await Promise.all([
            Test.find(query)
                .populate('category', 'name slug color icon')
                .sort({ order: 1, name: 1 })
                .skip(skip)
                .limit(parseInt(limit)),
            Test.countDocuments(query),
        ]);
        res.json({ success: true, data: tests, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getTestBySlug = async (req, res) => {
    try {
        const test = await Test.findOne({ slug: req.params.slug, isAvailable: true }).populate('category', 'name slug color');
        if (!test) return res.status(404).json({ success: false, message: 'Test not found.' });
        res.json({ success: true, data: test });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Admin
exports.getAllTestsAdmin = async (req, res) => {
    try {
        const tests = await Test.find().populate('category', 'name slug').sort({ order: 1, name: 1 });
        res.json({ success: true, data: tests });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.createTest = async (req, res) => {
    try {
        const slug = slugify(req.body.name, { lower: true, strict: true });
        const test = await Test.create({ ...req.body, slug });
        res.status(201).json({ success: true, data: test });
    } catch (err) {
        if (err.code === 11000) return res.status(400).json({ success: false, message: 'A test with this name already exists.' });
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.updateTest = async (req, res) => {
    try {
        if (req.body.name) req.body.slug = slugify(req.body.name, { lower: true, strict: true });
        const test = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!test) return res.status(404).json({ success: false, message: 'Test not found.' });
        res.json({ success: true, data: test });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deleteTest = async (req, res) => {
    try {
        const test = await Test.findByIdAndDelete(req.params.id);
        if (!test) return res.status(404).json({ success: false, message: 'Test not found.' });
        res.json({ success: true, message: 'Test deleted.' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
