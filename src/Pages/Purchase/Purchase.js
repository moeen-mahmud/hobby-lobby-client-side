import {
  Alert,
  Backdrop,
  Button,
  Container,
  Fade,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import useAuth from "../../hooks/useAuth";

import { FcBinoculars } from "react-icons/fc";
import { FcRating } from "react-icons/fc";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fefeff",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

const Purchase = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState({});

  const [order, setOrder] = useState({});
  const [openCancelModal, setOpenCancelModal] = useState(false);

  const history = useHistory();

  useEffect(() => {
    axios
      .get(`https://morning-scrubland-84603.herokuapp.com/products/${id}`)
      .then((res) => {
        console.log(res.data);
        setOrder(res.data);
      });
  }, [id]);

  const handleUserInfo = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    const newUserInfo = { ...userInfo };
    newUserInfo[field] = value;
    setUserInfo(newUserInfo);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    axios
      .post("https://morning-scrubland-84603.herokuapp.com/orders", {
        name: user.displayName,
        email: user.email,
        address: userInfo.address,
        phone: userInfo.phone,
        orderItem: order.productName,
        orderImage: order.productImage,
        orderPrice: order.productPrice,
        status: "Pending",
      })
      .then((res) => {
        if (res.data.insertedId) {
          history.push("/dashboard/user-orders");
        }
      });
  };

  const handleCloseCancelModal = () => {
    setOpenCancelModal(false);
  };

  return (
    <Container>
      <Button
        onClick={() => history.push("/explore")}
        sx={{ mt: 1 }}
        variant="outlined"
        startIcon={<FcBinoculars />}
      >
        Back to explore
      </Button>
      <Typography
        sx={{ mt: 3, textAlign: "center" }}
        variant="h4"
        component="h3"
      >
        Get your order ready 🔥
      </Typography>
      <Box sx={{ mt: 8 }}>
        <Grid container columns={{ xs: 1, md: 12 }} spacing={{ xs: 3, md: 8 }}>
          <Grid item xs={1} md={4}>
            <form onSubmit={handlePlaceOrder}>
              <Stack direction="column" spacing={3}>
                <TextField
                  type="text"
                  defaultValue={user.displayName}
                  variant="outlined"
                  label="Name"
                  disabled
                />
                <TextField
                  type="email"
                  defaultValue={user.email}
                  variant="outlined"
                  label="Email"
                  disabled
                />
                <TextField
                  type="text"
                  variant="outlined"
                  label="Address"
                  name="address"
                  defaultValue={userInfo.address || ""}
                  multiline
                  rows={4}
                  required
                  onBlur={handleUserInfo}
                />
                <TextField
                  type="number"
                  variant="outlined"
                  label="Phone"
                  name="phone"
                  defaultValue={userInfo.phone || ""}
                  required
                  onBlur={handleUserInfo}
                />
              </Stack>
              <Box sx={{ mt: 3 }}>
                <Stack direction="row" spacing={3}>
                  <Button type="submit" variant="contained" color="secondary">
                    Place Order
                  </Button>
                  <Button
                    onClick={() => setOpenCancelModal(true)}
                    variant="outlined"
                    color="error"
                  >
                    Cancel Order
                  </Button>
                </Stack>
              </Box>
            </form>
          </Grid>
          <Grid item xs={1} md={8}>
            <Box>
              <Grid
                container
                columns={{ xs: 1, md: 12 }}
                spacing={{ xs: 2, md: 2 }}
              >
                <Grid item xs={1} md={4}>
                  <img
                    style={{
                      width: "80%",
                      display: "block",
                      margin: "2rem auto",
                    }}
                    src={order.productImage}
                    alt={order.productName}
                  />
                </Grid>
                <Grid item xs={1} md={8}>
                  <Typography variant="h4" component="h5">
                    {order.productName}
                  </Typography>
                  <Typography
                    sx={{ color: "secondary.main", mt: 3 }}
                    variant="h6"
                  >
                    About
                  </Typography>
                  <Typography
                    sx={{ color: "text.secondary" }}
                    variant="body1"
                    component="p"
                  >
                    {order.productLongDesc}
                  </Typography>
                  <Box
                    sx={{
                      mt: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <Typography variant="h6" component="span">
                      Price: ${order.productPrice}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <FcRating />
                      <Typography variant="body1" component="span">
                        {order.productRating}/5{" "}
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openCancelModal}
        onClose={handleCloseCancelModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openCancelModal}>
          <Box sx={style}>
            <Alert sx={{ mb: 2 }} severity="warning">
              Want to cancel the order?
            </Alert>
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button
                onClick={handleCloseCancelModal}
                variant="contained"
                color="secondary"
              >
                Nope
              </Button>
              <Button
                onClick={() => history.push("/")}
                variant="outlined"
                color="warning"
              >
                Yes
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default Purchase;
