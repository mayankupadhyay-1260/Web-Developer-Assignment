# Contacts Manager – CRUD Web App

This project is a lightweight but fully functional Contacts Manager built from the ground up with plain HTML and CSS on the frontend and a simple Node.js + Express backend powered by MongoDB.

The focus of the build is clarity over complexity. No frameworks, no unnecessary tooling — just the essentials working together.

## Project Capabilities

The application currently supports:

## Adding new contacts

Viewing a list of all saved contacts

## Editing existing contacts

## Deleting contacts

Validating required fields (name, email and phone)

Preventing duplicate email entries

Permanently storing contacts in a MongoDB database

Every action in the UI communicates with your backend API.
There is no localStorage being used for data storage.

Not Included

These features are intentionally not implemented:

Sorting or pagination

Authentication or login

JWT

Docker or containerization

Continuous integration or pipelines

Automated test suites

This allows the current codebase to stay clean and easy to extend.

Technology Stack

Frontend: HTML, CSS and Vanilla JavaScript
Backend: Node.js with Express
Database: MongoDB and Mongoose

No UI libraries, no React, and no bundlers.

Project Structure
project
├── server.js
├── package.json
├── README.md
├── models
│   └── contact.js
└── public
    ├── index.html
    ├── form.html
    ├── script.js
    └── style.css

Running the Project
1. Install dependencies
npm install

2. Start MongoDB
mongod

3. Run the server
node server.js

4. Open the application in a browser
http://localhost:3000


Everything (HTML, JS, CSS and API) runs from the same server.

API Endpoints
Get all contacts
GET /api/contacts

Get a contact by ID
GET /api/contacts/:id

Create a new contact
POST /api/contacts


Required JSON fields:

name

email

phone

Update a contact
PUT /api/contacts/:id

Delete a contact
DELETE /api/contacts/:id

Database Model

Contacts are stored with the following fields:

name (required)

email (required, unique)

phone (required)

Mongoose validates and saves each document to MongoDB.

Application Flow
index.html

Loads and displays all contacts from the backend.
Includes a basic search filter.
Allows editing or deleting a contact.

form.html

Used for creating and updating contacts.
Auto-fills fields when editing.
Validates input before sending data.

script.js

Handles fetch requests to the backend API:

GET to list contacts

POST to add contacts

PUT to update contacts

DELETE to remove contacts
Updates the DOM dynamically and keeps track of edit mode using localStorage.

Summary

This project demonstrates a complete CRUD workflow with minimal tools and maximum clarity.
The browser communicates with a Node.js backend which interacts with MongoDB through Mongoose.
The result is a clean, working application suitable for learning full-stack development and meeting CRUD assignment requirements.
