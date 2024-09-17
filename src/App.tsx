import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import SignUpform from "./components/Auth/SignUpform";
import ChatWindow from "./components/Chat/ChatWindow";
import PrivateRoute from "./components/Auth/PrivateRoute";
const App: React.FC = () => {
  return (
    <Router>
      <Container
        maxWidth="sm"
        sx={{ height: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Routes>
          {" "}
          <Route path="/" element={<SignUpform />} />
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
  );
};

export default App;
