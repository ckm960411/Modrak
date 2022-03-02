import { FC } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AodIcon from '@mui/icons-material/Aod';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import HotelIcon from '@mui/icons-material/Hotel';
import Link from "next/link";
import { useRouter } from "next/router";

const drawerWidth = 240;

type IconListItem = {
  icon: () => React.ReactNode;
  primary: string;
  route: string;
};

const SidebarIcons: IconListItem[] = [
  {
    icon: () => <HomeIcon />,
    primary: "홈",
    route: "/",
  },
  {
    icon: () => <AodIcon />,
    primary: "피드",
    route: "/feed",
  },
  {
    icon: () => <DinnerDiningIcon />,
    primary: "맛집",
    route: "/restaurant",
  },
  {
    icon: () => <HotelIcon />,
    primary: "숙박",
    route: "/accommodation",
  },
]

const Sidebar: FC = () => {
  const { route } = useRouter()

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {SidebarIcons.map(item => (
            <Link href={item.route} key={item.primary}>
              <a>
                <ListItemButton selected={item.route === route}>
                  <ListItemIcon sx={{ minWidth: '50px', color: '#353535' }}>{item.icon()}</ListItemIcon>
                  <ListItemText 
                    primary={item.primary} 
                    primaryTypographyProps={{ fontFamily: "Katuri", color: '#353535' }} 
                  />
                </ListItemButton>
              </a>
            </Link>
            )
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
