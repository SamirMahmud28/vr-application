import { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  const testBackend = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/test"
      );

      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage("Connection failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Techdojo VR Application</h1>

      <button onClick={testBackend}>
        Test Backend
      </button>

      <p>{message}</p>
    </div>
  );
}

export default App;