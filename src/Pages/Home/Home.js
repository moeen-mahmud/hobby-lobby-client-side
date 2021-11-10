import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import bgBanner from "../../assets/bg-banner-main.png";
import Navbar from "../../components/Navbar/Navbar";

// const bgStyle = {};

const Home = () => {
  return (
    <Box>
      <Navbar></Navbar>
      <Typography variant="h3">This is home</Typography>
    </Box>
  );
};

export default Home;
