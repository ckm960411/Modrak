import { FC, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { authService } from "fireBaseApp/fBase";
import { browserSessionPersistence, onAuthStateChanged, setPersistence } from "firebase/auth";
import { useAppDispatch } from "store/hooks";
import { loadMyInfoData } from "store/slices/usersSlice";
import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "components/layout/Navbar";
import Sidebar from "components/layout/Sidebar";
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc";

export const drawerWidth = 240;

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

const AppLayout: FC = ({ children }) => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(true);
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down("md"))
  
  const onLoadUserData = async (uid: string) => {
    const { searchedData: userData } = await searchFirestoreDoc(`users/${uid}`)
    dispatch(loadMyInfoData(userData))
  }

  useEffect(() => {
    setPersistence(authService, browserSessionPersistence)
    onAuthStateChanged(authService, user => {
      if (user) return onLoadUserData(user.uid)
      else return
    })
  }, [])

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

export default AppLayout;
