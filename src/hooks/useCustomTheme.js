import { createTheme } from "@mui/material";

const useCustomTheme = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#232832",
      },
      secondary: {
        main: "#4caf50",
      },
      accent: {
        main: "#ff5252",
      },
      neutral: {
        main: "#fefeff",
      },
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
    },
  });

  return { theme };
};

export default useCustomTheme;
