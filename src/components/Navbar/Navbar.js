// From React
import React from "react";

// From Material UI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

// Material Icons
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

// React router
import { useHistory } from "react-router";
import useAuth from "../../hooks/useAuth";
import {
  Alert,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@emotion/react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fefeff",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

const drawerWidth = 220;

const Navbar = () => {
  const { user, logOut } = useAuth();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [openModal, setOpenModal] = React.useState(false);

  const history = useHistory();

  const handleLogOut = () => {
    logOut();
    setOpenModal(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Drawer component
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem onClick={() => history.push("/home")}>
          <ListItemIcon>
            <HomeIcon sx={{ color: "secondary.main" }} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem onClick={() => history.push("/explore")}>
          <ListItemIcon>
            <ExploreIcon sx={{ color: "secondary.main" }} />
          </ListItemIcon>
          <ListItemText primary="Explore" />
        </ListItem>
        {user?.email ? (
          <>
            <ListItem onClick={() => history.push("/dashboard")}>
              <ListItemIcon>
                <DashboardIcon sx={{ color: "secondary.main" }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem onClick={() => setOpenModal(true)}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: "secondary.main" }} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <ListItem onClick={() => history.push("/login")}>
            <ListItemIcon>
              <LoginIcon sx={{ color: "secondary.main" }} />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
      <Divider />
    </div>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          {isMobile && (
            <IconButton
              onClick={handleDrawerToggle}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            onClick={() => history.push("/")}
            style={{
              fontFamily: "'Comfortaa', cursive",
              cursor: "pointer",
            }}
            variant="h5"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Hobby{" "}
            <Typography
              sx={{ color: "secondary.main" }}
              variant="h5"
              component="span"
            >
              Lobby
            </Typography>
          </Typography>
          {/* Will Add icon  */}
          {!isMobile && (
            <>
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
                  <Button onClick={() => setOpenModal(true)} color="inherit">
                    Logout
                  </Button>
                </>
              ) : (
                <Button onClick={() => history.push("/login")} color="inherit">
                  Login
                </Button>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
      {isMobile && (
        <>
          <Drawer
            // container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </>
      )}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <Alert sx={{ mb: 2 }} severity="warning">
              Want to log out?
            </Alert>
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button
                onClick={() => setOpenModal(false)}
                variant="contained"
                color="secondary"
              >
                Nope
              </Button>
              <Button onClick={handleLogOut} variant="outlined" color="warning">
                Yes
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Navbar;
