import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SceneCanvas from "../components/scene/SceneCanvas.jsx";
import AddObjectDialog from "../components/scene/AddObjectDialog.jsx";
import { loadScene, saveScene } from "../services/sceneService.js";
import "./Scene.css";

function getRandomPosition(type) {
  const x = Number((Math.random() * 10 - 5).toFixed(2));
  const z = Number((Math.random() * 8 - 4).toFixed(2));

  const y = type === "sphere" ? 0.6 : 0.5;

  return [x, y, z];
}

function generateObjectId() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;
}

function createSceneObject(type) {
  return {
    id: generateObjectId(),
    type,
    position: getRandomPosition(type),
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    modelUrl: "",
  };
}

function normalizeLoadedObject(object) {
  return {
    id: object.objectId || object.id || generateObjectId(),
    type: object.type,
    position: object.position || [0, object.type === "sphere" ? 0.6 : 0.5, 0],
    rotation: object.rotation || [0, 0, 0],
    scale: object.scale || [1, 1, 1],
    modelUrl: object.modelUrl || "",
  };
}

export default function Scene() {
  const navigate = useNavigate();

  const [objects, setObjects] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLoadingScene, setIsLoadingScene] = useState(true);
  const [isSavingScene, setIsSavingScene] = useState(false);
  const [sceneMessage, setSceneMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchSavedScene = async () => {
      try {
        const response = await loadScene();

        if (!isMounted) {
          return;
        }

        const loadedObjects = response.data.objects || [];
        setObjects(loadedObjects.map(normalizeLoadedObject));
        setSceneMessage("Scene loaded");
      } catch (error) {
        if (error.response?.status === 401) {
          alert("Please login first.");
          navigate("/login");
          return;
        }

        setSceneMessage("Could not load saved scene");
        console.error("Failed to load scene:", error);
      } finally {
        if (isMounted) {
          setIsLoadingScene(false);
        }
      }
    };

    fetchSavedScene();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const handleAddObject = (type) => {
    const newObject = createSceneObject(type);

    setObjects((previousObjects) => [...previousObjects, newObject]);
    setSceneMessage(`${type} added`);
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

  const handleSave = async () => {
    try {
      setIsSavingScene(true);
      setSceneMessage("Saving scene...");

      console.log("Scene objects to save:", objects);

      await saveScene(objects);

      setSceneMessage("Scene saved successfully");
      alert("Scene saved successfully");
    } catch (error) {
      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      setSceneMessage("Failed to save scene");
      console.error("Failed to save scene:", error);
      alert(error.response?.data?.message || "Failed to save scene");
    } finally {
      setIsSavingScene(false);
    }
  };

  return (
    <div className="scene-page">
      <SceneCanvas objects={objects} onObjectMove={handleObjectMove} />

      <div className="scene-toolbar">
        <button
          className="scene-button"
          onClick={handleSave}
          disabled={isSavingScene || isLoadingScene}
        >
          {isSavingScene ? "Saving..." : "Save"}
        </button>

        <div className="scene-object-count">
          {isLoadingScene ? "Loading scene..." : `Objects: ${objects.length}`}
        </div>

        <button
          className="scene-button"
          onClick={() => setIsAddDialogOpen(true)}
          disabled={isLoadingScene}
        >
          Add Objects
        </button>
      </div>

      {sceneMessage && <div className="scene-message">{sceneMessage}</div>}

      <AddObjectDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddObject}
      />
    </div>
  );
}