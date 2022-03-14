import { FC } from "react";
import { CircularProgress } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";

type SubmitFormButtonProps = {
  loading: boolean
  icon?: boolean
  [key: string]: any
}

const SubmitFormButton: FC<SubmitFormButtonProps> = ({ loading, icon = true, children, ...props }) => {

  return (
    <LoadingButton
      type="submit"
      variant="contained"
      loading={loading}
      loadingIndicator={
        <span style={{ color: "#fff" }}>
          <CircularProgress
            color="inherit"
            size={16}
            sx={{ position: "relative", top: "4px" }}
          />
        </span>
      }
      endIcon={icon ? <SendIcon /> : undefined}
      {...props}
    >
      { children }
    </LoadingButton>
  );
};

export default SubmitFormButton;
