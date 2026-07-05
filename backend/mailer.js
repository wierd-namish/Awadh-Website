// ============================================================
// Email notifications
// Sends you an email whenever someone submits a form.
// If email isn't configured yet (see .env), this quietly skips
// sending and just logs a note — it will NOT crash your server.
// ============================================================

const nodemailer = require("nodemailer");

const isConfigured =
  process.env.SMTP_HOST &&
  process.env.SMTP_USER &&
  process.env.SMTP_PASS &&
  process.env.NOTIFY_EMAIL;

let transporter = null;

if (isConfigured) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

async function sendNotification(subject, text, attachments) {
  if (!isConfigured) {
    console.log(
      `[mailer] Email not configured yet — skipping notification.\nSubject: ${subject}\n${text}\n(See .env.example to enable emails.)`
    );
    return;
  }

  try {
    const mailOptions = {
      from: `"Awadh Website" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_EMAIL,
      subject,
      text,
    };

    // Attach files (e.g. PDF) if provided
    if (attachments && attachments.length > 0) {
      mailOptions.attachments = attachments;
    }

    await transporter.sendMail(mailOptions);
    console.log(`[mailer] Notification sent: ${subject}`);
  } catch (err) {
    // Don't crash the request if email fails — the submission is already saved in the DB.
    console.error("[mailer] Failed to send email:", err.message);
  }
}

module.exports = { sendNotification };
