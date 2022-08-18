import { useState, useEffect } from "react";

const Navbar = () => {
  const [islogged, SetIsLogged] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (window.localStorage.length > 1) {
        SetIsLogged(true);
      }
    }, "0.1 second");
  });

  return (
    <nav className="navbar">
      <h1>Management system</h1>
      <div className="links">
        {islogged ? (
          <a
            href="/projects"
            style={{
              color: "white",
              backgroundColor: "#2AABEE",
              borderRadius: "8px",
            }}
          >
            Projects
          </a>
        ) : (
          <a
            href="/"
            style={{
              color: "white",
              backgroundColor: "#2AABEE",
              borderRadius: "8px",
            }}
          >
            Home
          </a>
        )}
        {islogged ? (
          <a
            href="/logout"
            style={{
              color: "white",
              backgroundColor: "green",
              borderRadius: "8px",
            }}
          >
            Logout
          </a>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
