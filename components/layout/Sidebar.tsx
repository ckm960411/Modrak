import { FC } from "react";
import { Drawer, Typography, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTheme } from "@mui/material/styles";
import { drawerWidth, DrawerHeader } from "components/layout/AppLayout";
import SidebarProfile from "components/layout/SidebarProfile";
import SidebarList from "components/layout/SidebarList";

type SidebarProps = {
  open: boolean;
  handleDrawerClose: () => void;
  isLoggedIn: boolean
};

const Sidebar: FC<SidebarProps> = ({ open, handleDrawerClose, isLoggedIn }) => {
  const theme = useTheme();

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
          {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      {isLoggedIn && <SidebarProfile />}
      <SidebarList />
    </Drawer>
  );
};

export default Sidebar;
