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
    axios.get("http://localhost:5000/orders").then((res) => {
      setOrders(res.data);
    });
  }, []);

  const handleDeleteOrder = (id) => {
    const confirmation = window.confirm("Want to delete this order?");
    if (confirmation) {
      axios.delete(`http://localhost:5000/orders/${id}`).then((res) => {
        if (res.data.deletedCount > 0) {
          const newOrders = orders.filter((order) => order._id !== id);
          setOrders(newOrders);
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
                        <IconButton>
                          {order.status === "Pending" ? (
                            <IndeterminateCheckBoxIcon
                              sx={{ color: "#f57c00" }}
                            />
                          ) : (
                            <CheckBoxIcon color="secondary" />
                          )}
                        </IconButton>
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
