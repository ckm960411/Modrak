import { Dispatch, FC, SetStateAction } from "react";
import {
  Badge,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
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
  open: boolean;
  handleDrawerOpen: () => void;
  isLoggedIn: boolean
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
};

const Navbar: FC<NavbarProps> = ({ open, handleDrawerOpen, isLoggedIn, setIsLoggedIn }) => {

  return (
    <AppBar position="fixed" open={open} sx={{ backgroundColor: "#fff" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
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
              모드락
            </Typography>
          )}
        </div>
        <div>{/** 로그인 박스가 우측에 가도록 삽입 */}</div>
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          {isLoggedIn ? (
            <>
              <Stack direction="row" spacing={1}>
                <Tooltip title="알림" arrow>
                  <IconButton>
                    <Badge color="primary" variant="dot" sx={{ cursor: "pointer" }}>
                      <MailIcon sx={{ color: "#858585" }} />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title="장바구니" arrow>
                  <IconButton>
                    <Badge color="primary" variant="dot" sx={{ cursor: "pointer" }}>
                      <ShoppingCartIcon sx={{ color: "#858585" }} />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </Stack>
              <Button variant="contained" size="small" onClick={() => setIsLoggedIn(false)}>로그아웃</Button>
            </>
          ): (
            <>
              <Button variant="outlined" size="small">회원가입</Button>
              <Button variant="contained" size="small" onClick={() => setIsLoggedIn(true)}>로그인</Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
