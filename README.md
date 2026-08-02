<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=Novy-Grafyniq&fontSize=60&animation=fadeIn" alt="Novy-Grafyniq"/>
</p>

<p align="center">
  <img width="80" height="80" alt="Novy Grafyniq logo" src="https://github.com/user-attachments/assets/a5b8ea47-156b-4847-819c-c761b2ca87ca" />
</p>

<p align="center">
  <strong>A browser-based design tool for posters, banners, and social media visuals</strong>
</p>

<p align="center">
  <a href="https://novy-grafyniq.vercel.app/" target="_blank">Live Demo</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
  <img src="https://img.shields.io/badge/Render-000000?style=for-the-badge&logo=render&logoColor=white" />
</p>

---

## About

Novy-Grafyniq is a Canva-style design tool that runs entirely in the browser. Users can create posters, banners, and social media graphics without installing any software — just an interactive canvas, image uploads, text customization, and cloud-saved projects accessible from any device.

It's built as a full-stack MERN application, with Next.js on the frontend for performance and React for the interactive canvas editor.

---

## Features

| Feature | What it does |
|---|---|
| Canvas Editor | Drag-and-drop design surface — place, move, and layer elements freely |
| Undo / Redo | Full history control while editing a design |
| Image Uploads | Import images directly from the user's device into a design |
| Text Tools | Add and customize text with different fonts, colors, and sizes |
| Cloud Save | Designs are saved to the backend and accessible from any device, any time |
| Secure Authentication | JWT-based login, so each user's designs stay private to their account |
| Responsive Design | Works across desktop, tablet, and mobile |

---

## Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
  <img src="https://img.shields.io/badge/Render-000000?style=for-the-badge&logo=render&logoColor=white" />
</p>

| Layer | Technology |
|---|---|
| Frontend | React + Next.js |
| Backend | Node.js + Express |
| Database | MongoDB (MongoDB Atlas) |
| Auth | JWT |
| Deployment | Frontend on Vercel, backend on Render |

---

## Project Structure

```
Novy-Grafyniq/
├─ backend/                # Node.js + Express API
│  ├─ controllers/         # Route logic
│  ├─ models/               # MongoDB schemas
│  ├─ routes/               # API endpoints
│  ├─ config/                # DB and environment config
│  └─ server.js             # Backend entry point
├─ frontend/               # Next.js + React frontend
│  ├─ pages/                 # React pages
│  ├─ components/          # Reusable UI components
│  └─ styles/                # CSS / Tailwind styles
├─ package.json
└─ README.md
```

---

## Local Setup

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```
PORT=5000
MONGO_URI=<your MongoDB Atlas URI>
JWT_SECRET=<your secret key>
```

Run the backend:
```bash
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## Team & Contributions

This was built as a 2-person collaboration, split cleanly by layer:

| Contributor | Role |
|---|---|
| [**Noor Aisha**](https://github.com/NoorAisha25) | Frontend — canvas editor, drag-and-drop interface, undo/redo, image upload UI, text tools, responsive design, client-side auth integration |
| [**Davidica Asare**](https://github.com/dav-cfg) | Backend — Node.js/Express API, MongoDB schemas, authentication logic, cloud-save endpoints |

<div align="center">
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/NoorAisha25">
        <img src="https://avatars.githubusercontent.com/u/119750814?v=4" width="100px;" alt="Noor Aisha"/><br />
        <sub><b>Noor Aisha</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/dav-cfg">
        <img src="https://avatars.githubusercontent.com/u/000000?v=4" width="100px;" alt="Davidica Asare"/><br />
        <sub><b>Davidica Asare</b></sub>
      </a>
    </td>
  </tr>
</table>
</div>

---

## Future Enhancements

- Dark / light theme toggle
- Role-based access control
- A content-management layer for reusable design templates
- Analytics dashboard for usage tracking
- Real-time collaborative editing via WebSockets
