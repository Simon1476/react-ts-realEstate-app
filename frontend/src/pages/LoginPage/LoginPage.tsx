import { Link, useNavigate } from "react-router-dom";
import "./loginPage.scss";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";
import axios from "axios";

const LoginPage = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);

    try {
      const username = formData.get("username");
      const password = formData.get("password");

      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="loginPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="username"
            type="text"
            required
            minLength={3}
            maxLength={20}
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">Don't you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg3.png" alt="" />
      </div>
    </div>
  );
};

export default LoginPage;
