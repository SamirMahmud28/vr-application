const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const sceneRoutes = require("./routes/sceneRoutes");

dotenv.config();

// Connect DB FIRST
connectDB();

const app = express();
app.set("trust proxy", 1);

// ======================
// Middlewares
// ======================
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

// ======================
// Session Middleware
// ======================
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    cookie: {
  maxAge: 1000 * 60 * 60 * 24,
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  secure: process.env.NODE_ENV === "production",
},
  })
);

// ======================
// Routes
// ======================
app.use("/api/auth", authRoutes);
app.use("/api/scene", sceneRoutes);

app.get("/api/test", (req, res) => {
  res.json({ message: "Server working" });
});

// ======================
// Start Server
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});