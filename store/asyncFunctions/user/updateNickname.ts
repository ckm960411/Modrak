import { createAsyncThunk } from "@reduxjs/toolkit"
import { doc, updateDoc } from "firebase/firestore"
import { dbService } from "fireBaseApp/fBase"

export const onUpdateNickname = createAsyncThunk(
  "UPDATE_NICKNAME_REQUEST",
  async (data: UpdateNicknameData) => {
    const checkedNickname = await updateNickname(data)
    return checkedNickname
  }
)

const updateNickname = async (data: UpdateNicknameData) => {
  const { uid, nickname } = data
  const userRef = doc(dbService, `users/${uid}`)
  await updateDoc(userRef, { nickname })

  return nickname
}

export default updateNickname