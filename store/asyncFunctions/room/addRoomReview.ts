import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateDoc } from "firebase/firestore";
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc";
import uploadImagesDB from "utils/functions/uploadImagesDB"
import { v4 as uuid_v4 } from "uuid";

export const onAddRoomReview = createAsyncThunk(
  "ADD_ROOM_REVIEW",
  async (data: RoomReviewData) => {
    const reviewData = await addRoomReview(data)
    return reviewData
  }
)

const addRoomReview = async (data: RoomReviewData) => {
  const { uid, accommodationId, reviewText, images, rating } = data
  // 이미지배열을 스토리지에 저장하고 저장된 스토리지 경로를 배열로 리턴
  const imagesURLs = await uploadImagesDB(images, uid)
  const myReviewData = {
    reviewId: uuid_v4(),
    userUid: uid,
    accommodationId,
    reviewText,
    reviewImages: imagesURLs,
    rating,
    createdAt: Date.now(),
    modifiedAt: Date.now(),
  }
  // review 컬렉션에 리뷰를 다려는 숙소id 로 된 문서에 해당 리뷰 데이터를 저장
  const { searchedData: userData } = await searchFirestoreDoc(`users/${uid}`)
  const { searchedDocRef: reviewDocRef, searchedData: reviewData } = await searchFirestoreDoc(`reviews/${accommodationId}`)
  await updateDoc(reviewDocRef, {
    reviews: [ ...reviewData!.reviews, myReviewData ]
  })

  return {
    ...myReviewData,
    nickname: userData!.nickname,
    profileImg: userData!.profileImg,
  }
}

export default addRoomReview