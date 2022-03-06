import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, DialogActions, DialogContent, Stack } from "@mui/material";
import HookFormInput from "components/login/HookFormInput";
import styled from "@emotion/styled";
import { red } from "@mui/material/colors";

const ErrorParagraph = styled.span`
  color: ${red[500]};
`;

type LoginFormValue = {
  email: string;
  password: string;
}

const LoginForm: FC<{handleClose: () => void}> = ({ handleClose }) => {
  const { register, formState: { errors }, handleSubmit } = useForm<LoginFormValue>();

  const onSubmit: SubmitHandler<LoginFormValue> = (data) => {
    console.log(data)
  };

  return (
    <form>
      <DialogContent>
        <Stack spacing={2}>
          <HookFormInput
            type="email"
            placeholder="이메일을 입력하세요" 
            errors={errors}
            attributes={register("email", { required: true, pattern: /^\S+@\S+$/i })}
          >
            {errors.email && (<ErrorParagraph>This email field is required.</ErrorParagraph>)}
          </HookFormInput>
          <HookFormInput
            type="password"
            placeholder="비밀번호를 입력하세요" 
            errors={errors}
            attributes={register("password", { required: true, minLength: 6 })}
          >
            {errors.password && errors.password.type === "required" && (
              <ErrorParagraph>This field is required</ErrorParagraph>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <ErrorParagraph>Password must have at least 6 characters.</ErrorParagraph>
            )}
          </HookFormInput>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: "0 24px 20px" }}>
        <Button onClick={handleClose}>취소</Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          로그인
        </Button>
      </DialogActions>
    </form>
  );
};

export default LoginForm;
