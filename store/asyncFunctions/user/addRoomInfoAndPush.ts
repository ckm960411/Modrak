import { createAsyncThunk } from "@reduxjs/toolkit"
import { updateDoc } from "firebase/firestore"
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc"

export const onAddRoomInfoAndPush = createAsyncThunk(
  "ADD_ROOM_INFO_REQUEST",
  async (data: AddRoomInfoDataType) => {
    const response = await addRoomInfoAndPush(data)
    return response
  }
)

const addRoomInfoAndPush = async (data: AddRoomInfoDataType) => {
  const { accommodationId, roomId, uid, datesArray, newPush } = data
  // 예약한 정보를 유저정보에 저장하고, 알림을 보냄
  const newRoomInfoReserved = { accommodationId, roomId, reservedDates: datesArray }
  const { searchedDocRef: userDocRef, searchedData: userData } = await searchFirestoreDoc(`users/${uid}`)
  await updateDoc(userDocRef, { roomReserved: [ ...userData!.roomReserved, newRoomInfoReserved ] })
  // 예약시 사용자에게 알림 보냄
  await updateDoc(userDocRef, { pushUnchecked: [ ...userData!.pushUnchecked, newPush ] })
  // pushes 컬렉션의 사용자 uid 로 된 push 문서에도 알림을 저장 (전체 알림)
  const { searchedDocRef: pushDocRef, searchedData: pushData } = await searchFirestoreDoc(`pushes/${uid}`)
  await updateDoc(pushDocRef, { pushes: [ ...pushData!.pushes, newPush ] })

  return { ...newRoomInfoReserved, newPush }
}

export default addRoomInfoAndPush