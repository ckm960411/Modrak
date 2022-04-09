import { FC, useState } from "react";
import { CardContent, CardHeader, Divider, Input, Rating, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { showAlert } from "store/slices/appSlice";
import TextInput from "components/parts/TextInput";
import InputFileForm from "components/parts/InputFileForm";
import SubmitFormButton from "components/parts/SubmitFormButton";
import PreviewImagesTab from "components/feeds/PreviewImagesTab";
import { onAddRestaurantReview } from "store/asyncFunctions";

const RestaurantReviewForm: FC<{restaurantId: string}> = ({ restaurantId }) => {
  const [reviewText, setReviewText] = useState('')
  const [reviewImages, setReviewImages] = useState<string[]>([])
  const [rating, setRating] = useState<number | null>(null)
  const [submitReviewLoading, setSubmitReviewLoading] = useState(false)

  const dispatch = useAppDispatch()
  const myInfo = useAppSelector(state => state.users.myInfo)

  const handleChangeReview = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReviewText(e.target.value)
  }

  const handleSubmitReview = async () => {
    if (!myInfo) return dispatch(showAlert({ isShown: true, message: '로그인한 이후에 리뷰를 작성해주세요!', severity: 'error' }))
    if (reviewText.trim() === '') return dispatch(showAlert({ isShown: true, message: '리뷰 내용을 작성해주세요!', severity: 'error' }))
    if (rating === null) return dispatch(showAlert({ isShown: true, message: '평점을 매겨주세요!', severity: 'warning' }))
    setSubmitReviewLoading(true)
    dispatch(onAddRestaurantReview({ 
      uid: myInfo.uid, images: reviewImages,
      restaurantId, reviewText, rating
    })).then(() => {
      dispatch(showAlert({ isShown: true, message: '리뷰 작성이 완료됐습니다!' }))
      setReviewText('')
      setReviewImages([])
      setRating(null)
      setSubmitReviewLoading(false)
    })
  }

  return (
    <>
      <CardHeader title={<Typography sx={{ fontFamily: 'Katuri' }}>리뷰 남기기!</Typography>} />
      <Divider />
      <CardContent>
        <Typography>별점 매기기</Typography>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
          <Rating size="large" precision={0.1} value={rating} onChange={(e, v) => setRating(v)} />
          {rating && <span>({rating})</span>}
        </Stack>
        <TextInput value={reviewText} onChange={handleChangeReview} />
        <div>
          <InputFileForm label="input-review-image" images={reviewImages} setImages={setReviewImages} />
          <SubmitFormButton
            onClick={handleSubmitReview}
            sx={{ float: 'right', mt: 1 }}
            loading={submitReviewLoading}
          >
            리뷰 작성하기
          </SubmitFormButton>
        </div>
        {reviewImages[0] && <PreviewImagesTab images={reviewImages} setImages={setReviewImages} />}
      </CardContent>
    </>
  )
}

export default RestaurantReviewForm