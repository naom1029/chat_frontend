import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React from "react";

interface SideBarProps {
  rooms: string[];
  onSelectRoom: (room: string) => void;
}

const Sidebar: React.FC<SideBarProps> = ({ rooms, onSelectRoom }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <List>
        {rooms.map((room) => (
          <ListItemButton key={room} onClick={() => onSelectRoom(room)}>
            <ListItemText primary={room} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};
export default Sidebar;
