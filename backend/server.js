const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Hello from Express backend!"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});