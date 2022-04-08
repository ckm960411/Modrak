import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Avatar, Button, CardContent, CardHeader, Dialog, IconButton, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { updateDoc } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { updateNickname, updateProfileImg } from "store/slices/usersSlice";
import { updateUserNickname, updateUserProfileImg } from "store/slices/profileSlice";
import { showAlert } from "store/slices/appSlice";
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc";
import uploadImagesDB from "utils/functions/uploadImagesDB";
import onCheckDuplicate from "utils/functions/onCheckDuplicate";
import defaultImg from "public/imgs/profileImg.png"

interface EditProfileProps {
  editing: boolean
  setEditing: Dispatch<SetStateAction<boolean>>
}
const EditProfile: FC<EditProfileProps> = ({ editing, setEditing }) => {
  const [newProfileImg, setNewProfileImg] = useState('')
  const [newNickname, setNewNickname] = useState('')
  const [checkedNickname, setCheckedNickname] = useState('')
  
  const dispatch = useAppDispatch()
  const myInfo = useAppSelector(state => state.users.myInfo!)
  const { nickname, profileImg } = myInfo
  
  useEffect(() => {
    if (profileImg) setNewProfileImg(profileImg)
    setNewNickname(nickname)
  }, [profileImg, nickname])

  // 프로필 사진 첨부
  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!
    if (!files[0]) return
    if (/\.(jpe?g|png|gif)$/i.test(files[0].name)) {
      const reader = new FileReader()
      reader.onload = () => setNewProfileImg(reader.result as string)
      reader.readAsDataURL(files[0])
    }
  }
  // 프로필 사진 삭제
  const onDeleteImg = () => setNewProfileImg('')

  // 닉네임 변경
  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.target.value)
  }

  // 프로필 수정 수정 취소
  const onCloseEditing = () => setEditing(false)

  // 닉네임 중복 체크
  const onCheckNicknameDuplicate = async () => {
    const duplicatedNickname = await onCheckDuplicate("nickname", newNickname.trim())
    if (duplicatedNickname) return dispatch(showAlert({ isShown: true, message: '중복된 닉네임입니다!', severity: 'warning' }))
    dispatch(showAlert({ isShown: true, message: '사용할 수 있는 닉네임입니다!' }))
    setCheckedNickname(newNickname.trim())
  }

  // 프로필 수정 제출
  const onSubmitEditingProfile = async () => {
    if (profileImg === newProfileImg && nickname === newNickname.trim()) return onCloseEditing()
    const { searchedDocRef: userRef } = await searchFirestoreDoc(`users/${myInfo.uid}`)
    // 닉네임 변경
    if (nickname !== newNickname.trim()) {
      if (!Boolean(checkedNickname) || checkedNickname !== newNickname.trim()) 
        return dispatch(showAlert({ isShown: true, message: '닉네임 중복 체크를 완료해주세요!', severity: 'error' }))
      const ok = window.confirm('프로필 수정을 완료하시겠습니까?')
      if (!ok) return
      await updateDoc(userRef, { nickname: checkedNickname })
      dispatch(updateNickname({ newNickname: checkedNickname }))
      dispatch(updateUserNickname({ newNickname: checkedNickname }))
    }
    // 프로필 사진 변경
    if (profileImg !== newProfileImg) {
      if (newProfileImg === '') { // 프로필 사진을 지웠을 시
        await updateDoc(userRef, { profileImg: null })
        dispatch(updateProfileImg({ newProfileImg: null }))
        dispatch(updateUserProfileImg({ newProfileImg: null }))
      } else { // 새 프로필 사진 첨부시
        const profileImgUrl = await uploadImagesDB([ newProfileImg ], myInfo.uid)
        await updateDoc(userRef, { profileImg: profileImgUrl[0] })
        dispatch(updateProfileImg({ newProfileImg: profileImgUrl }))
        dispatch(updateUserProfileImg({ newProfileImg: profileImgUrl }))
      }
    }
    onCloseEditing()
  }

  return (
    <Dialog
      open={editing}
      onClose={onCloseEditing}
      fullWidth
    >
      <CardHeader title={<Typography sx={{ fontFamily: 'Katuri' }}>프로필 수정하기</Typography>} />
      <ProfileImgContainer>
        <ProfileImgWrapper>
          <Avatar 
            alt={nickname}
            src={newProfileImg ? newProfileImg : defaultImg.src}
            sx={{ width: 160, height: 160, m: '0 auto' }}
          />
          <CloseBtn size="small" onClick={onDeleteImg}>
            <CloseIcon />
          </CloseBtn>
        </ProfileImgWrapper>
        <label id="edit-profile-input">
          <Input accept="image/*" id="edit-profile-input" type="file" onChange={handleChangeImg} />
          <Button startIcon={<PhotoCameraIcon />} component="div" sx={{ mt: 1 }}>
            프로필 사진 첨부하기
          </Button>
        </label>
      </ProfileImgContainer>
      <CardContent>
        <TextForm>
          <TextField label="닉네임" size="small" fullWidth 
            value={newNickname}
            onChange={handleChangeNickname}
          />
          <DuplicateBtn size="small" variant="outlined" onClick={onCheckNicknameDuplicate}>
            중복 확인
          </DuplicateBtn>
        </TextForm>
      </CardContent>
      <BtnBox>
        <Button size="small" onClick={onCloseEditing}>
          닫기
        </Button>
        <Button variant="contained" size="small" onClick={onSubmitEditingProfile} >
          수정하기
        </Button>
      </BtnBox>
    </Dialog>
  )
}

const ProfileImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ProfileImgWrapper = styled.div`
  position: relative;
`
const CloseBtn = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
`
const Input = styled.input`
  display: none;
`
const TextForm = styled.div`
  display: flex;
`
const DuplicateBtn = styled(Button)`
  margin-left: 8px;
  box-sizing: content-box;
  padding: 3px;
`
const BtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 0 16px 16px;
`

export default EditProfile