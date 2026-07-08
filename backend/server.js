// ============================================================
// Awadh Aviation Academy — Backend API
// Handles Contact and Admission form submissions:
//   1. Validates the data
//   2. Saves it to a local SQLite database (awadh.db)
//   3. Emails you a notification (if email is configured)
// ============================================================

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const { sendNotification } = require("./mailer");
const { generateAdmissionPDF, generateRegistrationPDF } = require("./pdfGenerator");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const Razorpay = require("razorpay");

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'dummy_id',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Allows your frontend (on a different port/domain) to call this API
app.use(express.json()); // Parses incoming JSON request bodies
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Expose uploads directory

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Simple health check — visit this in a browser to confirm the server is running
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Awadh backend is running." });
});

// ---------- Razorpay Integration ----------
app.post("/api/create-order", async (req, res) => {
  try {
    const options = {
      amount: 500 * 100, // Amount in paise (500 INR)
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7)
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Could not create order" });
  }
});

app.post("/api/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const secret = process.env.RAZORPAY_KEY_SECRET || 'dummy_secret';

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = shasum.digest("hex");

  if (digest === razorpay_signature) {
    res.json({ success: true, message: "Payment verified successfully" });
  } else {
    res.status(400).json({ success: false, error: "Invalid signature" });
  }
});

// ---------- Contact form ----------
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, state, city, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: "Name, email, phone, and message are required." });
  }

  try {
    const id = db.insertContact({ name, email, phone, state, city, message });

    sendNotification(
      "New Contact Form Submission — Awadh Website",
      `New contact form submission (#${id}):\n\n` +
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n` +
        `State: ${state || "-"}\nCity: ${city || "-"}\n\nMessage:\n${message}`
    );

    res.status(201).json({ success: true, id });
  } catch (err) {
    console.error("Error saving contact submission:", err);
    res.status(500).json({ error: "Something went wrong saving your message. Please try again." });
  }
});

// ---------- Registration inquiry form ----------
app.post("/api/registration", async (req, res) => {
  const { fullName, age, gender, education, subject, email, phone, state, district, course, message } = req.body;

  if (!fullName || !email || !phone || !course) {
    return res.status(400).json({ error: "Full name, email, phone, and course are required." });
  }

  try {
    const id = db.insertAdmission({ fullName, age, gender, education, subject, email, phone, state, district, course, message });

    let messageText = `New Registration Inquiry (#${id}):\n\n`;
    messageText += `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nCourse: ${course}\n\n`;
    messageText += `Please find the complete inquiry details in the attached PDF.`;

    // Generate PDF in memory (no file saved to disk)
    const pdfBuffer = await generateRegistrationPDF({ fullName, age, gender, education, subject, email, phone, state, district, course, message }, id);

    sendNotification(
      "New Admission Inquiry — Awadh Website",
      messageText,
      [
        {
          filename: `Registration_Inquiry_${id}_${fullName.replace(/\s+/g, "_")}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ]
    );

    res.status(201).json({ success: true, id });
  } catch (err) {
    console.error("Error saving admission submission:", err);
    res.status(500).json({ error: "Something went wrong saving your inquiry. Please try again." });
  }
});

// ---------- Full Admission Application form ----------
app.post("/api/admission-application", upload.any(), async (req, res) => {
  try {
    const formData = req.body;
    const files = req.files;

    const full_name = formData.full_name;
    const email = formData.email;
    const mobile = formData.mobile;
    const stream = formData.stream;
    const razorpay_order_id = formData.razorpay_order_id;
    const razorpay_payment_id = formData.razorpay_payment_id;
    const razorpay_signature = formData.razorpay_signature;
    const payment_amount = formData.payment_amount;
    const payment_status = formData.payment_status || "Pending";

    if (!full_name || !email || !mobile || !stream) {
      return res.status(400).json({ error: "Full name, email, mobile, and stream are required." });
    }

    const id = db.insertAdmissionApplication({
      full_name, email, mobile, stream, form_data: formData, files: files,
      razorpay_order_id, razorpay_payment_id, razorpay_signature, payment_amount, payment_status
    });

    let messageText = `New Full Admission Application (#${id}):\n\n`;
    messageText += `Name: ${full_name}\nEmail: ${email}\nMobile: ${mobile}\nStream: ${stream}\n`;
    messageText += `Payment Amount: ₹${payment_amount || 0}\n`;
    messageText += `Payment ID: ${razorpay_payment_id || 'Not Paid'}\n\n`;
    messageText += `Please find the complete application details in the attached PDF.`;

    // Generate PDF in memory (no file saved to disk)
    const pdfBuffer = await generateAdmissionPDF(formData, id, files);

    // Map field names to human-readable document names
    const docLabels = {
      photo: "Passport_Size_Photograph",
      doc_signature: "Signature",
      doc_x_mark: "Class_X_Marksheet",
      doc_xii_mark: "Class_XII_Marksheet",
      doc_tc: "Transfer_Certificate",
      doc_migration: "Migration_Certificate",
      doc_character: "Character_Certificate",
      doc_aadhaar: "Aadhaar_Card",

      doc_medical: "Medical_Fitness_Certificate",
      doc_vision: "Colour_Vision_Certificate",
      doc_passport: "Passport",
    };

    // Start with the generated PDF
    const emailAttachments = [
      {
        filename: `Admission_Application_${id}_${full_name.replace(/\s+/g, "_")}.pdf`,
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ];

    // Attach each uploaded document with a proper readable name
    if (files && files.length > 0) {
      files.forEach(f => {
        const ext = path.extname(f.originalname) || path.extname(f.filename);
        const label = docLabels[f.fieldname] || f.fieldname;
        emailAttachments.push({
          filename: `${label}_${full_name.replace(/\s+/g, "_")}${ext}`,
          path: f.path, // nodemailer reads from disk path
        });
      });
    }

    sendNotification(
      "New Admission Application — Awadh Website",
      messageText,
      emailAttachments
    );

    res.status(201).json({ success: true, id });
  } catch (err) {
    console.error("Error saving admission application:", err);
    res.status(500).json({ error: "Something went wrong saving your application. Please try again." });
  }
});

// ---------- View submissions (simple, for your own use) ----------
// Protect with a basic key so randoms can't view your leads.
function requireAdminKey(req, res, next) {
  const key = req.query.key;
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: "Unauthorized. Add ?key=YOUR_ADMIN_KEY to the URL." });
  }
  next();
}

app.get("/api/contact", requireAdminKey, (req, res) => {
  res.json(db.getAllContacts());
});

app.get("/api/registration", requireAdminKey, (req, res) => {
  res.json(db.getAllAdmissions());
});

app.get("/api/admission-application", requireAdminKey, (req, res) => {
  res.json(db.getAllAdmissionApplications());
});

app.listen(PORT, () => {
  console.log(`✅ Awadh backend running at http://localhost:${PORT}`);
});
