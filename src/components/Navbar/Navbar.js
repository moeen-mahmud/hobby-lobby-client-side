// From React
import React from "react";

// From Material UI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { HiMenu } from "react-icons/hi";
import { useHistory } from "react-router";

const Navbar = () => {
  const history = useHistory();
  return (
    <Box sx={{ flexGrow: 1, mb: 4 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <HiMenu />
          </IconButton>
          <Typography
            onClick={() => history.push("/")}
            style={{
              fontFamily: "'Comfortaa', cursive",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Hobby Lobby
          </Typography>
          {/* Will Add icon  */}
          <Button onClick={() => history.push("/home")} color="inherit">
            Home
          </Button>
          <Button onClick={() => history.push("/explore")} color="inherit">
            Explore
          </Button>
          <Button onClick={() => history.push("/login")} color="inherit">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
