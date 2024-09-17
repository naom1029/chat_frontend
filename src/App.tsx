import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, createTheme } from "@mui/material";
import SignUpform from "./components/Auth/SignUpform";
import ChatWindow from "./components/Chat/ChatWindow";
import PrivateRoute from "./components/Auth/PrivateRoute";
import { ThemeProvider } from "@emotion/react";
import AuthCallback from "./components/Auth/AuthCallback";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Container
          maxWidth="sm"
          sx={{ height: "100vh", display: "flex", flexDirection: "column" }}
        >
          <Routes>
            {" "}
            <Route path="/" element={<SignUpform />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route
              path="/chat"
              element={
                <PrivateRoute>
                  <ChatWindow />
                </PrivateRoute>
              }
            />{" "}
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
