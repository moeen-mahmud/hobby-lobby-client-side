import { Avatar, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import useAuth from "../../hooks/useAuth";

const DashboardHome = () => {
  const { user } = useAuth();
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Avatar>{user.displayName?.slice(0, 1)}</Avatar>
        <Typography variant="h4">
          Welcome{" "}
          <Typography
            sx={{ color: "secondary.main" }}
            variant="h4"
            component="span"
          >
            {user.displayName}
          </Typography>
        </Typography>
      </Box>
    </Container>
  );
};

export default DashboardHome;
