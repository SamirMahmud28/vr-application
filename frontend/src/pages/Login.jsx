import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await login(form);
      alert("Login successful");
      navigate("/scene");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} />

      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}