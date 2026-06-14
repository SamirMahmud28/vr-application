## Sprint 2

Goal:
Implement authentication system using session-based authentication.

Reasoning:
The assignment explicitly requires session tracking.
Therefore express-session was chosen instead of JWT authentication.

Planned Features:
- User registration
- User login
- Password hashing
- Session creation
- Protected routes


## Sprint 2.3 Completed

Implemented session-based authentication.

Features:
- User registration
- User login
- Password hashing using bcrypt
- Session persistence using express-session
- MongoDB session storage using connect-mongo

Testing:
- Signup API verified
- Login API verified
- Session creation verified
- User data persisted in MongoDB Atlas

Challenges:
- MongoDB Atlas DNS resolution issues
- connect-mongo version compatibility
- Express route export/import debugging

Resolutions:
- Switched to standard MongoDB connection string
- Used connect-mongo compatible version
- Corrected controller exports


# Development Log

## Sprint 3 Summary (Frontend Integration)

### Completed Work
- Implemented React Router for navigation
- Created Login and Signup pages
- Connected frontend to backend using Axios
- Implemented authentication API calls
- Added redirect to 3D scene after login

---

## Challenges Faced

### 1. CORS and credentials handling
- Issue: Session cookies were not being sent properly
- Solution: Configured `cors({ credentials: true })` in backend

### 2. API integration mismatch
- Issue: Frontend requests were not hitting backend correctly
- Solution: Fixed base URL and endpoint structure

---

## Learnings
- React routing structure in Vite projects
- Axios configuration for session-based authentication
- Full-stack communication between React and Express

---

## Current Understanding
The application now follows a full authentication cycle:
Frontend → Backend → Database → Session Store → Frontend redirect