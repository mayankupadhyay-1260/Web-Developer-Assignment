# Contacts Manager – CRUD Web App

This project is a lightweight but fully functional Contacts Manager built entirely with plain HTML, CSS and JavaScript on the frontend, and a Node.js + Express backend connected to MongoDB using Mongoose.

The focus is on writing clear, understandable code that demonstrates how a complete CRUD pipeline works without using heavy frontend frameworks or additional tooling.

---

## Project Capabilities

The application currently supports:

- Adding new contacts
- Viewing all saved contacts
- Editing existing contacts
- Deleting contacts
- Validating required fields (name, email, phone)
- Checking email uniqueness
- Storing all data in a MongoDB database

All data is saved in a real database and loaded from the backend using fetch calls.

### Not Included

To focus strictly on core CRUD, these features are not implemented:

- Sorting or pagination
- User authentication or JWT
- Docker or deployment files
- CI/CD pipelines
- Automated unit tests

---

## Technology Stack

**Frontend:**  
- HTML  
- CSS  
- Vanilla JavaScript

**Backend:**  
- Node.js  
- Express

**Database:**  
- MongoDB  
- Mongoose ODM

No React, Angular, Tailwind, Bootstrap or build systems are used.

---

## Project Structure

project
├── server.js
├── package.json
├── README.md
├── models
│ └── contact.js
└── public
├── index.html
├── form.html
├── script.js
└── style.css


---

## Running the Project

### 1. Install Project Dependencies
```bash
npm install

mongod
node server.js
http://localhost:3000
GET /api/contacts
GET /api/contacts/:id
POST /api/contacts
{
  "name": "Example",
  "email": "user@example.com",
  "phone": "9876543210"
}
PUT /api/contacts/:id
DELETE /api/contacts/:id

## Database Model

Each contact document contains:

name (required)

email (required, must be unique)

phone (required)

Mongoose validates and persists data inside the MongoDB collection.

How the Application Works
index.html

Loads all contacts and displays them in a table.
Contains a search box for filtering.
Provides edit and delete buttons for each row.

form.html

Used to add new contacts or edit existing ones.
Detects edit mode based on a stored index.
Validates fields before sending data to the backend.

script.js

Communicates with the backend using fetch:

GET loads contacts into the UI

POST creates a new contact

PUT updates an existing contact

DELETE removes a contact

DOM is updated dynamically based on server responses.

Summary

This project provides a complete example of how a frontend, backend and database work together to perform CRUD operations.
It demonstrates full-stack development fundamentals using minimal tools, making the code approachable, readable and easy to extend in future versions.
