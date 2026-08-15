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
| Canvas Editor | Konva-based drag-and-drop surface — add, move, resize, and layer rectangles, circles, ellipses, lines, text, and images |
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

## System Architecture & Data Flow

### 1. High-level architecture

```mermaid
flowchart LR
    subgraph FE["React SPA — Vercel"]
        Canvas[Canvas Editor - Konva]
        Redux[Redux Store]
        Axios[Axios Instance]
    end
    subgraph BE["Express API — Render"]
        MW[JWT Middleware]
        AuthRt[Auth Routes]
        DesignRt[Design Routes]
        AdminRt[Admin Routes]
        TplRt[Template Routes]
    end
    subgraph Data["Data & Media"]
        Mongo[(MongoDB Atlas)]
        Cloud[(Cloudinary)]
    end

    Canvas --> Redux --> Axios
    Axios -->|REST + Bearer JWT| MW
    MW --> AuthRt
    MW --> DesignRt
    MW --> AdminRt
    TplRt -.public, no auth.-> Mongo
    AuthRt --> Mongo
    DesignRt --> Mongo
    DesignRt --> Cloud
    AdminRt --> Mongo
    AdminRt --> Cloud
```

The frontend never talks to MongoDB or Cloudinary directly — every write goes through the Express API, secured by an explicit CORS origin allowlist (not a wildcard).

### 2. Which file calls which route

```mermaid
flowchart LR
    subgraph FE["Frontend Components"]
        Login[Login.jsx]
        Register[Register.jsx]
        GLogin[GLogin.jsx]
        Dashboard[Dashboard.jsx]
        DesignCard[DesignCard.jsx]
        Editor[Editor.jsx]
        Templates[Templates.jsx]
        AdminDash[AdminDashboard.jsx]
    end
    subgraph BE["Backend Routes"]
        AuthR["Routes/auth.js"]
        DesignR["Routes/designs.js"]
        TemplateR["Routes/templates.js"]
        AdminR["Routes/admin.js"]
    end

    Login -->|"POST /api/auth/login"| AuthR
    Register -->|"POST /api/auth/register"| AuthR
    GLogin -->|"POST /api/auth/google-login"| AuthR
    Dashboard -->|"GET /api/designs"| DesignR
    DesignCard -->|"PUT / DELETE /api/designs/:id"| DesignR
    Editor -->|"POST /api/designs"| DesignR
    Templates -->|"GET /api/templates"| TemplateR
    AdminDash -->|"GET/POST/DELETE /api/admin/*"| AdminR
```

### 3. Authentication flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as React App
    participant G as Google
    participant A as /api/auth
    participant DB as MongoDB

    alt Email / Password
        U->>F: submit login/register form
        F->>A: POST /login or /register
        A->>DB: find or create User, compare hash
    else Google Sign-In
        U->>F: click Google button
        F->>G: OAuth popup
        G-->>F: ID token
        F->>A: POST /google-login {tokenId}
        A->>G: verify ID token
        A->>DB: find or create User
    end
    A-->>F: {token, _id, username, role}
    F->>F: save to sessionStorage + Redux setUser
    F-->>U: redirect to /dashboard
```

Every later request is authenticated the same way — one `axiosInstance` interceptor reads the token from `sessionStorage` and attaches `Authorization: Bearer <token>` automatically.

### 4. Request authorization (middleware)

```mermaid
flowchart TD
    Req[Incoming Request] --> HasToken{Authorization header?}
    HasToken -->|No| R401[401 Unauthorized]
    HasToken -->|Yes| Verify[jwt.verify]
    Verify -->|Invalid| R401b[401 Invalid token]
    Verify -->|Valid| SetUser[req.user = decoded]
    SetUser --> NeedsAdmin{Admin-only route?}
    NeedsAdmin -->|Yes| RoleCheck{role === admin?}
    RoleCheck -->|No| R403[403 Admins only]
    RoleCheck -->|Yes| Handler[Route Handler]
    NeedsAdmin -->|No| Owner{req.user.id === resource.createdBy or admin?}
    Owner -->|No| R403b[403 Forbidden]
    Owner -->|Yes| Handler
```

### 5. Redux state shape

```mermaid
flowchart TD
    subgraph Store["Redux Store (redux-persist whitelists only 'user')"]
        US["user slice
        user, isAdmin, allUsers"]
        DS["designs slice
        list, selected, status"]
        SS["shapes slice
        shapes, history, future"]
    end
    Auth[Login / Register] --> US
    Dash[Dashboard mount] -->|fetchDesigns thunk| DS
    DS -->|setSelectedDesign| Edit[Open in Editor]
    Edit -->|replaceAll on load| SS
    Edit -->|addShape / updateShape / removeShape| SS
```

`shapes` is intentionally left out of persistence — it's live editor state, re-hydrated fresh from a saved design each time.

### 6. Undo / redo

```mermaid
flowchart LR
    Change[Shape added/moved/deleted] -->|1 push snapshot of current shapes| Hist[(history stack)]
    Change -->|2 apply the change| Cur[current shapes]
    Undo[Undo] -->|pop| Hist
    Undo -->|push current shapes| Fut[(future stack)]
    Undo --> Cur
    Redo[Redo] -->|pop| Fut
    Redo -->|push current shapes| Hist
    Redo --> Cur
```

A snapshot-stack pattern (`JSON.stringify` of the whole shapes array), not a diff/patch system — simple to explain, though memory grows with edit count.

### 7. Save flow (dual persistence)

```mermaid
sequenceDiagram
    participant U as User
    participant E as Editor.jsx
    participant API as /api/designs
    participant CL as Cloudinary
    participant DB as MongoDB

    U->>E: click "Save"
    E->>E: Stage.toDataURL() -> PNG (base64)
    E->>API: POST {Shapes[], name, username, imageData}
    API->>CL: upload(imageData)
    CL-->>API: secure_url, public_id
    API->>DB: Design.create({Shapes, thumbnailUrl, ...})
    DB-->>API: saved document
    API-->>E: 201 design doc
    E->>E: dispatch(fetchDesigns)
    E-->>U: "Design saved successfully!"
```

Two things travel together on save: the **Shapes array** (vector data, so the design stays re-editable) and the **rasterized PNG** (so the dashboard thumbnail renders instantly without re-drawing the canvas).

### 8. Load flow

```mermaid
flowchart LR
    Dash[Dashboard: fetchDesigns] --> Cards["DesignCard list
    (thumbnailUrl preview)"]
    Cards -->|click a card| Sel[dispatch setSelectedDesign]
    Sel --> Nav[navigate to /editor]
    Nav --> Eff[Editor useEffect on selectedDesign]
    Eff -->|coerceId + replaceAll| Hydrate[shapes slice hydrated]
    Hydrate --> Render[Konva Stage renders shapes]
```

### 9. Export flow — contrast with save

```mermaid
flowchart LR
    Stage[Konva Stage] -->|toDataURL| PNG[PNG data URI]
    PNG -->|trigger browser download| PNGFile[design.png]
    PNG -->|jsPDF.addImage| PDF[PDF document]
    PDF -->|trigger browser download| PDFFile[design.pdf]
```

Same rasterization step as Save, but export never calls the backend at all — everything happens client-side.

### 10. Roles & admin surface

```mermaid
flowchart TD
    Role{User role} -->|user| UserScope["/api/designs
    own designs only"]
    Role -->|admin| AdminScope["/api/admin/*"]
    AdminScope --> AllDesigns[View / delete any design]
    AdminScope --> Templates[Create / list / delete templates]
    AdminScope --> Users[List / delete users]
    NoAuth[No auth needed] --> PublicTpl["/api/templates
    public gallery, filter by category"]
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
