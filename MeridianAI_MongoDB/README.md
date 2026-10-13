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

## API endpoints
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check server is running |
| GET | `/api/firms` | Read all firms |
| GET | `/api/firms/:id` | Read one firm by MongoDB ID |
| POST | `/api/firms` | Create a firm |
| PUT | `/api/firms/:id` | Update a firm |
| DELETE | `/api/firms/:id` | Delete a firm |

Optional filters: `/api/firms?search=technology`, `/api/firms?sector=Technology`, `/api/firms?location=Mumbai`, `/api/firms?stage=Growth`.

## Sample POST/PUT JSON
```json
{
  "name": "Meridian Capital Partners",
  "sector": "Technology",
  "location": "Mumbai, India",
  "investmentStage": "Growth",
  "investmentRange": "$5M-$25M",
  "website": "https://example.com",
  "description": "Illustrative sample firm for the academic demonstration."
}
```

## Common problems
- **`MONGODB_URI is missing`:** check that `.env` exists in the project root and the variable is spelled exactly `MONGODB_URI`.
- **MongoDB authentication failed:** check Atlas database username/password. URL-encode special characters in the password.
- **IP not allowed / connection timeout:** in Atlas Network Access, add your current IP address.
- **Cannot find module:** run `npm install` from the project root.
- **Port already in use:** change `PORT=5000` to another port such as `5001` in `.env`, then restart.

## Notes
The sample firm names/data you enter are for demonstration only. This project does not provide verified investment advice or live financial data.
