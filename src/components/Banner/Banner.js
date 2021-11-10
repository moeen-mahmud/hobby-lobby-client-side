import React from "react";

// Material
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

// Banner Image
import bgBanner from "../../assets/bg-banner-main.png";

// Banner style
const bgStyle = {
  height: "100vh",
  backgroundImage: `url(${bgBanner})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
};

const Banner = () => {
  return (
    <Box
      style={bgStyle}
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ textAlign: "center", mt: 15 }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            textShadow: "1px 1px #232832",
            lineHeight: "1.5",
            mb: 3,
          }}
          component="h1"
          color="secondary.main"
        >
          It's Really Important <br /> to Have A Good Gaming Chair
        </Typography>
        <Typography
          variant="body1"
          component="p"
          color="neutral.main"
          sx={{
            textShadow: "1px 1px #232832",
            fontSize: "1.2rem",
            lineHeight: "2",
            fontWeight: 500,
          }}
        >
          We are always overlooking the most importanct factor while gaming.
          <br />
          A good gaming chair helps us to mantain our postures. <br /> It's
          really important for those who spend a long session in sitting.
        </Typography>
      </Box>
    </Box>
  );
};

export default Banner;
