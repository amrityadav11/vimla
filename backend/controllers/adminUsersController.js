const User = require('../models/User');

// GET all admin users (never return passwords)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json({ success: true, data: users });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// POST create new admin user
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ success: false, message: 'Name, email and password are required.' });
        if (password.length < 6)
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });

        const existing = await User.findOne({ email: email.toLowerCase().trim() });
        if (existing)
            return res.status(400).json({ success: false, message: 'A user with this email already exists.' });

        const user = await User.create({ name, email, password, role: role || 'admin' });
        res.status(201).json({
            success: true,
            message: 'Admin user created successfully.',
            data: { id: user._id, name: user.name, email: user.email, role: user.role },
        });
    } catch (err) {
        if (err.code === 11000)
            return res.status(400).json({ success: false, message: 'Email already in use.' });
        res.status(500).json({ success: false, message: err.message });
    }
};

// PUT update user (name, role, isActive)
exports.updateUser = async (req, res) => {
    try {
        const { name, role, isActive } = req.body;
        // prevent removing own account
        if (req.params.id === req.user._id.toString() && isActive === false)
            return res.status(400).json({ success: false, message: 'You cannot deactivate your own account.' });

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, role, isActive },
            { new: true, runValidators: true }
        ).select('-password');
        if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
        res.json({ success: true, data: user });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// DELETE user
exports.deleteUser = async (req, res) => {
    try {
        if (req.params.id === req.user._id.toString())
            return res.status(400).json({ success: false, message: 'You cannot delete your own account.' });
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
        res.json({ success: true, message: 'User deleted.' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
