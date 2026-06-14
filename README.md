# VR Web Application (Three.js + MERN Stack)

## Overview
This project is a full-stack 3D web application where users can:
- Register and login securely
- Enter a 3D interactive scene
- Add and manipulate objects
- Save and reload scene state using MongoDB

---

## Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- Three.js (planned in next sprint)

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- express-session
- connect-mongo
- bcrypt

---

## Architecture

---

## Authentication Flow

1. User signs up or logs in
2. Backend verifies credentials
3. Session is created and stored in MongoDB
4. Frontend redirects user to 3D scene
5. Session persists across refresh

---

## Current Progress

### Sprint 1 — Project Setup
✔ Initialized frontend and backend  
✔ Configured Git repository  
✔ Installed dependencies  

### Sprint 2 — Backend Development
✔ MongoDB Atlas integration  
✔ User model creation  
✔ Authentication API (Signup/Login)  
✔ Session-based authentication  
✔ Password hashing (bcrypt)  

### Sprint 3 — Frontend Integration
✔ React routing setup  
✔ Login & Signup UI  
✔ Axios API integration  
✔ Authentication flow connected to backend  

---

## Current Status
- Authentication system fully functional
- Frontend and backend connected
- Session persistence working
- Ready for 3D scene development

---

## Next Phase (Sprint 4)

### 3D Scene Development (Three.js / React Three Fiber)

Planned features:
- Interactive 3D environment
- Add objects (Cube, Sphere, GLTF models)
- Drag & drop object manipulation
- Object transformation (scale, rotate)
- Save scene state to MongoDB
- Load saved scene on login