import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Alert, CardContent, Dialog, Rating, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { showAlert } from "store/slices/appSlice";
import { onUpdateRestaurantReview } from "store/asyncFunctions";
import TextInput from "components/parts/TextInput";
import InputFileForm from "components/parts/InputFileForm";
import SubmitFormButton from "components/parts/SubmitFormButton";
import MainButton from "components/parts/MainButton";
import PreviewImagesTab from "components/feeds/PreviewImagesTab";

interface RestaurantEditReviewFormProps {
  reviewData: RestaurantReviewWithUserInfo
  editing: boolean
  setEditing: Dispatch<SetStateAction<boolean>>
}
const RestaurantEditReviewForm: FC<RestaurantEditReviewFormProps> = ({ reviewData, editing, setEditing }) => {
  const [editText, setEditText] = useState<string>('')
  const [newImages, setNewImages] = useState<string[]>([])
  const [newRating, setNewRating] = useState<number | null>(null)
  const [editReviewError, setEditReviewError] = useState<string>('')
  const [editReviewLoading, setEditReviewLoading] = useState(false)

  const dispatch = useAppDispatch()
  const myInfo = useAppSelector(state => state.users.myInfo)

  const { reviewId, reviewText, reviewImages, rating, restaurantId, userUid } = reviewData

  useEffect(() => {
    setNewImages(reviewImages)
    setEditText(reviewText)
    setNewRating(rating)
  }, [reviewText, reviewImages, rating])

  const handleChangeEditText = (e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)

  const handleCloseEditing = () => {
    setEditing(false)
    setNewImages(reviewImages)
  }

  const handleSubmit = async () => {
    if (editText.trim() === '') 
      return setEditReviewError("리뷰의 내용을 작성해주세요!")
    if (!myInfo) 
      return dispatch(showAlert({ isShown: true, message: '로그인한 이후에 리뷰를 수정해주세요!', severity: 'error' }))
    if (myInfo.uid !== userUid) 
      return dispatch(showAlert({ isShown: true, message: '당신의 리뷰가 아니면 수정할 수 없습니다!', severity: 'error' }))
    setEditReviewLoading(true)
    dispatch(onUpdateRestaurantReview({ 
      uid: myInfo.uid, images: newImages, reviewText: editText, rating: newRating!, restaurantId, reviewId,
    })).then(() => {
      dispatch(showAlert({ isShown: true, message: '리뷰 수정이 완료됐습니다!' }))
      setEditReviewLoading(false)
      setEditing(false)
    })
  }

  return (
    <Dialog
      open={editing}
      onClose={handleCloseEditing}
      fullWidth
    >
      <CardContent>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
          <Rating size="large" precision={0.1} value={newRating} onChange={(e, v) => setNewRating(v)} />
          <span>({newRating})</span>
        </Stack>
        <TextInput value={editText} onChange={handleChangeEditText} />
        <div>
          <InputFileForm label="edit-review-file" images={newImages} setImages={setNewImages} />
          <SubmitFormButton onClick={handleSubmit} sx={{ float: 'right', mt: 1 }} loading={editReviewLoading}>
            Edit Feed
          </SubmitFormButton>
          <MainButton variant="outlined" sx={{ float: 'right', mt: 1, mr: 1 }} onClick={handleCloseEditing}>
            cancel
          </MainButton>
        </div>
        { editReviewError !== '' && (
          <Alert severity="warning" onClose={() => setEditReviewError('')} sx={{ mt: 2 }}>
            <>리뷰의 내용을 작성해주세요!</>
          </Alert>
        )}
      </CardContent>
      {newImages[0] && <PreviewImagesTab images={newImages} setImages={setNewImages} />}
    </Dialog>
  )
}

export default RestaurantEditReviewForm