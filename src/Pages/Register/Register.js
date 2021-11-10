import {
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useHistory } from "react-router-dom";

import holderImage from "../../assets/login-pc.svg";

const Register = () => {
  const history = useHistory();

  return (
    <Container sx={{ mt: 10 }}>
      <Box>
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: 4, color: "secondary.main", fontWeight: 700 }}
        >
          Create an account
        </Typography>
        <Grid container columns={{ xs: 1, md: 12 }} spacing={{ xs: 4, md: 6 }}>
          <Grid item xs={1} md={5}>
            <form>
              <Stack direction="column" spacing={3}>
                <TextField
                  type="text"
                  label="Name"
                  variant="outlined"
                  name="name"
                />
                <TextField
                  type="text"
                  label="Email"
                  variant="outlined"
                  name="email"
                />
                <TextField
                  type="text"
                  label="Password"
                  variant="outlined"
                  name="password"
                />
                <TextField
                  type="text"
                  label="Repeat Password"
                  variant="outlined"
                  name="passwordConfirm"
                />
              </Stack>
              <Button
                sx={{ mt: 3, width: "50%" }}
                variant="contained"
                color="secondary"
              >
                Sign Up
              </Button>
            </form>
            <Box sx={{ mt: 1 }}>
              <Typography variant="body1">
                Already registered?
                <Typography variant="body1" component="span">
                  <Button
                    onClick={() => history.push("/login")}
                    variant="text"
                    color="secondary"
                  >
                    Log In
                  </Button>
                </Typography>
              </Typography>
            </Box>
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

export default Register;
