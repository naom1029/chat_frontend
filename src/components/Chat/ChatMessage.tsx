import React from "react";
import { ListItem, ListItemText, Typography, Paper } from "@mui/material";
import { Message } from "../types/chat";

export interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  // message.timestamp を Date オブジェクトに変換
  const date =
    typeof message.timestamp === "string" ||
    typeof message.timestamp === "number"
      ? new Date(message.timestamp)
      : message.timestamp;

  return (
    <ListItem>
      <Paper
        elevation={1}
        sx={{
          p: 2,
          maxWidth: "70%",
          ml: message.sender === "You" ? "auto" : 0,
        }}
      >
        <ListItemText
          primary={
            <Typography variant="subtitle2">{message.sender}</Typography>
          }
          secondary={
            <>
              <Typography component="span" variant="body2" color="text.primary">
                {message.text}
              </Typography>
              <Typography component="span" variant="caption" display="block">
                {date.toLocaleTimeString()}
              </Typography>
            </>
          }
        />
      </Paper>
    </ListItem>
  );
};

export default ChatMessage;
