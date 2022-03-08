import { FC, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { authService, dbService } from "fireBaseApp/fBase"
import { Button, DialogActions, DialogContent, Snackbar, Stack } from "@mui/material";
import styled from "@emotion/styled";
import { red } from "@mui/material/colors";
import onCheckDuplicate from "functions/onCheckDuplicate";
import HookFormInput from "components/login/HookFormInput";
import SideAlert from "components/parts/SideAlert";

const ErrorParagraph = styled.span`
  color: ${red[500]};
`;

const SignupForm: FC<{handleClose: () => void}> = ({ handleClose }) => {
  const [checkedNickname, setCheckedNickname] = useState('')
  const [checkedEmail, setCheckedEmail] = useState('')
  const [alertOpened, setAlertOpened] = useState(false)
  const router = useRouter()

  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignUpFormValue>()

  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch("password")!;
  const nicknameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  
  const onCheckNicknameDuplicated = async () => { // 닉네임 중복 체크
    const duplicatedNickname = await onCheckDuplicate("nickname", nicknameRef.current!.value)
    if (duplicatedNickname) return alert('중복된 닉네임입니다!')
    setAlertOpened(true)
    setCheckedNickname(nicknameRef.current!.value)
  }
  const onCheckEmailDuplicated = async () => { // 이메일 중복 체크
    const duplicatedEmail = await onCheckDuplicate("email", emailRef.current!.value.toLowerCase())
    if (duplicatedEmail) return alert('중복된 이메일입니다!')
    setAlertOpened(true)
    setCheckedEmail(emailRef.current!.value)
  }

  const onCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setAlertOpened(false);
  };

  const onSubmit: SubmitHandler<SignUpFormValue> = (data) => {
    const { email, name, nickname, password } = data
    if (!Boolean(checkedNickname) || checkedNickname !== nicknameRef.current!.value) 
      return alert('닉네임 중복 체크를 완료해주세요!')
    if (!Boolean(checkedEmail) || checkedEmail !== emailRef.current!.value) 
      return alert('이메일 중복 체크를 완료해주세요!')
    createUserWithEmailAndPassword(authService, email, password)
      .then( async() => {
        alert('회원가입이 완료됐습니다!')
        const newUserObj = {
          uid: authService.currentUser!.uid,
          email: authService.currentUser!.email,
          name: name,
          nickname: nickname,
          profileImg: null,
          followers: [],
          followings: [],
        }
        await addDoc(collection(dbService, "users"), newUserObj)
      })
      .catch(err => console.log(err.resultMessage))
      .finally(() => {
        handleClose()
        router.push('/')
      })
  };

  return (
    <form>
      <DialogContent>
        <Stack spacing={2}>
          <HookFormInput // 이름
            type="name"
            placeholder="이름을 입력하세요"
            errors={errors}
            attributes={register("name", { required: true, maxLength: 20 })} 
          >
            {errors.name && errors.name.type === "required" && (
              <ErrorParagraph>This field is required</ErrorParagraph>
            )}
            {errors.name && errors.name.type === "maxLength" && (
              <ErrorParagraph>Your input exceed maximum length.</ErrorParagraph>
            )}
          </HookFormInput>
          <HookFormInput // 닉네임
            type="nickname"
            placeholder="닉네임을 입력하세요"
            errors={errors}
            attributes={register("nickname", { required: true, maxLength: 10 })}
            buttonHandler={onCheckNicknameDuplicated}
            inputRef={nicknameRef}
          >
            {errors.nickname && errors.nickname.type === "required" && (
              <ErrorParagraph>This field is required</ErrorParagraph>
            )}
            {errors.nickname && errors.nickname.type === "maxLength" && (
              <ErrorParagraph>Your input exceed maximum length.</ErrorParagraph>
            )}
            {checkedNickname && (
              <SideAlert open={alertOpened} onClose={onCloseAlert}>
                사용할 수 있는 닉네임입니다!
              </SideAlert>
            )}
          </HookFormInput>
          <HookFormInput // 이메일
            type="email"
            placeholder="이메일을 입력하세요"
            errors={errors}
            attributes={register("email", { required: true, pattern: /^\S+@\S+$/i })}
            buttonHandler={onCheckEmailDuplicated}
            inputRef={emailRef}
          >
            {errors.email && errors.email.type === "required" && (
              <ErrorParagraph>This email field is required.</ErrorParagraph>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <ErrorParagraph>This is an invalid email format.</ErrorParagraph>
            )}
            {checkedEmail && (
              <SideAlert open={alertOpened} onClose={onCloseAlert}>
                사용할 수 있는 이메일입니다!
              </SideAlert>
            )}
          </HookFormInput>
          <HookFormInput // 비밀번호
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
          <HookFormInput // 비밀번호 확인
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            errors={errors}
            attributes={register("password_confirm", {
              required: true,
              validate: (value) => value === passwordRef.current,
            })}
          >
            {errors.password_confirm && errors.password_confirm.type === "required" && (
              <ErrorParagraph>This field is required</ErrorParagraph>
            )}
            {errors.password_confirm && errors.password_confirm.type === "validate" && (
              <ErrorParagraph>The password do not match.</ErrorParagraph>
            )}
          </HookFormInput>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: "0 24px 20px" }}>
        <Button onClick={handleClose}>취소</Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          회원가입
        </Button>
      </DialogActions>
    </form>
  );
};

export default SignupForm;
