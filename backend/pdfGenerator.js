// ============================================================
// In-Memory PDF Generator for Admission Applications
// Generates a professional PDF from form data and returns it
// as a Buffer — nothing is ever saved to disk.
// ============================================================

const PDFDocument = require("pdfkit");

/**
 * Generates a PDF buffer from admission application data.
 * @param {Object} formData - The form fields submitted by the student.
 * @param {number|string} applicationId - The database ID for reference.
 * @returns {Promise<Buffer>} - A Buffer containing the complete PDF.
 */
function generateAdmissionPDF(formData, applicationId, files) {
  return new Promise((resolve, reject) => {
    try {
      // Map of file field names to human-readable labels
      const docLabels = {
        photo: "Passport Size Photograph",
        doc_signature: "Signature",
        doc_x_mark: "Class X Marksheet",
        doc_xii_mark: "Class XII Marksheet / Diploma Certificate",
        doc_tc: "Transfer Certificate",
        doc_migration: "Migration Certificate",
        doc_character: "Character Certificate",
        doc_aadhaar: "Aadhaar Card",
        doc_category: "Category Certificate",
        doc_medical: "Medical Fitness Certificate",
        doc_vision: "Colour Vision Certificate",
        doc_passport: "Passport (International Students)",
      };
      const doc = new PDFDocument({
        size: "A4",
        margins: { top: 50, bottom: 50, left: 50, right: 50 },
        info: {
          Title: `Admission Application #${applicationId}`,
          Author: "Awadh Aero DAC Aviation Academy",
        },
      });

      // Collect all chunks in an array (in-memory)
      const chunks = [];
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      // ---- Branding colours ----
      const ORANGE = "#ff4301";
      const DARK = "#1f2937";
      const GREY = "#6b7280";
      const LIGHT_BG = "#f9fafb";

      // ---- Helper functions ----
      const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;

      function drawSectionTitle(title) {
        doc.moveDown(0.8);
        doc
          .fontSize(13)
          .font("Helvetica-Bold")
          .fillColor(ORANGE)
          .text(title.toUpperCase(), { underline: false });

        // Draw an orange line under the title
        const y = doc.y + 2;
        doc
          .moveTo(doc.page.margins.left, y)
          .lineTo(doc.page.margins.left + pageWidth, y)
          .strokeColor(ORANGE)
          .lineWidth(1.5)
          .stroke();

        doc.moveDown(0.5);
      }

      function drawField(label, value) {
        if (!value || value === "undefined") return;
        doc
          .fontSize(9.5)
          .font("Helvetica-Bold")
          .fillColor(DARK)
          .text(`${label}: `, { continued: true })
          .font("Helvetica")
          .fillColor(GREY)
          .text(String(value));
      }

      function drawFieldInline(label, value, indent) {
        if (!value || value === "undefined") return;
        doc
          .fontSize(9.5)
          .font("Helvetica-Bold")
          .fillColor(DARK)
          .text(`${label}: `, indent || doc.page.margins.left, doc.y, { continued: true })
          .font("Helvetica")
          .fillColor(GREY)
          .text(String(value));
      }

      // ---- Page Header ----
      doc
        .fontSize(22)
        .font("Helvetica-Bold")
        .fillColor(ORANGE)
        .text("AWADH AERO DAC AVIATION ACADEMY", { align: "center" });

      doc
        .fontSize(10)
        .font("Helvetica")
        .fillColor(GREY)
        .text("Aircraft Maintenance Engineering (AME) Programme", { align: "center" });

      doc.moveDown(0.3);

      doc
        .fontSize(16)
        .font("Helvetica-Bold")
        .fillColor(DARK)
        .text("ADMISSION APPLICATION FORM", { align: "center" });

      // Reference & date line
      doc.moveDown(0.3);
      doc
        .fontSize(9)
        .font("Helvetica")
        .fillColor(GREY)
        .text(
          `Application #${applicationId}  |  Date: ${new Date().toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}`,
          { align: "center" }
        );

      // Horizontal rule
      doc.moveDown(0.5);
      doc
        .moveTo(doc.page.margins.left, doc.y)
        .lineTo(doc.page.margins.left + pageWidth, doc.y)
        .strokeColor("#e5e7eb")
        .lineWidth(1)
        .stroke();

      // ===== SECTION 1: Personal Information =====
      drawSectionTitle("1. Personal Information");
      drawField("Full Name", formData.full_name);
      drawField("Date of Birth", formData.dob);
      drawField("Gender", formData.gender);
      drawField("Nationality", formData.nationality);
      drawField("Aadhaar Number", formData.aadhaar);
      drawField("Passport Number", formData.passport);
      drawField("Blood Group", formData.blood_group);
      drawField("Category", formData.category);
      drawField("Religion", formData.religion);
      drawField("Physically Disabled (PwD)", formData.pwd);
      drawField("Academic Session", formData.academic_session);

      // ===== SECTION 2: Contact Information =====
      drawSectionTitle("2. Contact Information");
      drawField("Mobile Number", formData.mobile);
      drawField("Alternate Mobile", formData.alt_mobile);
      drawField("Email Address", formData.email);
      drawField("Correspondence Address", formData.corr_address);
      drawField("Permanent Address", formData.perm_address);
      drawField("State", formData.state);
      drawField("District", formData.district);
      drawField("PIN Code", formData.pin_code);

      // ===== SECTION 3: Parent / Guardian Details =====
      drawSectionTitle("3. Parent / Guardian Details");
      doc.fontSize(10).font("Helvetica-Bold").fillColor(DARK).text("Father's Details");
      drawField("  Name", formData.father_name);
      drawField("  Occupation", formData.father_occ);
      drawField("  Mobile", formData.father_mobile);
      drawField("  Email", formData.father_email);

      doc.moveDown(0.3);
      doc.fontSize(10).font("Helvetica-Bold").fillColor(DARK).text("Mother's Details");
      drawField("  Name", formData.mother_name);
      drawField("  Occupation", formData.mother_occ);
      drawField("  Mobile", formData.mother_mobile);

      if (formData.guardian_name) {
        doc.moveDown(0.3);
        doc.fontSize(10).font("Helvetica-Bold").fillColor(DARK).text("Local Guardian");
        drawField("  Name", formData.guardian_name);
        drawField("  Relationship", formData.guardian_rel);
        drawField("  Mobile", formData.guardian_mobile);
        drawField("  Address", formData.guardian_address);
      }

      // ===== SECTION 4: Academic Qualifications =====
      drawSectionTitle("4. Academic Qualifications");
      doc.fontSize(10).font("Helvetica-Bold").fillColor(DARK).text("Class X");
      drawField("  Board", formData.x_board);
      drawField("  School", formData.x_school);
      drawField("  Year of Passing", formData.x_year);
      drawField("  Percentage / CGPA", formData.x_percent);

      doc.moveDown(0.3);
      doc.fontSize(10).font("Helvetica-Bold").fillColor(DARK).text("Class XII");
      drawField("  Board", formData.xii_board);
      drawField("  School", formData.xii_school);
      drawField("  Year of Passing", formData.xii_year);
      drawField("  Physics Marks", formData.xii_physics);
      drawField("  Chemistry Marks", formData.xii_chem);
      drawField("  Mathematics Marks", formData.xii_math);
      drawField("  Overall Percentage", formData.xii_percent);

      if (formData.dip_branch) {
        doc.moveDown(0.3);
        doc.fontSize(10).font("Helvetica-Bold").fillColor(DARK).text("Diploma");
        drawField("  Branch", formData.dip_branch);
        drawField("  Institute", formData.dip_institute);
        drawField("  University / Board", formData.dip_uni);
        drawField("  Percentage", formData.dip_percent);
        drawField("  Year of Passing", formData.dip_year);
      }

      // ===== SECTION 5: Course Applied For =====
      drawSectionTitle("5. Course Applied For");
      drawField("Programme", "Aircraft Maintenance Engineering (AME)");
      drawField("Preferred Stream", formData.stream);

      // ===== SECTION 6: Entrance Details =====
      drawSectionTitle("6. Entrance Details");
      drawField("Applying Through", formData.entrance);
      drawField("Entrance Score", formData.entrance_score);

      // ===== SECTION 7: Medical Declaration =====
      drawSectionTitle("7. Medical Declaration");
      drawField("Normal Colour Vision", formData.colour_vision);
      drawField("Medical Fitness Certificate", formData.medical_cert);
      drawField("Physical Condition Affecting Training", formData.physical_condition);
      drawField("Condition Details", formData.physical_condition_detail);

      // ===== SECTION 8: Hostel Requirement =====
      drawSectionTitle("8. Hostel Requirement");
      drawField("Hostel Accommodation Required", formData.hostel);
      drawField("Preferred Hostel", formData.hostel_type);

      // ===== SECTION 9: Scholarship Details =====
      drawSectionTitle("9. Scholarship Details");
      drawField("Applying for Scholarship", formData.scholarship);
      drawField("Scholarship Type(s)", formData.scholarship_types);

      // ===== SECTION 10: Emergency Contact =====
      drawSectionTitle("10. Emergency Contact");
      drawField("Name", formData.emg_name);
      drawField("Relationship", formData.emg_rel);
      drawField("Mobile Number", formData.emg_mobile);
      drawField("Alternate Number", formData.emg_alt);

      // ===== SECTION 11: Statement of Purpose =====
      if (formData.sop) {
        drawSectionTitle("11. Statement of Purpose");
        doc.fontSize(9.5).font("Helvetica").fillColor(GREY).text(formData.sop, {
          align: "justify",
        });
      }

      // ===== SECTION 12: Documents Submitted =====
      drawSectionTitle("12. Documents Submitted");
      if (files && files.length > 0) {
        const uploadedFieldNames = files.map(f => f.fieldname);
        for (const [fieldName, label] of Object.entries(docLabels)) {
          const submitted = uploadedFieldNames.includes(fieldName);
          doc
            .fontSize(9.5)
            .font("Helvetica")
            .fillColor(submitted ? "#22c55e" : "#ef4444")
            .text(submitted ? "✔" : "✘", { continued: true })
            .fillColor(DARK)
            .font(submitted ? "Helvetica-Bold" : "Helvetica")
            .text(`  ${label}`);
        }
      } else {
        doc.fontSize(9.5).font("Helvetica").fillColor(GREY).text("No documents were uploaded.");
      }

      // ---- Footer ----
      doc.moveDown(1.5);
      doc
        .moveTo(doc.page.margins.left, doc.y)
        .lineTo(doc.page.margins.left + pageWidth, doc.y)
        .strokeColor("#e5e7eb")
        .lineWidth(0.5)
        .stroke();
      doc.moveDown(0.4);

      doc
        .fontSize(8)
        .font("Helvetica-Oblique")
        .fillColor(GREY)
        .text(
          "This is a system-generated document from the Awadh Aero DAC Aviation Academy admission portal. " +
            "The applicant has declared that all information provided is true and correct.",
          { align: "center" }
        );

      // Finalize the document
      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Generates a PDF buffer from registration inquiry data.
 * @param {Object} data - The registration form fields.
 * @param {number|string} inquiryId - The database ID for reference.
 * @returns {Promise<Buffer>} - A Buffer containing the complete PDF.
 */
function generateRegistrationPDF(data, inquiryId) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margins: { top: 50, bottom: 50, left: 50, right: 50 },
        info: {
          Title: `Registration Inquiry #${inquiryId}`,
          Author: "Awadh Aero DAC Aviation Academy",
        },
      });

      const chunks = [];
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      const ORANGE = "#ff4301";
      const DARK = "#1f2937";
      const GREY = "#6b7280";
      const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;

      function drawField(label, value) {
        if (!value || value === "undefined") return;
        doc
          .fontSize(10.5)
          .font("Helvetica-Bold")
          .fillColor(DARK)
          .text(`${label}: `, { continued: true })
          .font("Helvetica")
          .fillColor(GREY)
          .text(String(value));
        doc.moveDown(0.2);
      }

      // ---- Header ----
      doc
        .fontSize(22)
        .font("Helvetica-Bold")
        .fillColor(ORANGE)
        .text("AWADH AERO DAC AVIATION ACADEMY", { align: "center" });

      doc
        .fontSize(10)
        .font("Helvetica")
        .fillColor(GREY)
        .text("Aircraft Maintenance Engineering (AME) Programme", { align: "center" });

      doc.moveDown(0.3);

      doc
        .fontSize(16)
        .font("Helvetica-Bold")
        .fillColor(DARK)
        .text("REGISTRATION INQUIRY FORM", { align: "center" });

      doc.moveDown(0.3);
      doc
        .fontSize(9)
        .font("Helvetica")
        .fillColor(GREY)
        .text(
          `Inquiry #${inquiryId}  |  Date: ${new Date().toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}`,
          { align: "center" }
        );

      // Horizontal rule
      doc.moveDown(0.5);
      doc
        .moveTo(doc.page.margins.left, doc.y)
        .lineTo(doc.page.margins.left + pageWidth, doc.y)
        .strokeColor("#e5e7eb")
        .lineWidth(1)
        .stroke();

      // ---- Personal Details ----
      doc.moveDown(0.8);
      doc
        .fontSize(13)
        .font("Helvetica-Bold")
        .fillColor(ORANGE)
        .text("PERSONAL DETAILS");
      const y1 = doc.y + 2;
      doc.moveTo(doc.page.margins.left, y1).lineTo(doc.page.margins.left + pageWidth, y1).strokeColor(ORANGE).lineWidth(1.5).stroke();
      doc.moveDown(0.5);

      drawField("Full Name", data.fullName);
      drawField("Age", data.age);
      drawField("Gender", data.gender);
      drawField("Education Qualification", data.education);
      drawField("Subject (PCM)", data.subject);

      // ---- Contact Details ----
      doc.moveDown(0.5);
      doc
        .fontSize(13)
        .font("Helvetica-Bold")
        .fillColor(ORANGE)
        .text("CONTACT DETAILS");
      const y2 = doc.y + 2;
      doc.moveTo(doc.page.margins.left, y2).lineTo(doc.page.margins.left + pageWidth, y2).strokeColor(ORANGE).lineWidth(1.5).stroke();
      doc.moveDown(0.5);

      drawField("Email", data.email);
      drawField("Phone", data.phone);
      drawField("State", data.state);
      drawField("District", data.district);

      // ---- Course Details ----
      doc.moveDown(0.5);
      doc
        .fontSize(13)
        .font("Helvetica-Bold")
        .fillColor(ORANGE)
        .text("COURSE DETAILS");
      const y3 = doc.y + 2;
      doc.moveTo(doc.page.margins.left, y3).lineTo(doc.page.margins.left + pageWidth, y3).strokeColor(ORANGE).lineWidth(1.5).stroke();
      doc.moveDown(0.5);

      drawField("Desired Course", data.course);

      // ---- Remarks ----
      if (data.message) {
        doc.moveDown(0.5);
        doc
          .fontSize(13)
          .font("Helvetica-Bold")
          .fillColor(ORANGE)
          .text("ADDITIONAL REMARKS");
        const y4 = doc.y + 2;
        doc.moveTo(doc.page.margins.left, y4).lineTo(doc.page.margins.left + pageWidth, y4).strokeColor(ORANGE).lineWidth(1.5).stroke();
        doc.moveDown(0.5);

        doc.fontSize(10.5).font("Helvetica").fillColor(GREY).text(data.message, {
          align: "justify",
        });
      }

      // ---- Footer ----
      doc.moveDown(2);
      doc
        .moveTo(doc.page.margins.left, doc.y)
        .lineTo(doc.page.margins.left + pageWidth, doc.y)
        .strokeColor("#e5e7eb")
        .lineWidth(0.5)
        .stroke();
      doc.moveDown(0.4);

      doc
        .fontSize(8)
        .font("Helvetica-Oblique")
        .fillColor(GREY)
        .text(
          "This is a system-generated document from the Awadh Aero DAC Aviation Academy registration portal.",
          { align: "center" }
        );

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = { generateAdmissionPDF, generateRegistrationPDF };
