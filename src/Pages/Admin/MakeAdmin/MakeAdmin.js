import {
  Alert,
  Button,
  Container,
  Grid,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const MakeAdmin = () => {
  const [email, setEmail] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleMakeAdmin = (e) => {
    e.preventDefault();

    const user = { email };
    axios.put("http://localhost:5000/users", user).then((res) => {
      if (res.data.modifiedCount > 0) {
        handleOpenSnackBar();
      }
    });
  };

  const handleOpenSnackBar = () => {
    setOpenSnackBar(true);
  };

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  return (
    <Container>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Admin created successfully
        </Alert>
      </Snackbar>
      <Grid container columns={{ xs: 1, md: 12 }}>
        <Grid item xs={12} md={5}>
          <Typography sx={{ mb: 3 }} variant="h4">
            Make an admin
          </Typography>
          <form onSubmit={handleMakeAdmin}>
            <Stack direction="column" spacing={3}>
              <TextField
                variant="outlined"
                type="email"
                name="email"
                label="Email"
                fullWidth
                required
                onBlur={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" variant="contained" color="secondary">
                Make Admin
              </Button>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MakeAdmin;
