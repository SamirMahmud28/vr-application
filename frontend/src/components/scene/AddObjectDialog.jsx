import { useState } from "react";

const objectOptions = [
  {
    label: "Cube",
    value: "cube",
    description: "Add a red cube to the scene",
  },
  {
    label: "Sphere",
    value: "sphere",
    description: "Add a blue sphere to the scene",
  },
];

export default function AddObjectDialog({ open, onClose, onAdd }) {
  const [selectedType, setSelectedType] = useState("cube");

  if (!open) {
    return null;
  }

  const handleAdd = () => {
    onAdd(selectedType);
    onClose();
  };

  return (
    <div
      className="scene-dialog-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="scene-dialog">
        <div className="scene-dialog-header">
          <h2>Add Object</h2>
          <button className="scene-dialog-close" onClick={onClose}>
            ×
          </button>
        </div>

        <p className="scene-dialog-text">
          Choose an object type. The object will be placed randomly inside the
          room.
        </p>

        <div className="scene-radio-group">
          {objectOptions.map((option) => (
            <label key={option.value} className="scene-radio-option">
              <input
                type="radio"
                name="objectType"
                value={option.value}
                checked={selectedType === option.value}
                onChange={(event) => setSelectedType(event.target.value)}
              />

              <span>
                <strong>{option.label}</strong>
                <small>{option.description}</small>
              </span>
            </label>
          ))}
        </div>

        <div className="scene-dialog-actions">
          <button className="scene-secondary-button" onClick={onClose}>
            Cancel
          </button>

          <button className="scene-primary-button" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}