const express = require("express");
const router = express.Router();

const { requireAuth } = require("../middleware/authMiddleware");
const { loadScene, saveScene } = require("../controllers/sceneController");

router.get("/", requireAuth, loadScene);
router.post("/", requireAuth, saveScene);

module.exports = router;