import { useTheme } from "@emotion/react";
import { Container, Typography, useMediaQuery } from "@mui/material";
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
  const homeLocation = location.pathname === "/" || "home";

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    axios
      .get("https://morning-scrubland-84603.herokuapp.com/products")
      .then((res) => {
        setProducts(res.data);
      });
  }, []);

  return (
    <Container sx={{ my: 15, textAlign: "center" }}>
      {isMobile ? (
        <>
          {location.pathname === "/" && (
            <Typography
              variant="h5"
              component="h2"
              sx={{ fontWeight: 700, mb: 8 }}
            >
              We have some{" "}
              <Typography variant="h3" component="span" color="secondary.main">
                Great Deals!
              </Typography>
            </Typography>
          )}
        </>
      ) : (
        <>
          {location.pathname === "/" && (
            <Typography
              variant="h3"
              component="h2"
              sx={{ fontWeight: 700, mb: 8 }}
            >
              We have some{" "}
              <Typography variant="h3" component="span" color="secondary.main">
                Great Deals!
              </Typography>
            </Typography>
          )}
        </>
      )}

      <Box>
        {homeLocation && (
          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {products.slice(0, 6).map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </Masonry>
        )}
      </Box>
    </Container>
  );
};

export default ProductContainer;
