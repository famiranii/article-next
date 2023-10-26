import "@/styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    yellow: {
      main: "#fca311",
    },
    navyBlue: {
      main: "#14213d",
    },
  },
});

theme.typography.h1 = {
  fontSize: "1.5rem",
};

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme} >
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
