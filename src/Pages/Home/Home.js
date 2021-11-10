import React from "react";

import { Box } from "@mui/system";

import Navbar from "../../components/Navbar/Navbar";
import Banner from "../../components/Banner/Banner";

const Home = () => {
  return (
    <Box>
      <Navbar></Navbar>
      <Banner></Banner>
    </Box>
  );
};

export default Home;
