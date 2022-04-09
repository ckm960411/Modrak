import { FC, useState } from "react";
import styled from "@emotion/styled";
import { Rating, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { showAlert } from "store/slices/appSlice";
import { onAddRoomReview } from "store/asyncFunctions";
import InputFileForm from "components/parts/InputFileForm";
import SubmitFormButton from "components/parts/SubmitFormButton";
import TextInput from "components/parts/TextInput";
import PreviewImagesTab from "components/feeds/PreviewImagesTab";

const AccommodationReviewForm: FC = () => {
  const [reviewText, setReviewText] = useState('')
  const [reviewImages, setReviewImages] = useState<string[]>([])
  const [rating, setRating] = useState<number | null>(null)
  const [submitReviewLoading, setSubmitReviewLoading] = useState(false)

  const dispatch = useAppDispatch()
  const myInfo = useAppSelector(state => state.users.myInfo)
  const roomData = useAppSelector(state => state.rooms.roomData)
  
  if (!roomData) return <div>Loading...</div>
  const { id: accommodationId } = roomData

  const handleChangeReview = (e: React.ChangeEvent<HTMLInputElement>) => setReviewText(e.target.value)

  const handleSubmitReview = async () => {
    if (!myInfo) return dispatch(showAlert({ isShown: true, message: '로그인 이후에 리뷰를 작성해주세요!', severity: 'error' }))
    if (reviewText.trim() === '') return dispatch(showAlert({ isShown: true, message: '리뷰 내용을 작성해주세요!', severity: 'error' }))
    if (rating === null) return dispatch(showAlert({ isShown: true, message: '평점을 매겨주세요!', severity: 'error' }))
    setSubmitReviewLoading(true)
    dispatch(onAddRoomReview({
      uid: myInfo.uid, accommodationId, reviewText, images: reviewImages, rating
    })).then(() => {
      dispatch(showAlert({ isShown: true, message: "리뷰 작성이 완료됐습니다!" }))
      setReviewText('')
      setReviewImages([])
      setRating(null)
      setSubmitReviewLoading(false)
    })
  }

  return (
    <FormContainer>
      <Typography sx={{ fontFamily: 'Katuri' }}>리뷰 남기기!</Typography>
      <ButtonContainer>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
          <Rating size="large" precision={0.1} value={rating} onChange={(e, v) => setRating(v)} />
          {rating && <span>({rating})</span>}
        </Stack>
        <TextInput value={reviewText} onChange={handleChangeReview} />
        <div>
          <InputFileForm label="input-room-review-image" images={reviewImages} setImages={setReviewImages} />
          <SubmitFormButton
            onClick={handleSubmitReview}
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