import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authService } from "fireBaseApp/fBase";
import { Button, DialogActions, DialogContent, Stack } from "@mui/material";
import styled from "@emotion/styled";
import { red } from "@mui/material/colors";
import HookFormInput from "components/login/HookFormInput";

const ErrorParagraph = styled.span`
  color: ${red[500]};
`;

const LoginForm: FC<{handleClose: () => void}> = ({ handleClose }) => {
  const router = useRouter()

  const { register, formState: { errors }, handleSubmit } = useForm<LoginFormValue>();

  const onSubmit: SubmitHandler<LoginFormValue> = (data) => {
    const { email, password } = data
    signInWithEmailAndPassword(authService, email, password)
      .then(() => alert("로그인 성공!"))
      .catch(err => console.log(err))
      .finally(() => {
        handleClose()
        router.push('/')
      })
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
