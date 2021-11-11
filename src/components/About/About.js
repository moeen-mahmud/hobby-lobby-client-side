import { Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";

import AboutImage from "../../assets/about-img.svg";

import { BsFillHandIndexFill } from "react-icons/bs";
import { FaFlag } from "react-icons/fa";
import { FaMountain } from "react-icons/fa";
import { Box } from "@mui/system";

const About = () => {
  return (
    <Container sx={{ mb: 10 }}>
      <Typography
        sx={{ fontWeight: 700, textAlign: "center", mb: 3 }}
        variant="h3"
        component="h3"
      >
        About us
      </Typography>
      <Grid container columns={{ xs: 1, md: 12 }}>
        <Grid item xs={1} md={6}>
          <Box sx={{ mt: 4 }}>
            <Grid
              container
              columns={{ xs: 1, md: 12 }}
              spacing={{ xs: 2, md: 4 }}
            >
              <Grid item xs={1} md={2}>
                <BsFillHandIndexFill
                  style={{
                    marginTop: "1rem",
                    fontSize: "4rem",
                    color: "#4caf50",
                  }}
                />
              </Grid>
              <Grid item xs={1} md={7}>
                <Stack>
                  <Typography variant="h6" component="div">
                    Our Vision
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Our vision is to keep safe the physical issue that face by a
                    gamer or any person who works long hour in sitting. We are
                    care for those individuals and help them realize the
                    importance of a good postures.
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Grid
              container
              columns={{ xs: 1, md: 12 }}
              spacing={{ xs: 2, md: 4 }}
            >
              <Grid item xs={1} md={2}>
                <FaFlag
                  style={{
                    marginTop: "1rem",
                    fontSize: "4rem",
                    color: "#4caf50",
                  }}
                />
              </Grid>
              <Grid item xs={1} md={7}>
                <Stack>
                  <Typography variant="h6" component="div">
                    Our Mission
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    We have to earn the trust and respect of our customers
                    everyday in order to ensure that the customer makes the
                    decision to choose our products and services.
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Grid
              container
              columns={{ xs: 1, md: 12 }}
              spacing={{ xs: 2, md: 4 }}
            >
              <Grid item xs={1} md={2}>
                <FaMountain
                  style={{
                    marginTop: "1rem",
                    fontSize: "4rem",
                    color: "#4caf50",
                  }}
                />
              </Grid>
              <Grid item xs={1} md={7}>
                <Stack>
                  <Typography variant="h6" component="div">
                    Our Goals
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Our goal is to serve a small portion of community with great
                    care. We crave for our customer's satisfaction. We already
                    create a solid space in gaming community who are concerned
                    about their health. In coming days, we have a plan to make
                    it an international moovements
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={1} md={6}>
          <img
            style={{ width: "60%", display: "block", margin: "8rem auto" }}
            src={AboutImage}
            alt="Why Choose Us"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
