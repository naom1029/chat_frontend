import React from "react";
import { Box, List, Paper, Typography } from "@mui/material";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import useWebSocket from "../hooks/useWebSocket";
import { Message } from "../types/chat";

const ChatWindow: React.FC = () => {
  // const url = process.env.REACT_APP_WEBSOCKET_URL;
  const url = "ws://localhost:8080/ws";
  if (!url) {
    throw new Error("WebSocket URL is not defined in .env file");
  }
  const { messages, isConnected, sendMessage } = useWebSocket(url);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now(), // 一意のIDを生成
      text: text,
      timestamp: new Date(),
    };
    sendMessage(newMessage);
  };

  return (
    <Paper
      elevation={3}
      sx={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Box
        sx={{
          p: 2,
          backgroundColor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        <Typography variant="h6">Chat App</Typography>
      </Box>
      <List sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </List>
      <Box sx={{ p: 2 }}>
        <ChatInput onSendMessage={handleSendMessage} />
      </Box>
    </Paper>
  );
};

export default ChatWindow;
