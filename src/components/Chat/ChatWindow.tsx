import React, { useEffect, useRef, useState } from "react";
import { Avatar, Box, List, Paper, Typography, useTheme } from "@mui/material";
import { MessageCircle, Users } from "lucide-react";
import MessageItem from "./MessageItem";
import ChatInput from "./ChatInput";
import useWebSocket from "../../hooks/useWebSocket";
import { SendMessage } from "../../types/SendMessage";
import { useUserStore } from "../../store/userStore";
import Sidebar from "./SideBar";
export default function ChatWindow() {
  const theme = useTheme();
  const { user } = useUserStore();
  const url = "ws://localhost:8080/ws";
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [rooms, setRooms] = useState<string[]>([]);
  const prevSelectedRoomRef = useRef<string | null>(null);
  if (!url) {
    throw new Error("WebSocket URL is not defined in .env file");
  }

  const { messages, sendMessage } = useWebSocket(url, selectedRoom, setRooms);

  const handleSelectRoom = (room: string) => {
    setSelectedRoom(room);
  };
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleSendMessage = (text: string) => {
    if (selectedRoom) {
      const newMessage: SendMessage = {
        type: "Chat",
        text: text,
      };
      sendMessage(newMessage);
    }
  };

  useEffect(() => {
    if (selectedRoom == null) {
      const initialMessage: SendMessage = {
        type: "Command",
        command: "list",
        args: "",
      };
      sendMessage(initialMessage);
    }
    if (selectedRoom && selectedRoom !== prevSelectedRoomRef.current) {
      const selectRoomMessage: SendMessage = {
        type: "Command",
        command: "join",
        args: selectedRoom,
      };
      sendMessage(selectRoomMessage);
      prevSelectedRoomRef.current = selectedRoom;
    }
  }, [selectedRoom, sendMessage]);
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        bgcolor: "background.default",
        overflow: "hidden",
        m: 0,
        p: 0,
      }}
    >
      <Sidebar
        rooms={rooms}
        onSelectRoom={handleSelectRoom}
        isCollapsed={isSidebarCollapsed}
        toggleCollapse={toggleSidebar}
        sx={{
          [`& .MuiDrawer-paper`]: {
            transition: theme.transitions.create(["width"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.standard,
            }),
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          height: "100%",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            borderRadius: 0,
            overflow: "hidden",
          }}
        >
          {/* ヘッダー */}
          <Box
            sx={{
              p: 2,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <MessageCircle size={24} />
              <Typography variant="h6" fontWeight="bold">
                {selectedRoom || "Chat App"}
              </Typography>
            </Box>
            {user && (
              <Avatar
                src={user.user_metadata.avatar_url}
                alt={user.user_metadata.full_name || user.email}
              />
            )}
          </Box>

          {/* ルーム未選択時の表示 */}
          {!selectedRoom ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flexGrow: 1,
                p: 2,
              }}
            >
              <Users size={48} color={theme.palette.text.secondary} />
              <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                Please select a chat room
              </Typography>
            </Box>
          ) : (
            <>
              <List
                sx={{
                  flexGrow: 1,
                  overflowY: "auto",
                  p: 2,
                  "&::-webkit-scrollbar": {
                    width: "0.4em",
                  },
                  "&::-webkit-scrollbar-track": {
                    bgcolor: "background.paper",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    bgcolor: "primary.light",
                    borderRadius: "4px",
                  },
                }}
              >
                {messages.map((message, index) => {
                  if (message.type === "Chat") {
                    return <MessageItem key={message.id} message={message} />;
                  }
                  // RoomListMessage型の場合は何もしないか、適切な処理を追加
                  return null;
                })}
              </List>
              <Box sx={{ p: 2, bgcolor: "background.paper" }}>
                <ChatInput onSendMessage={handleSendMessage} />
              </Box>
            </>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
