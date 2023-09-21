import '../styles/globals.scss'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {red} from "@mui/material/colors";

const theme = createTheme({
  palette: {
    red: {
      main: red,
      contrastText: '#fff'
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
});

function MyApp({ Component, pageProps }) {
  return <ThemeProvider theme={theme}> <Component {...pageProps} /> </ThemeProvider>
}

export default MyApp
