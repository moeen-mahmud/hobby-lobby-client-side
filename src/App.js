import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Explore from "./Pages/Explore/Explore";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Purchase from "./Pages/Purchase/Purchase";
import Register from "./Pages/Register/Register";
import NotFound from "./Pages/NotFound/NotFound";
import { ThemeProvider } from "@emotion/react";
import useCustomTheme from "./hooks/useCustomTheme";

function App() {
  const { theme } = useCustomTheme();
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route path="/explore">
              <Explore></Explore>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/register">
              <Register></Register>
            </Route>
            {/* This is will become a private route */}
            <Route path="/dashboard">
              <Dashboard></Dashboard>
            </Route>
            {/* TODO: This will become a dynamic and private route */}
            <Route path="/purchase">
              <Purchase></Purchase>
            </Route>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
