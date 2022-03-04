import { FC } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CertificationType } from "components/layout/Navbar";
import { Stack } from "@mui/material";
import SignupForm from "components/login/SignupForm";

type CertificationModalType = {
  open: boolean
  handleClose: () => void
  certificationType: CertificationType
}

const CertificationModal: FC<CertificationModalType> = ({ open, handleClose, certificationType }) => {

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <form>
        <DialogTitle sx={{ fontFamily: 'Katuri' }}>{certificationType}</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <SignupForm />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: '0 24px 20px' }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CertificationModal;
