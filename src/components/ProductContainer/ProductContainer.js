import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { useLocation } from "react-router";
import Product from "../Product/Product";

const breakpoints = {
  default: 3,
  1100: 2,
  700: 1,
};

const ProductContainer = () => {
  const [products, setProducts] = useState([]);

  const location = useLocation();

  useEffect(() => {
    axios.get("http://localhost:5000/products").then((res) => {
      console.log(res.data);
      setProducts(res.data);
    });
  }, []);

  return (
    <Container sx={{ my: 15, textAlign: "center" }}>
      <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 8 }}>
        We have some{" "}
        <Typography variant="h3" component="span" color="secondary.main">
          Great Deals!
        </Typography>
      </Typography>
      <Box>
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {products.slice(0, 6).map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </Masonry>
        {location.pathname === "/explore" && (
          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </Masonry>
        )}
      </Box>
    </Container>
  );
};

export default ProductContainer;
