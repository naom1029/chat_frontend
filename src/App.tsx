import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, createTheme, CssBaseline } from "@mui/material";
import SignUpform from "./components/Auth/SignUpform";
import ChatWindow from "./components/Chat/ChatWindow";
import PrivateRoute from "./components/Auth/PrivateRoute";
import { ThemeProvider } from "@emotion/react";
import AuthCallback from "./components/Auth/AuthCallback";
import { initializeUser } from "./store/userStore";

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
  useEffect(() => {
    initializeUser();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* CSSリセットを適用 */}
      <Router>
        <Routes>
          {/* 認証関連のルート */}
          {/* <Route path="/signup" element={<SignUpform />} /> */}
          {/* <Route path="/auth/callback" element={<AuthCallback />} /> */}

          {/* プライベートルート */}
          <Route
            path="/"
            element={
              // <PrivateRoute>
              <ChatWindow />
              // </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
