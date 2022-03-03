import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  List,
  Drawer,
  Typography,
  IconButton,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import AodIcon from "@mui/icons-material/Aod";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import HotelIcon from "@mui/icons-material/Hotel";
import { useTheme } from "@mui/material/styles";
import { drawerWidth, DrawerHeader } from "components/layout/AppLayout";

const SidebarIcons = [
  {
    icon: <HomeIcon />,
    primary: "홈",
    route: "/",
  },
  {
    icon: <AodIcon />,
    primary: "피드",
    route: "/feed",
  },
  {
    icon: <DinnerDiningIcon />,
    primary: "맛집",
    route: "/restaurant",
  },
  {
    icon: <HotelIcon />,
    primary: "숙박",
    route: "/accommodation",
  },
];

type SidebarProps = {
  open: boolean;
  handleDrawerClose: () => void;
};

const Sidebar: FC<SidebarProps> = ({ open, handleDrawerClose }) => {
  const { route } = useRouter();
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
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <List>
        {SidebarIcons.map((item, i) => (
          <Link href={item.route} key={i}>
            <a>
              <ListItemButton selected={item.route === route}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.primary} />
              </ListItemButton>
            </a>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
