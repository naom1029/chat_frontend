import React, { useState } from "react";
import {
  Avatar,
  Box,
  Container,
  List,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import MessageItem from "./MessageItem";
import ChatInput from "./ChatInput";
import useWebSocket from "../../hooks/useWebSocket";
import { SendMessage } from "../../types/message";
import { useUserStore } from "../../store/userStore";
import Sidebar from "./SideBar";

const ChatWindow: React.FC = () => {
  const theme = useTheme();
  const { user, loading } = useUserStore();
  const url = "ws://localhost:8080/ws";
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const rooms = ["Server1", "Server2", "Server3", "Server4"];
  const handleSelectRoom = (room: string) => {
    setSelectedRoom(room);
  };
  if (!url) {
    throw new Error("WebSocket URL is not defined in .env file");
  }
  const { messages, isConnected, sendMessage } = useWebSocket(url);

  const handleSendMessage = (text: string) => {
    const newMessage: SendMessage = {
      text: text,
    };
    sendMessage(newMessage);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar rooms={rooms} onSelectRoom={handleSelectRoom} />
      <Container
        maxWidth="sm"
        sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
      >
        {!selectedRoom ? (
          <Typography variant="h6" sx={{ p: 2 }}>
            Please select a chat room
          </Typography>
        ) : (
          <>
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
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <Typography variant="h5" fontWeight="bold">
                  Chat App
                </Typography>

                {user && (
                  <Avatar
                    src={user.user_metadata.avatar_url}
                    alt={user.user_metadata.full_name || user.email}
                    sx={{ position: "absolute", right: 16 }}
                  />
                )}
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
                  <MessageItem key={message.id} message={message} />
                ))}
              </List>
              <Box
                sx={{ p: 3, backgroundColor: theme.palette.background.paper }}
              >
                <ChatInput onSendMessage={handleSendMessage} />
              </Box>
            </Paper>
          </>
        )}
      </Container>
    </Box>
  );
};

export default ChatWindow;
