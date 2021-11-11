import {
  Alert,
  Button,
  CircularProgress,
  Container,
  FormHelperText,
  Grid,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import holderImage from "../../assets/login-pc.svg";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { authError, logInUser, isLoading } = useAuth();
  const [loginData, setLoginData] = useState({});

  // Snackbar
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [errorSnackBar, setErrorSnackBar] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const handleUserInput = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    logInUser(loginData.email, loginData.password, location, history);

    if (authError === "") {
      setErrorSnackBar(true);
    } else {
      setOpenSnackBar(true);
    }
  };

  return (
    <Container sx={{ mt: 10 }}>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackBar(false)}
      >
        <Alert
          onClose={() => setOpenSnackBar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Login successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorSnackBar}
        autoHideDuration={6000}
        onClose={() => setErrorSnackBar(false)}
      >
        <Alert
          onClose={() => setErrorSnackBar(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Login error!
        </Alert>
      </Snackbar>
      <Box>
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: 4, color: "secondary.main", fontWeight: 700 }}
        >
          Log In
        </Typography>
        <Grid container columns={{ xs: 1, md: 12 }} spacing={{ xs: 4, md: 6 }}>
          <Grid item xs={1} md={5}>
            {isLoading ? (
              <CircularProgress
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "20%",
                  color: "#4caf50",
                }}
              />
            ) : (
              <>
                <form onSubmit={handleSubmit}>
                  <Stack direction="column" spacing={3}>
                    <TextField
                      type="email"
                      label="Email"
                      variant="outlined"
                      name="email"
                      required
                      onBlur={handleUserInput}
                    />
                    <TextField
                      type="password"
                      label="Password"
                      variant="outlined"
                      name="password"
                      required
                      onBlur={handleUserInput}
                    />
                  </Stack>
                  {authError && (
                    <FormHelperText sx={{ color: "red" }}>
                      {authError}
                    </FormHelperText>
                  )}
                  <Button
                    type="submit"
                    sx={{ mt: 3, width: "50%" }}
                    variant="contained"
                    color="secondary"
                  >
                    Sign In
                  </Button>
                </form>
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body1">
                    Don't have an account?
                    <Typography variant="body1" component="span">
                      <Button
                        onClick={() => history.push("/register")}
                        variant="text"
                        color="secondary"
                      >
                        Join Us
                      </Button>
                    </Typography>
                  </Typography>
                </Box>
                <Button
                  onClick={() => history.push("/")}
                  type="submit"
                  sx={{ mt: 1, width: "50%" }}
                  variant="outlined"
                  color="secondary"
                >
                  Back to home
                </Button>
              </>
            )}
          </Grid>
          <Grid item xs={1} md={6}>
            <img
              style={{ width: "60%", display: "block", margin: "0 auto" }}
              src={holderImage}
              alt="Login PC"
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
