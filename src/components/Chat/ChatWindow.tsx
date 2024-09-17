import React from "react";
import { Box, List, Paper, Typography, useTheme } from "@mui/material";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import useWebSocket from "../../hooks/useWebSocket";
import { Message } from "../../types/chat";

const ChatWindow: React.FC = () => {
  const theme = useTheme();
  const url = "ws://localhost:8080/ws";
  if (!url) {
    throw new Error("WebSocket URL is not defined in .env file");
  }
  const { messages, isConnected, sendMessage } = useWebSocket(url);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      text: text,
      timestamp: new Date(),
    };
    sendMessage(newMessage);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.default,
        borderRadius: 0,
      }}
    >
      <Box
        sx={{
          p: 3,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          boxShadow: theme.shadows[3],
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Chat App
        </Typography>
      </Box>
      <List
        sx={{
          flexGrow: 1,
          overflow: "auto",
          p: 3,
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.1)",
            outline: "1px solid slategrey",
          },
        }}
      >
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </List>
      <Box sx={{ p: 3, backgroundColor: theme.palette.background.paper }}>
        <ChatInput onSendMessage={handleSendMessage} />
      </Box>
    </Paper>
  );
};

export default ChatWindow;
