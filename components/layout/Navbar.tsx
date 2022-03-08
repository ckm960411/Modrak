import React, { FC, useState } from "react";
import { IconButton, Stack, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import { drawerWidth } from "components/layout/AppLayout";
import { useRouter } from "next/router";
import NavbarBtns from "components/layout/NavbarBtns";

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
  open: boolean;
  handleDrawerOpen: () => void;
};

const Navbar: FC<NavbarProps> = ({ open, handleDrawerOpen }) => {
  const router = useRouter()
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <AppBar position="fixed" open={open} sx={{ backgroundColor: "#fff" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Stack direction="row">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }), color: "#009e5d" }}
          >
            <MenuIcon />
          </IconButton>
          <div>
            {open || (
              <Typography
                variant="h6"
                component="div"
                sx={{ color: "#009e5d", fontFamily: "Katuri", fontSize: 24, cursor: 'pointer' }}
                onClick={() => router.push('/')}
              >
                모드락
              </Typography>
            )}
          </div>
        </Stack>
        <>{(downMd && open) || <NavbarBtns />}</>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
