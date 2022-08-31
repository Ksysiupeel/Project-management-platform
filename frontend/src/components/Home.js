import Login from "./modals/Login";
import Register from "./modals/Register";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem("access_token")) {
      navigate("/projects");
    }
  }, []);

  return (
    <div className="home-page">
      <Login /> <br /> <br />
      <Register />
    </div>
  );
};

export default HomePage;
