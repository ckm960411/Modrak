import { createAsyncThunk } from "@reduxjs/toolkit"
import { doc, updateDoc } from "firebase/firestore"
import { dbService } from "fireBaseApp/fBase"
import uploadImagesDB from "utils/functions/uploadImagesDB"

export const onUpdateProfileImg = createAsyncThunk(
  "UPDATE_PROFILEIMG_REQUEST",
  async (data: UpdateProfileImgData) => {
    const newProfileImg = await updateProfileImg(data)
    return newProfileImg
  }
)

const updateProfileImg = async (data: UpdateProfileImgData) => {
  const { uid, newProfileImg } = data
  const userRef = doc(dbService, `users/${uid}`)
  if (newProfileImg) { // 새로운 프로필 사진을 첨부했을 때
    const profileImgUrl = await uploadImagesDB([ newProfileImg ], uid)
    await updateDoc(userRef, { profileImg: profileImgUrl[0] })
    return profileImgUrl[0]
  } else { // 프로필 사진을 지웠을 때
    await updateDoc(userRef, { profileImg: null })
    return null
  }
}

export default updateProfileImg