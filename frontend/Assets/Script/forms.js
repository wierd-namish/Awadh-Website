// ============================================================
// Awadh Aviation Academy — Form submission handlers
// Sends the Contact and Admission forms to the backend API.
// ============================================================

// Change this if your backend runs somewhere else (e.g. after you deploy it).
const API_BASE_URL = "http://localhost:3000";

function showFormStatus(el, message, isSuccess) {
  el.textContent = message;
  el.classList.remove("hidden", "text-green-600", "text-red-600");
  el.classList.add(isSuccess ? "text-green-600" : "text-red-600");
}

async function submitContactForm(event) {
  event.preventDefault();
  const form = event.target;
  const statusEl = document.getElementById("contactFormStatus");
  const submitBtn = form.querySelector('button[type="submit"]');

  const payload = {
    name: document.getElementById("contactName").value,
    email: document.getElementById("contactEmail").value,
    phone: document.getElementById("contactPhone").value,
    state: document.getElementById("stateSelect").value,
    city: document.getElementById("citySelect").value,
    message: document.getElementById("contactMessage").value,
  };

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  try {
    const res = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Something went wrong.");

    showFormStatus(statusEl, "Thanks! Your message has been sent — we'll get back to you shortly.", true);
    form.reset();
  } catch (err) {
    showFormStatus(statusEl, `Could not send message: ${err.message}`, false);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Details";
  }
}

async function submitAdmissionForm(event) {
  event.preventDefault();
  const form = event.target;
  const statusEl = document.getElementById("admissionFormStatus");
  const submitBtn = form.querySelector('button[type="submit"]');

  const payload = {
    fullName: document.getElementById("fullName").value,
    age: document.getElementById("age").value,
    gender: document.getElementById("gender").value,
    education: document.getElementById("education").value,
    subject: document.getElementById("subject").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    state: document.getElementById("stateSelect").value,
    district: document.getElementById("districtSelect").value,
    course: document.getElementById("courseSelect").value,
    message: document.getElementById("msg").value,
  };

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  try {
    const res = await fetch(`${API_BASE_URL}/api/registration`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Something went wrong.");

    showFormStatus(statusEl, "Thanks! Your inquiry has been registered — our team will contact you shortly.", true);
    form.reset();
  } catch (err) {
    showFormStatus(statusEl, `Could not submit inquiry: ${err.message}`, false);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Inquiry";
  }
}
