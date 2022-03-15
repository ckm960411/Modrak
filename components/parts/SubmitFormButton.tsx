import { FC } from "react";
import { CircularProgress } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";

type SubmitFormButtonProps = {
  loading: boolean
  icon?: boolean
  spinColor?: string
  [key: string]: any
}

const SubmitFormButton: FC<SubmitFormButtonProps> = ({ loading, icon = true, spinColor = '#fff', children, ...props }) => {

  return (
    <LoadingButton
      type="submit"
      variant="contained"
      loading={loading}
      loadingIndicator={
        <span style={{ color: spinColor }}>
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
