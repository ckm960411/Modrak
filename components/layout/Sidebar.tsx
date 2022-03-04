import { FC } from "react";
import { Drawer, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { drawerWidth, DrawerHeader } from "components/layout/AppLayout";
import SidebarProfile from "components/layout/SidebarProfile";
import SidebarList from "components/layout/SidebarList";

type SidebarProps = {
  open: boolean;
  handleDrawerClose: () => void;
  isLoggedIn: boolean
};

const Sidebar: FC<SidebarProps> = ({ open, handleDrawerClose, isLoggedIn }) => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ color: "#fff", fontFamily: "Katuri", fontSize: 24, ml: 2 }}
        >
          Modrak
        </Typography>
        <IconButton onClick={handleDrawerClose} sx={{ color: "#fff" }}>
          <MenuIcon />
        </IconButton>
      </DrawerHeader>
      {isLoggedIn && <SidebarProfile />}
      <SidebarList />
    </Drawer>
  );
};

export default Sidebar;
