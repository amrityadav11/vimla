const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true },
        description: { type: String, trim: true },
        shortDescription: { type: String, trim: true },
        tests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Test' }],
        testNames: [{ type: String }], // for display without full population
        price: { type: Number, min: 0 },
        showPrice: { type: Boolean, default: true },
        isActive: { type: Boolean, default: true },
        isPopular: { type: Boolean, default: false },
        color: { type: String, default: '#1e40af' },
        icon: { type: String, default: 'package' },
        disclaimer: { type: String },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Package', packageSchema);
