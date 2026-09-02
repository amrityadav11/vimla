const mongoose = require('mongoose');

const websiteSettingSchema = new mongoose.Schema(
    {
        key: { type: String, required: true, unique: true, trim: true },
        value: { type: mongoose.Schema.Types.Mixed },
        group: { type: String, default: 'general' },
        label: { type: String },
        type: { type: String, default: 'string' }, // string, boolean, number, json
    },
    { timestamps: true }
);

module.exports = mongoose.model('WebsiteSetting', websiteSettingSchema);
