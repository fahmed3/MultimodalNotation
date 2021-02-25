import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#f5f5f5",
    },
    primary: {
      light: "#33a095",
      main: "#00897b",
      dark: "#005f56",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ea605d",
      main: "#e53935",
      dark: "#a02725",
      contrastText: "#000",
    },
  },

  typography: {
    fontFamily: '"Comfortaa", Open Sans',
  },
});

export default theme;
