import { FC, useState } from "react";
import { authService } from "fireBaseApp/fBase";
import MailIcon from "@mui/icons-material/Mail";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, Button, IconButton, Stack, Tooltip } from "@mui/material";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { removeMyInfoData } from "store/slices/usersSlice";
import CertificationModal from "components/login/CertificationModal";

export type CertificationType = "로그인" | "회원가입"

const NavbarBtns: FC = () => {
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
  );
};

export default NavbarBtns;
