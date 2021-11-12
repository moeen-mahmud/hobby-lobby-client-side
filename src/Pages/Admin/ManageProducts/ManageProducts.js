import {
  Alert,
  Container,
  IconButton,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    axios
      .get("https://morning-scrubland-84603.herokuapp.com/products")
      .then((res) => {
        setProducts(res.data);
      });
  }, []);

  const handleDeleteProduct = (id) => {
    const confirmation = window.confirm("Want to delete this product?");
    if (confirmation) {
      axios
        .delete(`https://morning-scrubland-84603.herokuapp.com/products/${id}`)
        .then((res) => {
          if (res.data.deletedCount > 0) {
            const newProducts = products.filter(
              (product) => product._id !== id
            );
            setProducts(newProducts);
            setOpenSnackBar(true);
          }
        });
    }
  };

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  return (
    <Container>
      <Box>
        <Typography variant="h4" mb={3}>
          Manage all products
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product Image</TableCell>
                <TableCell align="left">Product Name</TableCell>
                <TableCell align="left">Product Description</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Rating</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow
                  key={product._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img
                      style={{ width: "30%" }}
                      src={product.productImage}
                      alt={product.productName}
                    />
                  </TableCell>
                  <TableCell align="left">{product.productName}</TableCell>
                  <TableCell align="left">{product.productShorDesc}</TableCell>
                  <TableCell align="left">{product.productPrice}</TableCell>
                  <TableCell align="left">{product.productRating}</TableCell>
                  <TableCell align="left">
                    <Tooltip title="Delete the product">
                      <IconButton
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        <DeleteIcon sx={{ color: "accent.main" }} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Product has been deleted successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ManageProducts;
