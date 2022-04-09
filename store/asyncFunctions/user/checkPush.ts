import { createAsyncThunk } from "@reduxjs/toolkit"
import { updateDoc } from "firebase/firestore"
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc"

export const onCheckPush = createAsyncThunk(
  "CHECK_PUSH_REQUEST",
  async (data: RemoveCheckedPushType) => {
    const pushId = await checkPush(data)
    return pushId
  }
)

const checkPush = async (data: RemoveCheckedPushType) => {
  const { uid, pushId } = data
  // 전체 알림 목록에서 확인안 된 알림 클릭시 확인됨으로 처리
  const { searchedDocRef: pushDocRef, searchedData: pushData } = await searchFirestoreDoc(`pushes/${uid}`)
  const pushFinded = pushData!.pushes.find((push: PushType) => push.pushId === pushId)
  pushFinded.isChecked = true
  await updateDoc(pushDocRef, { pushes: pushData!.pushes })
  // 알림 클릭시 확인안된 알림에서 제거
  const { searchedDocRef: userRef, searchedData: userData } = await searchFirestoreDoc(`users/${uid}`)
  const removedPushes = userData!.pushUnchecked.filter((push: PushType) => push.pushId !== pushId)
  await updateDoc(userRef, { pushUnchecked: removedPushes })

  return pushId
}

export default checkPush