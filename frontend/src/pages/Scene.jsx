import { useState } from "react";
import SceneCanvas from "../components/scene/SceneCanvas.jsx";
import AddObjectDialog from "../components/scene/AddObjectDialog.jsx";
import "./Scene.css";

function getRandomPosition(type) {
  const x = Number((Math.random() * 10 - 5).toFixed(2));
  const z = Number((Math.random() * 8 - 4).toFixed(2));

  const y = type === "sphere" ? 0.6 : 0.5;

  return [x, y, z];
}

function createSceneObject(type) {
  return {
    id:
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`,
    type,
    position: getRandomPosition(type),
  };
}

export default function Scene() {
  const [objects, setObjects] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddObject = (type) => {
    const newObject = createSceneObject(type);

    setObjects((previousObjects) => [...previousObjects, newObject]);
  };

  const handleObjectMove = (objectId, newPosition) => {
    setObjects((previousObjects) =>
      previousObjects.map((object) =>
        object.id === objectId
          ? {
              ...object,
              position: newPosition,
            }
          : object
      )
    );
  };

  const handleSave = () => {
    console.log("Scene objects to save:", objects);

    alert(
      `Save feature will be connected to MongoDB later.\nCurrent objects: ${objects.length}`
    );
  };

  return (
    <div className="scene-page">
      <SceneCanvas objects={objects} onObjectMove={handleObjectMove} />

      <div className="scene-toolbar">
        <button className="scene-button" onClick={handleSave}>
          Save
        </button>

        <div className="scene-object-count">Objects: {objects.length}</div>

        <button
          className="scene-button"
          onClick={() => setIsAddDialogOpen(true)}
        >
          Add Objects
        </button>
      </div>

      <AddObjectDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddObject}
      />
    </div>
  );
}