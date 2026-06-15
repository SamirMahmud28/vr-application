\# VR Application - Submission Notes



\## Public GitHub Repository



GitHub Repository: https://github.com/SamirMahmud28/vr-application



\## Live Demo



Live Demo: https://vr-application-sigma.vercel.app



> Note: The application is currently completed and tested locally. The live deployment link will be added after deployment.



\## Project Overview



This project is a full-stack 3D web application built for the Techdojo technical round. The application allows users to sign up, log in using session-based authentication, enter a 3D scene, add different objects, drag and move objects inside the scene, save the scene state to MongoDB, and load the saved scene again after login.



\## Technology Stack



\### Frontend



\* React

\* Vite

\* React Router

\* Axios

\* Three.js

\* React Three Fiber

\* Drei



\### Backend



\* Node.js

\* Express.js

\* MongoDB Atlas

\* Mongoose

\* Express Session

\* Connect Mongo

\* Bcrypt



\## Completed Features



\### Authentication



\* User signup

\* User login

\* Password hashing using bcrypt

\* Session-based authentication

\* MongoDB-backed session storage

\* Logout flow



\### 3D Scene



\* 3D room/environment setup

\* Camera and lighting

\* Floor and wall environment

\* Add Objects dialog

\* Add cube

\* Add sphere

\* Add custom GLB/GLTF models

\* Random object placement inside the room

\* Multiple objects can be added

\* Object drag-and-drop movement

\* Visual feedback while hovering and dragging objects



\### Scene Persistence



\* Save scene objects to MongoDB

\* Save object type, position, rotation, scale, and model URL

\* Load previously saved scene after login

\* User-specific scene storage



\## Challenges Encountered



\### 1. Session-Based Authentication



One challenge was maintaining the logged-in user session between the frontend and backend. This was solved by using `express-session`, `connect-mongo`, and Axios `withCredentials: true`.



\### 2. Saving User-Specific Scene Data



The scene needed to be saved separately for each user. This was handled by storing the scene against the logged-in user's session ID and using a dedicated Scene model in MongoDB.



\### 3. Dragging Objects in 3D Space



Dragging objects in a 3D environment is more complex than normal 2D dragging. The solution used pointer events, raycasting, and a floor-based drag plane to calculate new object positions.



\### 4. GLB Model Size Differences



Different GLB models had different original scales. For example, the duck model initially appeared too small. This was fixed by applying custom scale values for each model type.



\### 5. Keeping the Code Simple and Interview-Friendly



The project was built step by step with simple controllers, routes, services, and components to keep the code easy to understand and evaluate.



\## New Knowledge and Skills Learned



While building this project, I improved my understanding of:



\* React Three Fiber scene setup

\* Three.js object positioning and rendering

\* Loading GLB/GLTF models in React

\* Mouse-based object dragging in 3D space

\* Session-based authentication with Express

\* MongoDB session storage

\* Saving and loading 3D scene state

\* Structuring a full-stack React and Express project



\## AI Tool Usage



I used AI assistance as a development guide for planning, debugging, and improving the project step by step. AI was used to:



\* Break down the technical requirement into development sprints

\* Plan the backend and frontend integration

\* Understand React Three Fiber scene structure

\* Debug object dragging and scene persistence issues

\* Improve README/submission documentation



All code was reviewed, tested, and run locally before being committed to the GitHub repository.



\## Estimated Completion



Estimated completion: 95%



Core requirements are completed:



\* Authentication

\* 3D scene

\* Add objects

\* Drag objects

\* Save scene

\* Load scene

\* Custom GLB models

\* Logout flow



Remaining optional/final work:



\* Live deployment

\* Final UI polish

\* Final production environment setup



