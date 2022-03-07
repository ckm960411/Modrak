import { FC } from "react";
import { useAppSelector } from "store/hooks";
import { Drawer, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { drawerWidth, DrawerHeader } from "components/layout/AppLayout";
import SidebarProfile from "components/layout/SidebarProfile";
import SidebarList from "components/layout/SidebarList";

type SidebarProps = {
  open: boolean;
  handleDrawerClose: () => void;
};

const Sidebar: FC<SidebarProps> = ({ open, handleDrawerClose }) => {
  const myInfo = useAppSelector(state => state.users.myInfo)
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
      {myInfo && <SidebarProfile />}
      <SidebarList />
    </Drawer>
  );
};

export default Sidebar;
