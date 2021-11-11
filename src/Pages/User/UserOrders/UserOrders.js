import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleOrder from "../../../components/SingleOrder/SingleOrder";
import useAuth from "../../../hooks/useAuth";

const UserOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/orders?email=${user.email}`)
      .then((res) => {
        setOrders(res.data);
      });
  }, [user.email]);

  return (
    <Container>
      <Box>
        <Grid container columns={{ xs: 1, md: 12 }} spacing={{ xs: 4, md: 6 }}>
          {orders.map((order) => (
            <SingleOrder key={order._id} order={order}></SingleOrder>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default UserOrders;
