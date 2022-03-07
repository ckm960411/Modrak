// 회원가입 시 입력할 값들 타입
declare type SignUpFormValue = {
  name: string;
  nickname: string;
  email: string;
  password: string;
  password_confirm: string;
}
// 로그인 시 입력할 값들 타입
declare type LoginFormValue = {
  email: string;
  password: string;
}

// 회원가입 시 중복체크 타입
declare type DuplicateCheck = "nickname" | "email"