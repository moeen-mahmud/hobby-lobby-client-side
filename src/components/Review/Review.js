import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";

const Review = ({ review }) => {
  return (
    <Grid item xs={1} md={4}>
      <Card>
        {review.image ? (
          <CardHeader
            avatar={<Avatar src={review.image} />}
            title={review.name}
            subheader={
              <Rating value={review.rating} readOnly precision={0.1} />
            }
          />
        ) : (
          <CardHeader
            avatar={<Avatar>{review?.name.slice(0, 1)}</Avatar>}
            title={review.name}
            subheader={
              <Rating value={review.rating} readOnly precision={0.1} />
            }
          />
        )}
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            {review.description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Review;
