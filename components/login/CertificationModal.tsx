import { FC } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from "@mui/material";
import { CertificationType } from "components/layout/Navbar";
import SignupForm from "components/login/SignupForm";
import LoginForm from "components/login/LoginForm";

type CertificationModalType = {
  open: boolean;
  handleClose: () => void;
  certificationType: CertificationType;
  toggleCertification: () => void
};

const CertificationModal: FC<CertificationModalType> = ({
  open,
  handleClose,
  certificationType,
  toggleCertification
}) => {
  const isSignup: boolean = certificationType === '회원가입'

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <form>
        <DialogTitle sx={{ fontFamily: "Katuri" }}>{certificationType}</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            {isSignup ? <SignupForm /> : <LoginForm />}
          </Stack>
          <DialogContentText
            sx={{
              mt: 2,
              cursor: "pointer",
              textAlign: "center",
              textDecoration: "underline",
              color: "#009e5d",
            }}
            onClick={toggleCertification}
          >
            {isSignup ? "이미 계정이 있습니다": "아직 계정이 없으세요?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: "0 24px 20px" }}>
          <Button>취소</Button>
          <Button variant="contained">
            {isSignup ? "회원가입" : "로그인"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CertificationModal;
