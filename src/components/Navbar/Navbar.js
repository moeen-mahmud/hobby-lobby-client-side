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
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const history = useHistory();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0}>
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
          {/* Will add a logout confirmation later */}
          {user?.email ? (
            <>
              <Button
                onClick={() => history.push("/dashboard")}
                color="inherit"
              >
                Dashboard
              </Button>
              <Button onClick={logOut} color="inherit">
                Logout
              </Button>
            </>
          ) : (
            <Button onClick={() => history.push("/login")} color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
