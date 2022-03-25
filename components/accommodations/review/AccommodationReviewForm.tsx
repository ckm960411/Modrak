import { FC, useState } from "react";
import styled from "@emotion/styled";
import { v4 as uuid_v4 } from "uuid";
import { Rating, Stack, Typography } from "@mui/material";
import InputFileForm from "components/parts/InputFileForm";
import SubmitFormButton from "components/parts/SubmitFormButton";
import TextInput from "components/parts/TextInput";
import PreviewImagesTab from "components/feeds/PreviewImagesTab";
import { useAppDispatch, useAppSelector } from "store/hooks";
import uploadImagesDB from "utils/functions/uploadImagesDB";
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc";
import { updateDoc } from "firebase/firestore";
import { addRoomReview } from "store/slices/roomsSlice";

const AccommodationReviewForm: FC = () => {
  const [reviewText, setReviewText] = useState('')
  const [reviewImages, setReviewImages] = useState<string[]>([])
  const [rating, setRating] = useState<number | null>(null)
  const [submitReviewLoading, setSubmitReviewLoading] = useState(false)

  const dispatch = useAppDispatch()
  const myInfo = useAppSelector(state => state.users.myInfo)
  const roomData = useAppSelector(state => state.rooms.roomData)
  
  if (!roomData) return <div>Loading...</div>
  const { id: roomId } = roomData

  const onChangeReview = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReviewText(e.target.value)
  }

  const onSubmitReview = async () => {
    if (!myInfo) return alert('로그인 이후에 리뷰를 작성해주세요!')
    if (reviewText.trim() === '') return alert('리뷰 내용을 작성해주세요!')
    if (rating === null) return alert('평점을 매겨주세요!')
    setSubmitReviewLoading(true)
    // 이미지배열을 스토리지에 저장하고 저장된 스토리지 경로를 배열로 리턴
    const imagesURLs = await uploadImagesDB(reviewImages, myInfo.uid).catch(err => console.log(err.resultMessage))
    const myReviewData = {
      reviewId: uuid_v4(),
      userUid: myInfo.uid,
      roomId,
      reviewText,
      reviewImages: imagesURLs,
      rating,
      createdAt: Date.now(),
      modifiedAt: Date.now(),
    }
    // review 컬렉션에 리뷰를 다려는 숙소id 로 된 문서에 해당 리뷰 데이터를 저장
    const { searchedDocRef: reviewDocRef, searchedData: reviewData } = await searchFirestoreDoc(`reviews/${roomId}`)
    await updateDoc(reviewDocRef, {
      reviews: [ ...reviewData!.reviews, myReviewData ]
    }).then(() => alert('리뷰 작성이 완료됐습니다!'))
    dispatch(addRoomReview({
      ...myReviewData,
      nickname: myInfo.nickname,
      profileImg: myInfo.profileImg,
    }))
    setReviewText('')
    setReviewImages([])
    setRating(null)
    setSubmitReviewLoading(false)
  }

  return (
    <FormContainer>
      <Typography sx={{ fontFamily: 'Katuri' }}>리뷰 남기기!</Typography>
      <ButtonContainer>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
          <Rating size="large" precision={0.1} value={rating} onChange={(e, v) => setRating(v)} />
          {rating && <span>({rating})</span>}
        </Stack>
        <TextInput value={reviewText} onChange={onChangeReview} />
        <div>
          <InputFileForm label="input-room-review-image" images={reviewImages} setImages={setReviewImages} />
          <SubmitFormButton
            onClick={onSubmitReview}
            sx={{ float: 'right', mt: 1 }}
            loading={submitReviewLoading}
          >
            리뷰 작성하기
          </SubmitFormButton>
        </div>
        {reviewImages[0] && <PreviewImagesTab images={reviewImages} setImages={setReviewImages} />}
      </ButtonContainer>
    </FormContainer>
  )
}

const FormContainer = styled.div`
  margin-bottom: 16px;
`
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`

export default AccommodationReviewForm