const API = "/api/contacts";

// Get all contacts from backend
async function getContacts() {
  const res = await fetch(API);
  return await res.json();
}

// Populate table
async function loadContacts() {
  const table = document.getElementById("contactsTable");
  if (!table) return;

  const contacts = await getContacts();
  table.innerHTML = "";

  contacts.forEach((c, idx) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${c.name}</td>
      <td>${c.email}</td>
      <td>${c.phone}</td>
      <td class="align-right">
        <button class="text-button blue" onclick="editContact(${idx})">Edit</button>
        <button class="text-button red" onclick="deleteContact(${idx})">Delete</button>
      </td>
    `;
    table.appendChild(row);
  });
}

// Store edit index
function editContact(index) {
  localStorage.setItem("editIndex", index);
  window.location.href = "form.html";
}

// Load form for editing
async function loadForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const index = localStorage.getItem("editIndex");
  if (index !== null) {
    const contacts = await getContacts();
    const c = contacts[index];
    form.name.value = c.name;
    form.email.value = c.email;
    form.phone.value = c.phone;
  }
}

// Delete from database
async function deleteContact(index) {
  const contacts = await getContacts();
  const id = contacts[index]._id;
  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadContacts();
}

// Handle form submit
function handleFormSubmit() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();

    if (!name || !email || !phone) return alert("All fields are required");
    if (!email.includes("@")) return alert("Invalid email");
    if (phone.length < 10) return alert("Phone must be at least 10 digits");

    const contacts = await getContacts();
    const index = localStorage.getItem("editIndex");

    const payload = { name, email, phone };

    if (index === null) {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      const id = contacts[index]._id;
      await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      localStorage.removeItem("editIndex");
    }

    window.location.href = "index.html";
  });
}

// Search filter (no changes needed)
function addSearch() {
  const search = document.getElementById("search");
  if (!search) return;

  search.addEventListener("input", function () {
    const term = search.value.toLowerCase();
    const rows = document.querySelectorAll("#contactsTable tr");
    rows.forEach(row => {
      const text = row.innerText.toLowerCase();
      row.style.display = text.includes(term) ? "" : "none";
    });
  });
}

// bootstrap
loadContacts();
loadForm();
handleFormSubmit();
addSearch();
