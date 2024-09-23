import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  DrawerProps,
  IconButton,
  Divider,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home"; // 各ルームに対応するアイコン

interface SideBarProps extends DrawerProps {
  rooms: string[];
  onSelectRoom: (room: string) => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

const Sidebar: React.FC<SideBarProps> = ({
  rooms,
  onSelectRoom,
  isCollapsed,
  toggleCollapse,
  sx,
  ...otherProps
}) => {
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isCollapsed ? 60 : 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: isCollapsed ? 60 : 240,
          boxSizing: "border-box",
          transition: theme.transitions.create(["width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
          overflowX: "hidden",
          padding: 0,
        },
        ...sx,
      }}
      {...otherProps}
    >
      <Toolbar sx={{ minHeight: 0, p: 1, width: isCollapsed ? 60 : 240 }}>
        <IconButton onClick={toggleCollapse}>
          {isCollapsed ? <MenuIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {rooms.map((room) => (
          <ListItemButton
            key={room}
            onClick={() => onSelectRoom(room)}
            sx={{ px: isCollapsed ? 1 : 2 }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isCollapsed ? "auto" : 2, // サイドバーが折りたたまれた場合にアイコンを中央に配置
                justifyContent: "center", // アイコンを中央に配置
              }}
            >
              {" "}
              <HomeIcon />
            </ListItemIcon>
            {!isCollapsed && <ListItemText primary={room} />}
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
