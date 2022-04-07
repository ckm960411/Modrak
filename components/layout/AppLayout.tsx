import { FC, useState, useEffect } from "react";
import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import useLoadingUserInfo from "utils/hooks/useLoadingUserInfo";
import Navbar from "components/layout/Navbar";
import Sidebar from "components/layout/Sidebar";

export const drawerWidth = 240;

const AppLayout: FC = ({ children }) => {
  const [open, setOpen] = useState(true);
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down("md"))
  useLoadingUserInfo() // 로그인시 로그인상태 유지

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  useEffect(() => {
    if (downMd) setOpen(false)
    else setOpen(true)
  }, [downMd])

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
      <Main open={open}>
        <DrawerHeader />
        <Container maxWidth="lg">
          {children}
        </Container>
      </Main>
    </Box>
  );
};

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  paddingTop: 24,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: '#fff',
  minHeight: '100vh',
  marginLeft: `-${drawerWidth}px`,
  position: 'relative',
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export default AppLayout;
