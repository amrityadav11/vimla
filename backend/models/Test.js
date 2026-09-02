const mongoose = require('mongoose');

const parameterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    unit: { type: String },
    normalRange: { type: String },
});

const testSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true },
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
        description: { type: String, trim: true },
        shortDescription: { type: String, trim: true },
        sampleType: { type: String, trim: true, default: 'Blood' },
        preparation: { type: String, trim: true },
        reportTime: { type: String, trim: true, default: 'Same Day' },
        price: { type: Number, min: 0 },
        showPrice: { type: Boolean, default: true },
        parameters: [parameterSchema],
        isAvailable: { type: Boolean, default: true },
        isPopular: { type: Boolean, default: false },
        processingType: {
            type: String,
            enum: ['IN_HOUSE', 'PARTNER_LAB', 'ON_REQUEST'],
            default: 'IN_HOUSE',
        },
        tags: [{ type: String, lowercase: true }],
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

// Text search index
testSchema.index({ name: 'text', description: 'text', tags: 'text' });
testSchema.index({ slug: 1 });
testSchema.index({ category: 1 });
testSchema.index({ isAvailable: 1, isPopular: 1 });

module.exports = mongoose.model('Test', testSchema);
