import { FC } from "react";
import { CircularProgress } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { useAppSelector } from "store/hooks";

type SubmitFormButtonProps = {
  [key: string]: any
}

const SubmitFormButton: FC<SubmitFormButtonProps> = ({ children, ...props }) => {
  const users = useAppSelector(state => state.users);
  const feeds = useAppSelector(state => state.feeds);

  return (
    <LoadingButton
      type="submit"
      variant="contained"
      loading={users.loading || feeds.loading}
      loadingIndicator={
        <span style={{ color: "#fff" }}>
          <CircularProgress
            color="inherit"
            size={16}
            sx={{ position: "relative", top: "4px" }}
          />
        </span>
      }
      endIcon={<SendIcon />}
      {...props}
    >
      { children }
    </LoadingButton>
  );
};

export default SubmitFormButton;
