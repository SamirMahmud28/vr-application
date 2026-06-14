const mongoose = require("mongoose");

const sceneObjectSchema = new mongoose.Schema(
  {
    objectId: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["cube", "sphere", "custom-model-1", "custom-model-2"],
    },

    position: {
      type: [Number],
      required: true,
      default: [0, 0.5, 0],
    },

    rotation: {
      type: [Number],
      default: [0, 0, 0],
    },

    scale: {
      type: [Number],
      default: [1, 1, 1],
    },

    modelUrl: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  }
);

const sceneSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    objects: {
      type: [sceneObjectSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Scene", sceneSchema);