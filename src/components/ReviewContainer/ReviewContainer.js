import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Review from "../Review/Review";

const ReviewContainer = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("https://morning-scrubland-84603.herokuapp.com/reviews")
      .then((res) => {
        console.log(res.data);
        setReviews(res.data);
      });
  }, []);

  return (
    <Container sx={{ mb: 15 }}>
      <Typography
        variant="h4"
        component="h3"
        sx={{ textAlign: "center", fontWeight: 700, mb: 10 }}
      >
        Our Satisfied Customers Say...
      </Typography>
      <Box>
        <Grid container columns={{ xs: 1, md: 12 }} spacing={{ xs: 1, md: 6 }}>
          {reviews.map((review) => (
            <Review key={review._id} review={review}></Review>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ReviewContainer;
