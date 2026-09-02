const Category = require('../models/Category');
const slugify = require('slugify');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({ isActive: true }).sort({ order: 1, name: 1 });
        res.json({ success: true, data: categories });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getAllCategoriesAdmin = async (req, res) => {
    try {
        const categories = await Category.find().sort({ order: 1, name: 1 });
        res.json({ success: true, data: categories });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const slug = slugify(req.body.name, { lower: true, strict: true });
        const cat = await Category.create({ ...req.body, slug });
        res.status(201).json({ success: true, data: cat });
    } catch (err) {
        if (err.code === 11000) return res.status(400).json({ success: false, message: 'Category already exists.' });
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        if (req.body.name) req.body.slug = slugify(req.body.name, { lower: true, strict: true });
        const cat = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!cat) return res.status(404).json({ success: false, message: 'Category not found.' });
        res.json({ success: true, data: cat });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Category deleted.' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
