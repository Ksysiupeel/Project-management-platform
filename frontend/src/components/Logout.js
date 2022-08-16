import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.length > 0) {
      window.localStorage.clear();
    }
    navigate("/signin");
  });
};

export default Logout;
