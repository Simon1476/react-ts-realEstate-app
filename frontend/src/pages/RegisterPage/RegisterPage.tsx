import { Link, useNavigate } from "react-router-dom";
import "./registerPage.scss";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";
import axios from "axios";

const RegisterPage = () => {
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
      const email = formData.get("email");
      const password = formData.get("password");

      const res = await apiRequest.post("auth/register", {
        username,
        email,
        password,
      });

      navigate("/login");
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message);
      }
    } finally {
      setIsLoading(true);
    }
  };
  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input type="text" placeholder="Username" name="username" />
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}
          <Link to="login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg3.png" alt="Background image" />
      </div>
    </div>
  );
};

export default RegisterPage;
