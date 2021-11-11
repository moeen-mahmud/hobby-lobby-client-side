import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import PaymentIcon from "@mui/icons-material/Payment";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import RateReviewIcon from "@mui/icons-material/RateReview";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";

// React Router
import { useHistory, useRouteMatch, Switch, Route } from "react-router";

// User pages
import UserOrders from "../User/UserOrders/UserOrders";
import Pay from "../User/Pay/Pay";
import UserReviews from "../User/UserReviews/UserReviews";
import DashboardHome from "../DashboardHome/DashboardHome";
import ManageOrders from "../Admin/ManageOrders/ManageOrders";
import AddProduct from "../Admin/AddProduct/AddProduct";
import MakeAdmin from "../Admin/MakeAdmin/MakeAdmin";
import ManageProducts from "../Admin/ManageProducts/ManageProducts";
import AdminRoute from "../Admin/AdminRoute/AdminRoute";
import useAuth from "../../hooks/useAuth";

const drawerWidth = 230;

function Dashboard(props) {
  const { admin } = useAuth();
  // React Router
  const history = useHistory();
  let { path, url } = useRouteMatch();

  // Responsivness
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Button
        onClick={() => history.push("/")}
        sx={{ mt: -11, ml: 2 }}
        variant="outlined"
        startIcon={<HomeIcon />}
        color="secondary"
      >
        Back to home
      </Button>
      <List>
        {/* Will add a active class like nanote later */}
        <ListItem onClick={() => history.push(`${url}`)} button>
          <ListItemIcon>
            <DashboardIcon style={{ color: "#4caf50" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        {admin ? (
          <>
            <ListItem
              onClick={() => history.push(`${url}/manage-orders`)}
              button
            >
              <ListItemIcon>
                <BuildCircleIcon style={{ color: "#4caf50" }} />
              </ListItemIcon>
              <ListItemText primary="Manage Orders" />
            </ListItem>
            <ListItem onClick={() => history.push(`${url}/add-product`)} button>
              <ListItemIcon>
                <AddCircleIcon style={{ color: "#4caf50" }} />
              </ListItemIcon>
              <ListItemText primary="Add Product" />
            </ListItem>
            <ListItem onClick={() => history.push(`${url}/make-admin`)} button>
              <ListItemIcon>
                <AdminPanelSettingsIcon style={{ color: "#4caf50" }} />
              </ListItemIcon>
              <ListItemText primary="Make Admin" />
            </ListItem>
            <ListItem
              onClick={() => history.push(`${url}/manage-products`)}
              button
            >
              <ListItemIcon>
                <StoreMallDirectoryIcon style={{ color: "#4caf50" }} />
              </ListItemIcon>
              <ListItemText primary="Manage Product" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem onClick={() => history.push(`${url}/user-orders`)} button>
              <ListItemIcon>
                <ShoppingBasketIcon style={{ color: "#4caf50" }} />
              </ListItemIcon>
              <ListItemText primary="My Orders" />
            </ListItem>
            <ListItem onClick={() => history.push(`${url}/pay`)} button>
              <ListItemIcon>
                <PaymentIcon style={{ color: "#4caf50" }} />
              </ListItemIcon>
              <ListItemText primary="Pay" />
            </ListItem>
            <ListItem onClick={() => history.push(`${url}/review`)} button>
              <ListItemIcon>
                <RateReviewIcon style={{ color: "#4caf50" }} />
              </ListItemIcon>
              <ListItemText primary="Review" />
            </ListItem>
          </>
        )}
        <ListItem button>
          <ListItemIcon>
            <LogoutIcon style={{ color: "#4caf50" }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
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
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Switch>
          <Route exact path={path}>
            <DashboardHome></DashboardHome>
          </Route>
          <Route path={`${path}/user-orders`}>
            <UserOrders></UserOrders>
          </Route>
          <Route path={`${path}/pay`}>
            <Pay></Pay>
          </Route>
          <Route path={`${path}/review`}>
            <UserReviews></UserReviews>
          </Route>
          <AdminRoute path={`${path}/manage-orders`}>
            <ManageOrders></ManageOrders>
          </AdminRoute>
          <AdminRoute path={`${path}/add-product`}>
            <AddProduct></AddProduct>
          </AdminRoute>
          <AdminRoute path={`${path}/make-admin`}>
            <MakeAdmin></MakeAdmin>
          </AdminRoute>
          <AdminRoute path={`${path}/manage-products`}>
            <ManageProducts></ManageProducts>
          </AdminRoute>
        </Switch>
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;
