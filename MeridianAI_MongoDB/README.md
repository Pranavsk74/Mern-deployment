# Meridian AI — PE Firm Finder (MongoDB + Mongoose)

A beginner-friendly academic project for **Implementation of CRUD Operations using MongoDB and Mongoose**.

## What it demonstrates
- **Database model:** `models/Firm.js` (Mongoose schema)
- **REST API:** Express routes in `routes/firmRoutes.js`
- **CRUD:** Create, Read, Update and Delete PE firms
- **Endpoint testing:** use Thunder Client in VS Code
- **Basic UI:** form to add/update firms, directory cards, search and delete buttons

## Requirements
- Node.js LTS installed
- A MongoDB Atlas account (online MongoDB; no local MongoDB installation required)
- VS Code; Thunder Client extension for endpoint testing

## Run the project
1. Extract the ZIP and open the `MeridianAI_MongoDB` folder in VS Code.
2. Open the VS Code terminal in this folder.
3. Run `npm install`.
4. Copy `.env.example` and rename the copy to `.env`.
5. Replace `MONGODB_URI` in `.env` with your MongoDB Atlas connection string. See the step-by-step guide in the chat/experiment notes.
6. Run `npm start`.
7. Open `http://localhost:5000`.
