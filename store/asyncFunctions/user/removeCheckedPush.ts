import { createAsyncThunk } from "@reduxjs/toolkit"
import { updateDoc } from "firebase/firestore"
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc"

export const onRemoveCheckedPush = createAsyncThunk(
  "REMOVE_CHECKED_PUSH",
  async (data: RemoveCheckedPushType) => {
    const pushId = await removeCheckedPush(data)
    return pushId
  }
)

const removeCheckedPush = async (data: RemoveCheckedPushType) => {
  const { uid, pushId } = data
  // 알림 클릭시 확인안된 알림에서 제거
  const { searchedDocRef: userRef, searchedData: userData } = await searchFirestoreDoc(`users/${uid}`)
  const removedPushes = userData!.pushUnchecked.filter((push: PushType) => push.pushId !== pushId)
  await updateDoc(userRef, { pushUnchecked: removedPushes })
  // 알림 클릭시 전체 알림에서 확인 상태로 변경
  const { searchedDocRef: pushDocRef, searchedData: pushData } = await searchFirestoreDoc(`pushes/${uid}`)
  const checkedPush = pushData!.pushes.find((push: PushType) => push.pushId === pushId)
  checkedPush.isChecked = true
  await updateDoc(pushDocRef, { pushes: pushData!.pushes })

  return pushId
}

export default removeCheckedPush