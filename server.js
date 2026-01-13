import express from "express";
import mongoose from "mongoose";
import path from "path";
import { Contact } from "./models/contact.js";

const app = express();
const PORT = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/contactsdb");

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});
mongoose.connection.on("error", (err) => {
  console.log("MongoDB Error:", err);
});

app.use(express.json());

// Serve static frontend
app.use(express.static(path.join(process.cwd(), "public")));

// CREATE
app.post("/api/contacts", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await Contact.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newContact = await Contact.create({ name, email, phone });
    res.json(newContact);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// READ ALL
app.get("/api/contacts", async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

// READ ONE
app.get("/api/contacts/:id", async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(contact);
});

// UPDATE
app.put("/api/contacts/:id", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await Contact.findOne({ email, _id: { $ne: req.params.id } });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE
app.delete("/api/contacts/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
