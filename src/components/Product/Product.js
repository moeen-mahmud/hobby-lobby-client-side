import { Button, Paper, Rating, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useLocation } from "react-router";

const Product = ({ product }) => {
  const location = useLocation();

  const {
    productName,
    productImage,
    productShorDesc,
    productLongDesc,
    productPrice,
    productRating,
  } = product;
  return (
    <Paper
      sx={{ p: 3, border: "2px solid #4caf50", borderRadius: "5px" }}
      elevation={0}
    >
      <img
        style={{ width: "80%", marginBottom: "2rem" }}
        src={productImage}
        alt={productName}
      />
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="body1">Rating:</Typography>
        <Rating precision={0.1} value={productRating} readOnly />
      </Stack>
      <Box sx={{ textAlign: "left", mb: 3 }}>
        <Typography sx={{ mt: 2 }} variant="h6" component="h3">
          {productName}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {productShorDesc}
        </Typography>
      </Box>
      {location.pathname === "/explore" && (
        <Box sx={{ mb: 2, textAlign: "left" }}>
          <Typography variant="body2" color="text.secondary">
            <Typography
              sx={{ fontWeight: 700 }}
              variant="body1"
              component="span"
            >
              Description:
            </Typography>{" "}
            {productLongDesc}
          </Typography>
          <Typography variant="h6">Price: ${productPrice}</Typography>
        </Box>
      )}
      <Stack>
        <Button variant="contained" color="secondary">
          Order Now
        </Button>
      </Stack>
    </Paper>
  );
};

export default Product;
