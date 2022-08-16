import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosApi";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    axiosInstance
      .post("/token/obtain/", {
        email: email,
        password: password,
      })
      .then((res) => {
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + res.data.access;
        window.localStorage.setItem("access_token", res.data.access);
        window.localStorage.setItem("refresh_token", res.data.refresh);
        navigate("/projects");
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <div className="signin-form">
      <form>
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="email"
          variant="outlined"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />

        <br />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="password"
          label="password"
          variant="outlined"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />

        <br />
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Sign in
        </Button>
      </form>
    </div>
  );
};

export default Login;
