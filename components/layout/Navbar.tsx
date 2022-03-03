import { FC } from "react";
import { IconButton, Toolbar, Typography } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import { drawerWidth } from "components/layout/AppLayout";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

type NavbarProps = {
  open: boolean
  handleDrawerOpen: () => void
}

const Navbar: FC<NavbarProps> = ({ open, handleDrawerOpen}) => {
  return (
    <AppBar position="fixed" open={open} sx={{ backgroundColor: "#fff" }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }), color: "#009e5d" }}
        >
          <MenuIcon />
        </IconButton>
        {open || (
          <Typography
            variant="h6"
            component="div"
            sx={{ color: "#009e5d", fontFamily: "Katuri", fontSize: 24 }}
          >
            Modrak
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
