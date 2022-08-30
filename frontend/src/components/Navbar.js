import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();

  const [islogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem("access_token")) {
      setIsLogged(true);
    }
  });

  return (
    <nav className="navbar">
      <h1>Management platform</h1>
      <div className="buttons">
        {islogged ? (
          <button
            size="md"
            onClick={() => {
              window.localStorage.removeItem("access_token");
              window.localStorage.removeItem("refresh_token");
              setIsLogged(false);
              toast.success("Logged out!!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
              });
              navigate("/");
            }}
          >
            Logout
          </button>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
