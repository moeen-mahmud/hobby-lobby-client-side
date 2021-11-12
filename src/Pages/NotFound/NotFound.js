import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useHistory } from "react-router";

const NotFound = () => {
  const history = useHistory();

  return (
    <Container>
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography
          sx={{ fontWeight: 700, color: "secondary.main" }}
          variant="h1"
        >
          404
        </Typography>
        <Typography variant="h4">Page not found</Typography>
        <Typography mt={3} color="text.secondary" variant="subtitle1">
          Let me guess, you did something with the url... 🤔
        </Typography>
        <Button
          onClick={() => history.push("/")}
          sx={{ mt: 2 }}
          variant="outlined"
          color="secondary"
        >
          Take me where I belong
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
