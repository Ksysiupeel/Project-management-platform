import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [islogin, setIslogin] = useState(false);

  useEffect(() => {
    if (window.localStorage.length > 0) {
      setIslogin(true);
    }
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Management system
          </Typography>
          {!islogin && (
            <div>
              <Button color="inherit" href="/signin">
                Sign in
              </Button>
              <Button color="inherit" href="/signup">
                Sign up
              </Button>
            </div>
          )}
          <Button color="inherit" href="/projects">
            Projects
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
