import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AodIcon from "@mui/icons-material/Aod";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import HotelIcon from "@mui/icons-material/Hotel";

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

const SidebarList: FC = () => {
  const { route } = useRouter();

  return (
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
  );
};

export default SidebarList;
