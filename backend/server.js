const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

// Connect DB FIRST
connectDB();

const app = express();

// ======================
// Middlewares
// ======================
app.use(cors({
  origin: "http://localhost:5173", // React frontend
  credentials: true
}));

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
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      secure: false // keep false for local dev
    },
  })
);

// ======================
// Routes
// ======================
app.use("/api/auth", authRoutes);

app.get("/api/test", (req, res) => {
  res.json({ message: "Server working" });
});

// ======================
// Start Server
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});