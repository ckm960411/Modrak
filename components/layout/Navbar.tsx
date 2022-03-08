import React, { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { Badge, Button, IconButton, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/material/styles";
import { drawerWidth } from "components/layout/AppLayout";
import CertificationModal from "components/login/CertificationModal";
import { authService } from "fireBaseApp/fBase";
import { useRouter } from "next/router";
import { removeMyInfoData } from "store/usersSlice";

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

export type CertificationType = "로그인" | "회원가입"

const Navbar: FC<NavbarProps> = ({ open, handleDrawerOpen }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [modalOpened, setModalOpened] = useState<boolean>(false)
  const [certificationType, setCertificationType] = useState<CertificationType>("로그인")

  const myInfo = useAppSelector(state => state.users.myInfo)

  const handleModalOpen = (e: React.MouseEvent<HTMLElement>) => {
    const { innerText } = e.target as HTMLElement
    if (innerText === "로그인") setCertificationType('로그인')
    else setCertificationType('회원가입')
    setModalOpened(true)
  }
  const handleModalClose = () => setModalOpened(false)

  const onLogoutClick = () => {
    const ok = confirm('정말 로그아웃 하시겠습니까?')
    if (!ok) return
    authService.signOut()
    alert('로그아웃이 완료됐습니다!')
    dispatch(removeMyInfoData())
  }

  return (
    <AppBar position="fixed" open={open} sx={{ backgroundColor: "#fff" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Stack direction="row">
          <>
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
          </>
        </Stack>
        <div>{/** 로그인 박스가 우측에 가도록 삽입 */}</div>
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          {myInfo ? (
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
              <Button variant="contained" size="small" onClick={onLogoutClick}>
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Button variant="outlined" size="small" onClick={handleModalOpen}>
                회원가입
              </Button>
              <Button variant="contained" size="small" onClick={handleModalOpen}>
                로그인
              </Button>
              {modalOpened && (
                <CertificationModal 
                  open={modalOpened} 
                  handleClose={handleModalClose} 
                  certificationType={certificationType} 
                />
              )}
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
