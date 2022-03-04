import { FC, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "components/layout/Navbar";
import Sidebar from "./Sidebar";

export const drawerWidth = 240;

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppLayout: FC = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down("md"))

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  useEffect(() => {
    if (downMd) setOpen(false)
    else setOpen(true)
  }, [downMd])

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} isLoggedIn={isLoggedIn} />
      <Main open={open}>
        <DrawerHeader />
        <Container maxWidth="lg">
          {children}
        </Container>
      </Main>
    </Box>
  );
};

export default AppLayout;
