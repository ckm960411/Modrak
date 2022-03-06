import { FC } from "react";
import { Dialog, DialogTitle } from "@mui/material";
import { CertificationType } from "components/layout/Navbar";
import SignupForm from "components/login/SignupForm";
import LoginForm from "components/login/LoginForm";

type CertificationModalType = {
  open: boolean;
  handleClose: () => void;
  certificationType: CertificationType;
};

const CertificationModal: FC<CertificationModalType> = ({
  open,
  handleClose,
  certificationType,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontFamily: "Katuri" }}>{certificationType}</DialogTitle>
      {certificationType === '회원가입' ? (
        <SignupForm handleClose={handleClose} />
      ) : (
        <LoginForm handleClose={handleClose} />
      )}
    </Dialog>
  );
};

export default CertificationModal;
