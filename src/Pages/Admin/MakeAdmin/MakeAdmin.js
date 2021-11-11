import {
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const MakeAdmin = () => {
  const [email, setEmail] = useState("");

  const handleMakeAdmin = (e) => {
    e.preventDefault();

    const user = { email };
    axios.put("http://localhost:5000/users", user).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <Container>
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
