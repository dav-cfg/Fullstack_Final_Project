<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=Novy-Grafyniq&fontSize=60&animation=fadeIn" alt="Novy-Grafyniq"/>
</p>

<p align="center">
  <strong>A browser-based design tool for posters, banners, and social media visuals</strong>
</p>

<p align="center">
  <a href="https://novy-grafyniq.vercel.app/" target="_blank">Live Demo</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
  <img src="https://img.shields.io/badge/Render-000000?style=for-the-badge&logo=render&logoColor=white" />
</p>

---

## About

Novy-Grafyniq is a Canva-style design tool that runs entirely in the browser. Users create posters, banners, and social media graphics on an interactive canvas — placing shapes, text, and images — then save the design to the cloud, export it as a PNG/PDF, or come back to it later from any device.

It is a MERN application: a React (Vite) single-page app for the canvas editor, and a Node.js/Express REST API backed by MongoDB Atlas, with Cloudinary handling image storage.

---

## Features

| Feature | What it does |
|---|---|
| Canvas Editor | Canva-based drag-and-drop surface — add, move, resize, and layer rectangles, circles, ellipses, lines, text, and images |
| Undo / Redo | Full history control while editing, implemented as a snapshot stack in Redux |
| Image Uploads | Import images from the user's device directly onto the canvas |
| Text Tools | Add and style text (font family, size, bold/italic, color) |
| Cloud Save | Designs are saved as structured data + a rendered thumbnail, retrievable from any device |
| Export | Download the current canvas as a PNG or PDF, entirely client-side |
| Secure Authentication | Email/password (JWT) or Google Sign-In; each user's designs are private to their account |
| Template Gallery | Browse admin-curated design templates by category |
| Admin Dashboard | Role-gated views for managing all designs, templates, and users |
| Responsive Design | Built with Tailwind CSS across desktop, tablet, and mobile |

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend framework | React 19 + Vite, React Router v7 | SPA shell and client-side routing |
| Canvas engine | Konva + react-konva, use-image | The actual drawing surface — shapes, drag/resize, transforms |
| State management | Redux Toolkit + redux-persist | Global state for user session, saved designs, and live canvas shapes |
| Styling | Tailwind CSS v4 | Utility-first styling, responsive layout |
| Export | html2canvas, jsPDF, file-saver | Client-side PNG/PDF export of the canvas |
| Auth (client) | @react-oauth/google, jwt-decode, axios | Google Sign-In widget, token handling, API calls |
| Backend runtime | Node.js + Express | REST API server |
| Database | MongoDB Atlas via Mongoose | Stores users, designs, templates |
| Media storage | Cloudinary | Stores rendered PNG snapshots of designs and template images |
| Auth (server) | jsonwebtoken, bcryptjs, google-auth-library | Issues/verifies JWTs, hashes passwords, verifies Google ID tokens |
| Deployment | Vercel (frontend), Render (backend), MongoDB Atlas (DB) | Hosting |

> Note: the frontend is a Vite + React SPA (not Next.js) — this replaces the earlier tech-stack listing.

---

## Project Structure

```
Fullstack_Final_Project/
├─ backend/
│  ├─ server.js                     # Express app entry — CORS, JSON body limit, route mounting
│  ├─ Config/
│  │  ├─ db.js                      # Mongoose connection to MongoDB Atlas
│  │  └─ cloudinary.js              # Cloudinary SDK config
│  ├─ Models/
│  │  ├─ User.js                    # username/email/password(hashed)/role/googleId
│  │  ├─ Designs.js                 # name, Shapes[] (Mixed), createdBy, thumbnailUrl, assetUrl, cloudinaryPublicId
│  │  └─ Template.js                # name, category, imageUrl, cloudinaryPublicId
│  ├─ Routes/
│  │  ├─ auth.js                    # /register, /login, /admin-login, /google-login
│  │  ├─ designs.js                 # CRUD for a user's own designs (owner/admin checks inline)
│  │  ├─ admin.js                   # admin-only: all designs, templates, user management
│  │  └─ templates.js               # public read-only template listing
│  └─ src/utilities/
│     ├─ index.js                   # authenticateToken — verifies JWT, populates req.user
│     └─ authenticateAdmin.js       # wraps authenticateToken, then checks role === "admin"
├─ frontend/
│  ├─ src/
│  │  ├─ main.jsx                   # Router + Redux Provider + PersistGate — app entry
│  │  ├─ store/
│  │  │  ├─ store.js                # combines reducers, persists only the `user` slice
│  │  │  ├─ userSlice.js            # current user, isAdmin flag, admin's user list
│  │  │  ├─ designSlice.js          # async thunks: fetch/create/update/delete a design
│  │  │  └─ shapesSlice.js          # live canvas shapes + undo/redo history/future stacks
│  │  ├─ Canvas/
│  │  │  ├─ Editor.jsx              # the canvas itself — Konva Stage/Layer, shape factories, save/export
│  │  │  └─ EditNavbar.jsx          # toolbar: add shape, color/font controls, save/export/undo buttons
│  │  ├─ pages/                     # route-level screens: Dashboard, Editor, Templates, About, Admin*, Users
│  │  ├─ Login/, Register/          # auth forms + Google login button
│  │  ├─ Cards/                     # DesignCard (dashboard tile), UserCard (admin user list)
│  │  ├─ Header/, Components/       # Navbar, AdminNavbar, Layout (Outlet wrapper)
│  │  └─ utils/axiosinstance.js     # axios instance; interceptor attaches Bearer token from sessionStorage
│  └─ vercel.json                   # Vite SPA rewrite rules for Vercel
├─ package.json
└─ README.md
```

---

## How the Website Works

This section explains things in plain language, using simple diagrams instead of technical system-design notation. A quick note on words used below:

- **Frontend** = what you see and click in the browser (built with React).
- **Backend / Server** = the program that does the real work behind the scenes (built with Node.js/Express).
- **Token** = a kind of digital pass you get after logging in, so you don't have to re-enter your password for every action.

### 1. The big picture

```mermaid
flowchart LR
    A[Your Browser<br/>the React app] -->|sends requests| B[Server<br/>Node + Express]
    B -->|saves design data| C[(Database<br/>MongoDB)]
    B -->|saves pictures| D[(Image Storage<br/>Cloudinary)]
```

Your browser never talks to the database or image storage directly. It always asks the server, and the server does the actual saving.

### 2. What each part of the code does

```mermaid
flowchart LR
    subgraph FE["Frontend pages"]
        Login[Login / Sign up]
        Dashboard[Dashboard - your designs]
        Editor[Editor - the canvas]
        Templates[Templates page]
    end
    subgraph BE["Backend - grouped by job"]
        AuthPart[Handles login & signup]
        DesignPart[Handles saving & loading designs]
        TemplatePart[Handles templates]
        AdminPart[Handles admin-only actions]
    end

    Login --> AuthPart
    Dashboard --> DesignPart
    Editor --> DesignPart
    Templates --> TemplatePart
```

Each page on the frontend talks to one matching part of the backend. This is a simple, useful thing to say in an interview: "my Login page talks to the auth part of the backend, my Editor talks to the designs part," and so on.

### 3. Logging in

```mermaid
flowchart TD
    A[User enters username & password<br/>or clicks Sign in with Google] --> B[Sent to the server]
    B --> C{Correct?}
    C -->|No| D[Show error message]
    C -->|Yes| E[Server creates a token]
    E --> F[Token is stored in the browser]
    F --> G[User is taken to the Dashboard]
```

Whether you log in with a password or with Google, the end result is the same: the server gives you a token, and the browser remembers it.

### 4. Using your token

```mermaid
flowchart LR
    A[User clicks Save, Delete, etc.] --> B[Browser attaches the token automatically]
    B --> C{Is the token valid?}
    C -->|No| D[Blocked - please log in again]
    C -->|Yes| E[Server performs the action]
```

You don't have to log in again for every click — the browser quietly attaches your token to every request behind the scenes.

### 5. What the app remembers while you use it

```mermaid
flowchart TD
    A[Shared app storage] --> B[Who's currently logged in]
    A --> C[List of your saved designs]
    A --> D[Shapes currently on the canvas]
```

This shared storage is called **Redux**. Think of it as one box that every screen of the app can look into, instead of each screen having to ask for the same information separately.

### 6. Undo / Redo

```mermaid
flowchart LR
    A[You make a change] --> B[Old version gets saved in a list]
    B --> C[New version shows on screen]
    D[Click Undo] --> E[Go back to the last saved version]
    F[Click Redo] --> G[Go forward again]
```

It's just a list of "before" snapshots. Undo steps backward through the list; redo steps forward again.

### 7. Saving a design

```mermaid
flowchart TD
    A[Click Save] --> B[App takes a picture of the canvas]
    B --> C[Picture + shape data sent to the server]
    C --> D[Server uploads the picture to Cloudinary]
    D --> E[Server saves the picture link + shape data in MongoDB]
    E --> F[Design now shows up on your Dashboard]
```

Two things get saved together: the actual shapes (so you can reopen and keep editing), and a picture (so the Dashboard has something to show as a preview).

### 8. Opening a saved design

```mermaid
flowchart TD
    A[Dashboard shows your saved designs] --> B[Click one]
    B --> C[App loads that design's shape data]
    C --> D[Canvas fills back in with those shapes]
```

### 9. Exporting as PNG or PDF

```mermaid
flowchart LR
    A[Click Export] --> B[Browser takes a picture of the canvas]
    B --> C{PNG or PDF?}
    C -->|PNG| D[Downloads as an image file]
    C -->|PDF| E[Wrapped into a PDF file]
```

Export is different from Save — it never touches the server at all. Everything happens right there in your browser.

### 10. Regular user vs. Admin

```mermaid
flowchart TD
    A[Logged-in user] --> B{What's their role?}
    B -->|Regular user| C[Can see & edit only their own designs]
    B -->|Admin| D[Can see & manage everyone's designs, templates, and users]
```

---

## Local Setup

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` (see `.env.example`):

```
MONGO_URI=<your MongoDB Atlas URI>
CLOUDINARY_CLOUD_NAME=<your cloud name>
CLOUDINARY_API_KEY=<your api key>
CLOUDINARY_API_SECRET=<your api secret>
JWT_SECRET=<your secret key>
GOOGLE_CLIENT_ID=<your google oauth client id>
FRONTEND_URL=https://novy-grafyniq.vercel.app
PORT=3000
```

```bash
npm start
```

### Frontend

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/` (see `.env.example`):

```
VITE_API_BASE_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=<your google oauth client id>
```

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Team & Contributions

Built as a 2-person collaboration, split cleanly by layer:

| Contributor | Role |
|---|---|
| **Noor Aisha** | Frontend — canvas editor, drag-and-drop interface, undo/redo, image upload UI, text tools, responsive design, client-side auth integration |
| **Davidica Asare** | Backend — Node.js/Express API, MongoDB schemas, authentication logic, cloud-save endpoints |

---

## Future Enhancements

- Route-level auth guards (a shared `PrivateRoute`/`AdminRoute` wrapper instead of per-page checks)
- Wire the Template Gallery into the editor (click a template → load its shapes onto the canvas)
- Consolidate the duplicate auth-middleware implementations and the currently-unused `controllers/` files into the actual `Routes/` logic
- Dark / light theme toggle
- Real-time collaborative editing via WebSockets
- Analytics dashboard for usage tracking
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
  <img src="https://img.shields.io/badge/Render-000000?style=for-the-badge&logo=render&logoColor=white" />
</p>




