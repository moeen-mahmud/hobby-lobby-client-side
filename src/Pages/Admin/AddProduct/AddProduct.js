import {
  Button,
  Container,
  Grid,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";

const AddProduct = () => {
  const [product, setProduct] = useState({});
  const [ratingValue, setRatingValue] = useState(0);

  const history = useHistory();

  const handleProductInfo = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    const newProductInfo = { ...product };
    newProductInfo[field] = value;
    setProduct(newProductInfo);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/products", {
        productName: product.productName,
        productImage: product.productImage,
        productShorDesc: product.productShorDesc,
        productLongDesc: product.productLongDesc,
        productPrice: product.productPrice,
        productRating: ratingValue,
      })
      .then((res) => {
        if (res.data.insertedId) {
          window.alert("Product added successfully!");
          history.push("/explore");
        }
      });
  };

  return (
    <Container>
      <Box>
        <Grid container columns={{ xs: 1, md: 12 }}>
          <Grid item xs={1} md={6}>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 4 }}
            >
              <Typography variant="h4">Add a product</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Product will be added to the database
              </Typography>
            </Box>
            <form onSubmit={handleAddProduct}>
              <Stack direction="column" spacing={3}>
                <TextField
                  variant="outlined"
                  name="productName"
                  label="Product Name"
                  required
                  onBlur={handleProductInfo}
                />
                <TextField
                  variant="outlined"
                  name="productImage"
                  label="Product Image"
                  required
                  onBlur={handleProductInfo}
                />
                <TextField
                  variant="outlined"
                  name="productShorDesc"
                  label="Product Short Description"
                  required
                  onBlur={handleProductInfo}
                />
                <TextField
                  variant="outlined"
                  name="productLongDesc"
                  label="Product Long Description"
                  required
                  onBlur={handleProductInfo}
                />
                <TextField
                  variant="outlined"
                  name="productPrice"
                  label="Product Price"
                  required
                  onBlur={handleProductInfo}
                />
                <Stack direction="column" spacing={1}>
                  <Typography variant="subtitle1" component="legend">
                    Product Rating
                  </Typography>
                  <Rating
                    name="simple-controlled"
                    precision={0.1}
                    value={ratingValue}
                    onChange={(event, newValue) => {
                      setRatingValue(newValue);
                    }}
                  />
                </Stack>
              </Stack>
              <Button
                sx={{ mt: 3, minWidth: "200px" }}
                type="submit"
                variant="contained"
                color="secondary"
              >
                Add
              </Button>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AddProduct;
