const Package = require('../models/Package');
const slugify = require('slugify');

exports.getAllPackages = async (req, res) => {
    try {
        const packages = await Package.find({ isActive: true })
            .populate('tests', 'name slug sampleType')
            .sort({ order: 1 });
        res.json({ success: true, data: packages });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getAllPackagesAdmin = async (req, res) => {
    try {
        const packages = await Package.find().populate('tests', 'name slug').sort({ order: 1 });
        res.json({ success: true, data: packages });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getPackageBySlug = async (req, res) => {
    try {
        const pkg = await Package.findOne({ slug: req.params.slug, isActive: true }).populate('tests', 'name slug sampleType shortDescription');
        if (!pkg) return res.status(404).json({ success: false, message: 'Package not found.' });
        res.json({ success: true, data: pkg });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.createPackage = async (req, res) => {
    try {
        const slug = slugify(req.body.name, { lower: true, strict: true });
        const pkg = await Package.create({ ...req.body, slug });
        res.status(201).json({ success: true, data: pkg });
    } catch (err) {
        if (err.code === 11000) return res.status(400).json({ success: false, message: 'Package already exists.' });
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.updatePackage = async (req, res) => {
    try {
        if (req.body.name) req.body.slug = slugify(req.body.name, { lower: true, strict: true });
        const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pkg) return res.status(404).json({ success: false, message: 'Package not found.' });
        res.json({ success: true, data: pkg });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deletePackage = async (req, res) => {
    try {
        await Package.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Package deleted.' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
