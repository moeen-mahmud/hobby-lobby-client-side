import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Masonry from "react-masonry-css";
import Product from "../../components/Product/Product";

const breakpoints = {
  default: 3,
  1100: 2,
  700: 1,
};

const Explore = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/products").then((res) => {
      console.log(res.data);
      setProducts(res.data);
    });
  }, []);
  return (
    <Box>
      <Navbar></Navbar>
      <Container sx={{ mt: 5 }}>
        <Typography
          sx={{ textAlign: "center", fontWeight: 700 }}
          variant="h3"
          component="h1"
        >
          Explore more from us!
        </Typography>
        <Typography
          variant="h6"
          component="p"
          sx={{ mt: 2, color: "secondary.main", textAlign: "center" }}
        >
          We offer the best budget friendly gaming chairs
        </Typography>
        <Box sx={{ mt: 8 }}>
          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </Masonry>
        </Box>
      </Container>
    </Box>
  );
};

export default Explore;
