import { FC, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { authService, dbService } from "fireBaseApp/fBase"
import { Button, DialogActions, DialogContent, Stack } from "@mui/material";
import styled from "@emotion/styled";
import { red } from "@mui/material/colors";
import { useAppDispatch } from "store/hooks";
import { showAlert } from "store/slices/appSlice";
import onCheckDuplicate from "utils/functions/onCheckDuplicate";
import HookFormInput from "components/login/HookFormInput";
import SubmitFormButton from "components/parts/SubmitFormButton";

const ErrorParagraph = styled.span`
  color: ${red[500]};
`;

const SignupForm: FC<{handleClose: () => void}> = ({ handleClose }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [checkedNickname, setCheckedNickname] = useState('')
  const [checkedEmail, setCheckedEmail] = useState('')
  const [signupLoading, setSignupLoading] = useState(false)

  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignUpFormValue>()

  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch("password")!;
  const nicknameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  
  const onCheckNicknameDuplicated = async () => { // 닉네임 중복 체크
    const duplicatedNickname = await onCheckDuplicate("nickname", nicknameRef.current!.value)
    if (duplicatedNickname) return dispatch(showAlert({ isShown: true, message: "중복된 닉네임입니다!", severity: 'warning' }))
    dispatch(showAlert({ isShown: true, message: "사용할 수 있는 닉네임입니다!" }))
    setCheckedNickname(nicknameRef.current!.value)
  }
  const onCheckEmailDuplicated = async () => { // 이메일 중복 체크
    const duplicatedEmail = await onCheckDuplicate("email", emailRef.current!.value.toLowerCase())
    if (duplicatedEmail) return dispatch(showAlert({ isShown: true, message: "중복된 이메일입니다!", severity: 'warning' }))
    if(!(/^\S+@\S+$/i).test(watch("email"))) return dispatch(showAlert({ isShown: true, message: "이메일 형식이 맞지 않습니다!!", severity: 'warning' }))
    dispatch(showAlert({ isShown: true, message: "사용할 수 있는 이메일입니다!" }))
    setCheckedEmail(emailRef.current!.value)
  }

  const onSubmit: SubmitHandler<SignUpFormValue> = (data) => {
    const { email, name, nickname, password } = data
    if (!Boolean(checkedNickname) || checkedNickname !== nicknameRef.current!.value) 
      return dispatch(showAlert({ isShown: true, message: '닉네임 중복 체크를 완료해주세요!', severity: 'error' }))
      if (!Boolean(checkedEmail) || checkedEmail !== emailRef.current!.value)
      return dispatch(showAlert({ isShown: true, message: '이메일 중복 체크를 완료해주세요!', severity: 'error' }))
    // 신규 사용자 계정 생성
    setSignupLoading(true)
    createUserWithEmailAndPassword(authService, email, password)
      .then( async() => {
        const newUserObj = {
          uid: authService.currentUser!.uid,
          email: authService.currentUser!.email,
          name: name,
          nickname: nickname,
          profileImg: null,
          followers: [],
          followersCount: 0,
          followings: [],
          followingsCount: 0,
          feeds: [],
          likeFeeds: [],
          bookmarkFeeds: [],
          bookmarkRestaurants: [],
          bookmarkAccommodations: [],
          pushUnchecked: [],
          roomReserved: [],
          recommendRestaurants: [],
        }
        // 사용자 정보를 "users" 컬렉션에 uid 로 생성
        const usersCollection = collection(dbService, "users")
        await setDoc(doc(usersCollection, `${newUserObj.uid}`), newUserObj)
        // pushes 컬렉션에 사용자 uid 로 된 문서를 생성
        const pushesCollection = collection(dbService, "pushes")
        await setDoc(doc(pushesCollection, `${newUserObj.uid}`), { pushes: [] })
          .then(() => dispatch(showAlert({ isShown: true, message: '회원가입이 완료됐습니다!' })))
      })
      .catch(err => console.log(err.resultMessage))
      .finally(() => {
        setSignupLoading(false)
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
        <SubmitFormButton loading={signupLoading} onClick={handleSubmit(onSubmit)}>
          회원가입
        </SubmitFormButton>
      </DialogActions>
    </form>
  );
};

export default SignupForm;
