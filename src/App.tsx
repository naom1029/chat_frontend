import React from "react";
import { Container } from "@mui/material";
import ChatWindow from "./components/ChatWindow";

const App: React.FC = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      <ChatWindow />
    </Container>
  );
};

export default App;
