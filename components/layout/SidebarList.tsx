import { FC, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { List, ListItemButton, ListItemIcon, ListItemText, useTheme, useMediaQuery } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AodIcon from "@mui/icons-material/Aod";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import HotelIcon from "@mui/icons-material/Hotel";

const SidebarIcons = [
  {
    icon: <HomeIcon />,
    primary: "홈",
    route: "/",
    className: "home",
  },
  {
    icon: <AodIcon />,
    primary: "피드",
    route: "/feed",
    className: "feed",
  },
  {
    icon: <DinnerDiningIcon />,
    primary: "맛집",
    route: "/restaurant",
    className: "restaurant",
  },
  {
    icon: <HotelIcon />,
    primary: "숙박",
    route: "/accommodation",
    className: "accommodation",
  },
];

const SidebarList: FC<{handleDrawerClose: () => void}> = ({ handleDrawerClose }) => {
  const { route } = useRouter();
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down("md"))

  useEffect(() => {
    const restaurantList = document.querySelector('.restaurant')
    const accommodationList = document.querySelector('.accommodation')
    if (route === "/restaurant" || route === "/restaurant/[id]") {
      restaurantList?.classList.add("Mui-selected")
    } else {
      restaurantList?.classList.remove("Mui-selected")
    } 
    if (route === "/accommodation" || route === "/accommodation/[id]") {
      accommodationList?.classList.add("Mui-selected")
    } else {
      accommodationList?.classList.remove("Mui-selected")
    }
  }, [route])

  return (
    <List>
      {SidebarIcons.map((item, i) => (
        <Link href={item.route} key={i}>
          <a>
            <ListItemButton 
              id="sidebar-listitem-button"
              className={item.className}
              selected={item.route === route}
              onClick={downMd ? handleDrawerClose : undefined}
            >
              <ListItemIcon id="sidebar-listitem-icon">{item.icon}</ListItemIcon>
              <ListItemText id="sidebar-listitem-text" primary={item.primary} />
            </ListItemButton>
          </a>
        </Link>
      ))}
    </List>
  );
};

export default SidebarList;
