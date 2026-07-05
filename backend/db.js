// ============================================================
// Database setup
// Uses Node's built-in SQLite module (no extra install needed).
// Data is saved to a local file: awadh.db
// ============================================================

const { DatabaseSync } = require("node:sqlite");
const path = require("path");

const db = new DatabaseSync(path.join(__dirname, "awadh.db"));

// Create tables if they don't exist yet
db.exec(`
  CREATE TABLE IF NOT EXISTS contact_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    state TEXT,
    city TEXT,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS admission_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    age TEXT,
    gender TEXT,
    education TEXT,
    subject TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    state TEXT,
    district TEXT,
    course TEXT NOT NULL,
    message TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS admission_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    mobile TEXT NOT NULL,
    stream TEXT NOT NULL,
    form_data TEXT NOT NULL,
    files TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

try {
  db.exec(`ALTER TABLE admission_submissions ADD COLUMN age TEXT`);
  db.exec(`ALTER TABLE admission_submissions ADD COLUMN gender TEXT`);
  db.exec(`ALTER TABLE admission_submissions ADD COLUMN education TEXT`);
  db.exec(`ALTER TABLE admission_submissions ADD COLUMN subject TEXT`);
  db.exec(`ALTER TABLE admission_submissions ADD COLUMN state TEXT`);
  db.exec(`ALTER TABLE admission_submissions ADD COLUMN district TEXT`);
} catch (e) {
  // Ignore if columns already exist
}

function insertContact({ name, email, phone, state, city, message }) {
  const stmt = db.prepare(`
    INSERT INTO contact_submissions (name, email, phone, state, city, message)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const info = stmt.run(name, email, phone, state || null, city || null, message);
  return info.lastInsertRowid;
}

function insertAdmission({ fullName, age, gender, education, subject, email, phone, state, district, course, message }) {
  const stmt = db.prepare(`
    INSERT INTO admission_submissions (full_name, age, gender, education, subject, email, phone, state, district, course, message)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const info = stmt.run(fullName, age || null, gender || null, education || null, subject || null, email, phone, state || null, district || null, course, message || null);
  return info.lastInsertRowid;
}

function insertAdmissionApplication({ full_name, email, mobile, stream, form_data, files }) {
  const stmt = db.prepare(`
    INSERT INTO admission_applications (full_name, email, mobile, stream, form_data, files)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const info = stmt.run(
    full_name || "Unknown", 
    email || "Unknown", 
    mobile || "Unknown", 
    stream || "Unknown", 
    JSON.stringify(form_data || {}), 
    JSON.stringify(files || [])
  );
  return info.lastInsertRowid;
}

function getAllContacts() {
  return db.prepare(`SELECT * FROM contact_submissions ORDER BY id DESC`).all();
}

function getAllAdmissions() {
  return db.prepare(`SELECT * FROM admission_submissions ORDER BY id DESC`).all();
}

function getAllAdmissionApplications() {
  return db.prepare(`SELECT * FROM admission_applications ORDER BY id DESC`).all();
}

module.exports = {
  insertContact,
  insertAdmission,
  insertAdmissionApplication,
  getAllContacts,
  getAllAdmissions,
  getAllAdmissionApplications,
};
