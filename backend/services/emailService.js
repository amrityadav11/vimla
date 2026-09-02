const nodemailer = require('nodemailer');

let transporter = null;

function getTransporter() {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }
    return transporter;
}

exports.sendEnquiryNotification = async (enquiry) => {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS || process.env.SMTP_USER === 'your_email@gmail.com') {
        console.log('📧 Email not configured — skipping notification');
        return;
    }
    try {
        const t = getTransporter();
        await t.sendMail({
            from: process.env.SMTP_FROM,
            to: process.env.ADMIN_EMAIL,
            subject: `New Test Enquiry — ${enquiry.fullName}`,
            html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#1e40af">New Test Enquiry — विमला जाँच घर</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px;font-weight:bold;background:#f3f4f6">Name</td><td style="padding:8px">${enquiry.fullName}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;background:#f3f4f6">Mobile</td><td style="padding:8px">${enquiry.mobile}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;background:#f3f4f6">Email</td><td style="padding:8px">${enquiry.email || '—'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;background:#f3f4f6">Test/Package</td><td style="padding:8px">${enquiry.testOrPackage}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;background:#f3f4f6">Preferred Date</td><td style="padding:8px">${enquiry.preferredDate ? new Date(enquiry.preferredDate).toLocaleDateString('en-IN') : '—'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;background:#f3f4f6">Preferred Time</td><td style="padding:8px">${enquiry.preferredTime || '—'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;background:#f3f4f6">Home Collection</td><td style="padding:8px">${enquiry.homeCollection ? 'Yes' : 'No'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;background:#f3f4f6">Message</td><td style="padding:8px">${enquiry.message || '—'}</td></tr>
          </table>
          <p style="color:#6b7280;font-size:12px;margin-top:20px">Received on ${new Date().toLocaleString('en-IN')}</p>
        </div>`,
        });
    } catch (err) {
        console.error('Email send error:', err.message);
    }
};

exports.sendContactNotification = async (msg) => {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS || process.env.SMTP_USER === 'your_email@gmail.com') {
        console.log('📧 Email not configured — skipping notification');
        return;
    }
    try {
        const t = getTransporter();
        await t.sendMail({
            from: process.env.SMTP_FROM,
            to: process.env.ADMIN_EMAIL,
            subject: `New Contact Message — ${msg.name}`,
            html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#1e40af">New Contact Message — विमला जाँच घर</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px;font-weight:bold;background:#f3f4f6">Name</td><td style="padding:8px">${msg.name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;background:#f3f4f6">Phone</td><td style="padding:8px">${msg.phone || '—'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;background:#f3f4f6">Email</td><td style="padding:8px">${msg.email || '—'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;background:#f3f4f6">Subject</td><td style="padding:8px">${msg.subject || '—'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;background:#f3f4f6">Message</td><td style="padding:8px">${msg.message}</td></tr>
          </table>
          <p style="color:#6b7280;font-size:12px;margin-top:20px">Received on ${new Date().toLocaleString('en-IN')}</p>
        </div>`,
        });
    } catch (err) {
        console.error('Email send error:', err.message);
    }
};
