import { Alert, Container, Grid, Snackbar } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleOrder from "../../../components/SingleOrder/SingleOrder";
import useAuth from "../../../hooks/useAuth";

const UserOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  const [openSnackBar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/orders?email=${user.email}`)
      .then((res) => {
        setOrders(res.data);
      });
  }, [user.email]);

  const handleDelete = (id) => {
    const confirmation = window.confirm("Want to cancel this item?");
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
        <Grid container columns={{ xs: 1, md: 12 }} spacing={{ xs: 4, md: 6 }}>
          {orders.map((order) => (
            <SingleOrder
              key={order._id}
              order={order}
              handleDelete={handleDelete}
            ></SingleOrder>
          ))}
        </Grid>
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
          Order has been deleted!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserOrders;
