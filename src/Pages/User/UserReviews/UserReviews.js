import {
  Alert,
  Button,
  Container,
  Grid,
  Rating,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";

const UserReviews = () => {
  const { user } = useAuth();
  const [ratingValue, setRatingValue] = useState(0);
  const [description, setDescription] = useState("");

  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleUserInfo = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/reviews", {
        name: user.displayName,
        image: "",
        description: description,
        rating: ratingValue,
      })
      .then((res) => {
        if (res.data.insertedId) {
          setRatingValue(0);
          setOpenSnackBar(true);
          window.location.reload();
        }
      });
  };

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  return (
    <Container>
      <Typography sx={{ mb: 3 }} variant="h4">
        Write a review for us!
      </Typography>
      <Grid container>
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmitReview}>
            <Stack direction="column" spacing={3}>
              <TextField
                type="text"
                defaultValue={user.displayName}
                variant="outlined"
                label="Name"
                disabled
              />
              <Stack direction="row">
                <Typography component="legend">Your rating:</Typography>
                <Rating
                  name="simple-controlled"
                  precision={0.1}
                  value={ratingValue}
                  onChange={(event, newValue) => {
                    setRatingValue(newValue);
                  }}
                />
              </Stack>
              <TextField
                type="text"
                variant="outlined"
                label="Say Anything"
                name="description"
                multiline
                rows={4}
                defaultValue=""
                required
                onBlur={handleUserInfo}
              />
            </Stack>
            <Box sx={{ mt: 3 }}>
              <Button type="submit" variant="contained" color="secondary">
                Submit
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
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
          Thanks for your kind review!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserReviews;
