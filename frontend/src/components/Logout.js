import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem("access_token")) {
      window.localStorage.removeItem("access_token");
      window.localStorage.removeItem("refresh_token");
    }
    navigate("/");
  });
};

export default Logout;
