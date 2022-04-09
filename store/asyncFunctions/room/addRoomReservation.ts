import { createAsyncThunk } from "@reduxjs/toolkit"
import { updateDoc } from "firebase/firestore"
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc"

export const onAddRoomReservation = createAsyncThunk(
  "ADD_ROOM_RESERVATION",
  async (data: RoomReservationType) => {
    const reservationData = await addRoomReservation(data)
    return reservationData
  }
)

const addRoomReservation = async (data: RoomReservationType) => {
  const { accommodationId, roomId, datesArray } = data
  const { searchedDocRef: accDocRef, searchedData: accData } = await searchFirestoreDoc(`accommodations/${accommodationId}`)
  const findedRoom = accData!.rooms.find((room: RoomType) => room.roomId === roomId)
  findedRoom.reservedDates = [ ...findedRoom.reservedDates, ...datesArray]
  await updateDoc(accDocRef, { rooms: accData!.rooms })

  return { roomId, newReservedDates: datesArray }
}

export default addRoomReservation