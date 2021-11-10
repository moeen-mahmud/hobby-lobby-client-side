import React from "react";

import { Box } from "@mui/system";

import Navbar from "../../components/Navbar/Navbar";
import Banner from "../../components/Banner/Banner";
import ProductContainer from "../../components/ProductContainer/ProductContainer";

const Home = () => {
  return (
    <Box>
      <Navbar></Navbar>
      <Banner></Banner>
      <ProductContainer></ProductContainer>
    </Box>
  );
};

export default Home;
