import SceneCanvas from "../components/scene/SceneCanvas.jsx";
import "./Scene.css";

export default function Scene() {
  const handleAddObjects = () => {
    alert("Add Objects dialog will be added in the next step.");
  };

  const handleSave = () => {
    alert("Save scene feature will be connected after object movement works.");
  };

  return (
    <div className="scene-page">
      <SceneCanvas />

      <div className="scene-toolbar">
        <button className="scene-button" onClick={handleSave}>
          Save
        </button>

        <button className="scene-button" onClick={handleAddObjects}>
          Add Objects
        </button>
      </div>
    </div>
  );
}