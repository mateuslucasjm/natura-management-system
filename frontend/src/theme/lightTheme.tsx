import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#D9570B",
      light: "#F28A4B",
      dark: "#A83D05",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#475569",
      light: "#64748B",
      dark: "#334155",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F1F3F6",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#172033",
      secondary: "#596579",
    },
    divider: "#DCE1E8",
    action: {
      active: "#475569",
      selected: "#FCE9DD",
      hover: "#F1F3F6",
      disabled: "#A0A8B5",
      disabledBackground: "#E8EBF0",
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          "&.Mui-selected": {
            backgroundColor: "#FCE9DD",
            color: "#B8470A",
            "&:hover": {
              backgroundColor: "#F8DCCB",
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

export default lightTheme;
