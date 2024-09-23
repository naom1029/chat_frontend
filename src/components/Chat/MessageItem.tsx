import React from "react";
import { ListItem, ListItemText, Typography, Paper } from "@mui/material";
import { SendMessage } from "../../types/message";

export interface ChatMessageProps {
  message: SendMessage;
}

const MessageItem: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <ListItem>
      <Paper
        elevation={1}
        sx={{
          p: 2,
          maxWidth: "70%",
          // ml: message.sender === "You" ? "auto" : 0,
        }}
      >
        <ListItemText
          // primary={
          //   <Typography variant="subtitle2">{message.sender}</Typography>
          // }
          secondary={
            <>
              <Typography component="span" variant="body2" color="text.primary">
                {message.text}
              </Typography>
              {/* <Typography component="span" variant="caption" display="block">
                {date.toLocaleTimeString()}
              </Typography> */}
            </>
          }
        />
      </Paper>
    </ListItem>
  );
};

export default MessageItem;
