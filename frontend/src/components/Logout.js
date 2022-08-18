import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.length > 1) {
      window.localStorage.clear();
    }
    navigate("/");
  });
};

export default Logout;
