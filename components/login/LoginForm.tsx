import { FC } from "react";
import { FormControl, TextField } from "@mui/material";

const LoginForm: FC = () => {
  return (
    <>
      <FormControl fullWidth>
        <TextField autoFocus type="email" placeholder="이메일을 입력하세요" />
      </FormControl>
      <FormControl fullWidth>
        <TextField type="password" placeholder="비밀번호를 입력하세요" />
      </FormControl>
    </>
  );
};

export default LoginForm;
