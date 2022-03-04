import { FC } from "react";
import { Button, FormControl, TextField } from "@mui/material";

const SignupForm: FC = () => {
  return (
    <>
      <FormControl fullWidth>
        <TextField autoFocus type="name" placeholder="이름을 입력하세요" />
      </FormControl>
      <FormControl fullWidth>
        <div style={{ display: "flex" }}>
          <TextField
            type="nickname"
            placeholder="닉네임을 입력하세요"
            sx={{ flexGrow: 1 }}
          />
          <Button
            size="small"
            variant="outlined"
            sx={{ display: "inline-block", ml: 1 }}
          >
            중복 확인
          </Button>
        </div>
      </FormControl>
      <FormControl fullWidth>
        <div style={{ display: "flex" }}>
          <TextField
            type="email"
            placeholder="이메일을 입력하세요"
            sx={{ flexGrow: 1 }}
          />
          <Button
            size="small"
            variant="outlined"
            sx={{ display: "inline-block", ml: 1 }}
          >
            중복 확인
          </Button>
        </div>
      </FormControl>
      <FormControl fullWidth>
        <TextField type="password" placeholder="비밀번호를 입력하세요" />
      </FormControl>
      <FormControl fullWidth>
        <TextField
          type="password-confirm"
          placeholder="비밀번호를 다시 입력하세요"
        />
      </FormControl>
    </>
  );
};

export default SignupForm;
