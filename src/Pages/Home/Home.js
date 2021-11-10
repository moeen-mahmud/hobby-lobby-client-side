import React from "react";

import { Box } from "@mui/system";

import Navbar from "../../components/Navbar/Navbar";
import Banner from "../../components/Banner/Banner";
import ProductContainer from "../../components/ProductContainer/ProductContainer";
import ReviewContainer from "../../components/ReviewContainer/ReviewContainer";

const Home = () => {
  return (
    <Box>
      <Navbar></Navbar>
      <Banner></Banner>
      <ProductContainer></ProductContainer>
      <ReviewContainer></ReviewContainer>
    </Box>
  );
};

export default Home;
