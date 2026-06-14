const Scene = require("../models/Scene");

const loadScene = async (req, res) => {
  try {
    const scene = await Scene.findOne({
      userId: req.session.userId,
    });

    if (!scene) {
      return res.json({
        objects: [],
      });
    }

    return res.json({
      objects: scene.objects,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to load scene",
      error: error.message,
    });
  }
};

const saveScene = async (req, res) => {
  try {
    const { objects } = req.body;

    if (!Array.isArray(objects)) {
      return res.status(400).json({
        message: "Objects must be an array",
      });
    }

    const sanitizedObjects = objects.map((object) => ({
      objectId: object.objectId || object.id,
      type: object.type,
      position: object.position,
      rotation: object.rotation || [0, 0, 0],
      scale: object.scale || [1, 1, 1],
      modelUrl: object.modelUrl || "",
    }));

    const scene = await Scene.findOneAndUpdate(
      {
        userId: req.session.userId,
      },
      {
        userId: req.session.userId,
        objects: sanitizedObjects,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    return res.json({
      message: "Scene saved successfully",
      objects: scene.objects,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to save scene",
      error: error.message,
    });
  }
};

module.exports = {
  loadScene,
  saveScene,
};