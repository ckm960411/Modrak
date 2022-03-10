import { FC, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { authService, dbService } from "fireBaseApp/fBase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { browserSessionPersistence, onAuthStateChanged, setPersistence } from "firebase/auth";
import { useAppDispatch } from "store/hooks";
import { loadMyInfoData } from "store/usersSlice";
import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "components/layout/Navbar";
import Sidebar from "components/layout/Sidebar";

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
  paddingTop: 24,
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
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(true);
  const theme = useTheme()
  const downLg = useMediaQuery(theme.breakpoints.down("lg"))
  
  const onLoadUserData = async (uid: string) => {
    const usersRef = collection(dbService, "users")
    const q = query(usersRef, where("uid", "==", uid))
    const userData = await getDocs(q)
      .then(res => {
        dispatch(loadMyInfoData(res.docs[0].data()))
      })
      .catch(err => console.log(err))
    return userData
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
    if (downLg) setOpen(false)
    else setOpen(true)
  }, [downLg])

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
