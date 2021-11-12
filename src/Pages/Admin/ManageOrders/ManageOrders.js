import {
  Alert,
  Container,
  IconButton,
  Snackbar,
  Stack,
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

// Icons
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import DeleteIcon from "@mui/icons-material/Delete";

import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  // Snackbar
  const [openSnackBar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    axios
      .get("https://morning-scrubland-84603.herokuapp.com/orders")
      .then((res) => {
        setOrders(res.data);
      });
  }, []);

  const handleDeleteOrder = (id) => {
    const confirmation = window.confirm("Want to delete this order?");
    if (confirmation) {
      axios
        .delete(`https://morning-scrubland-84603.herokuapp.com/orders/${id}`)
        .then((res) => {
          if (res.data.deletedCount > 0) {
            const newOrders = orders.filter((order) => order._id !== id);
            setOrders(newOrders);
            setOpenSnackBar(true);
          }
        });
    }
  };

  const handleUpdateStatus = (id) => {
    const confirmation = window.confirm("Want to update the order status?");
    if (confirmation) {
      axios
        .put(`https://morning-scrubland-84603.herokuapp.com/orders/${id}`, {
          status: "Shipped",
        })
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            window.alert("Order updated successfully!");
            window.location.reload();
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
        <Typography variant="h4" mb={2}>
          Manage all orders
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Order Item</TableCell>
                <TableCell align="left">Order Status</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {order.name}
                  </TableCell>
                  <TableCell align="left">{order.email}</TableCell>
                  <TableCell align="left">{order.orderItem}</TableCell>
                  <TableCell align="left">
                    {order.status === "Pending" ? (
                      <Typography
                        color="#f57c00"
                        variant="body1"
                        component="span"
                      >
                        {order.status}
                      </Typography>
                    ) : (
                      <Typography
                        color="secondary.main"
                        variant="body1"
                        component="span"
                      >
                        {order.status}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Update Order Status">
                        {order.status === "Pending" ? (
                          <IconButton
                            onClick={() => handleUpdateStatus(order._id)}
                          >
                            <IndeterminateCheckBoxIcon
                              sx={{ color: "#f57c00" }}
                            />
                          </IconButton>
                        ) : (
                          <IconButton>
                            <CheckBoxIcon color="secondary" />
                          </IconButton>
                        )}
                      </Tooltip>
                      <Tooltip title="Delete Order">
                        <IconButton
                          onClick={() => handleDeleteOrder(order._id)}
                        >
                          <DeleteIcon
                            sx={{ color: "accent.main" }}
                            color="red"
                          />
                        </IconButton>
                      </Tooltip>
                    </Stack>
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
          Order has been deleted successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ManageOrders;
