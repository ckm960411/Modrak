import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authService } from "fireBaseApp/fBase";
import { Button, DialogActions, DialogContent, Stack } from "@mui/material";
import styled from "@emotion/styled";
import { red } from "@mui/material/colors";
import HookFormInput from "components/login/HookFormInput";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setUserLoadingfalse, setUserLoadingTrue } from "store/usersSlice";
import SubmitFormButton from "components/parts/SubmitFormButton";

const ErrorParagraph = styled.span`
  color: ${red[500]};
`;

const LoginForm: FC<{handleClose: () => void}> = ({ handleClose }) => {
  const dispatch = useAppDispatch()
  const userLoading = useAppSelector(state => state.users.loading)

  const { register, formState: { errors }, handleSubmit } = useForm<LoginFormValue>();

  const onSubmit: SubmitHandler<LoginFormValue> = (data) => {
    const { email, password } = data
    dispatch(setUserLoadingTrue())
    signInWithEmailAndPassword(authService, email, password)
      .then(() => {
        alert("로그인 성공!")
        handleClose()
      })
      .catch(() => alert('로그인에 실패했습니다! 다시 시도해주세요!'))
      .finally(() => dispatch(setUserLoadingfalse()))
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
        <SubmitFormButton loading={userLoading} onClick={handleSubmit(onSubmit)}>
          로그인
        </SubmitFormButton>
      </DialogActions>
    </form>
  );
};

export default LoginForm;
