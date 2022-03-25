import { FC, Dispatch, SetStateAction, useState, useEffect } from "react";
import { Alert, CardContent, Dialog, Rating, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "store/hooks";
import TextInput from "components/parts/TextInput";
import InputFileForm from "components/parts/InputFileForm";
import SubmitFormButton from "components/parts/SubmitFormButton";
import MainButton from "components/parts/MainButton";
import PreviewImagesTab from "components/feeds/PreviewImagesTab";
import uploadImagesDB from "utils/functions/uploadImagesDB";
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc";
import { updateDoc } from "firebase/firestore";
import { updateRoomReview } from "store/slices/roomsSlice";

type AccommodationEditReviewFormProps = {
  reviewData: RoomReviewWithUserInfo
  editing: boolean
  setEditing: Dispatch<SetStateAction<boolean>>
}
const AccommodationEditReviewForm: FC<AccommodationEditReviewFormProps> = ({ reviewData, editing, setEditing }) => {
  const [editText, setEditText] = useState<string>('')
  const [newImages, setNewImages] = useState<string[]>([])
  const [newRating, setNewRating] = useState<number | null>(null)
  const [editReviewError, setEditReviewError] = useState<string>('')
  const [editReviewLoading, setEditReviewLoading] = useState(false)

  const dispatch = useAppDispatch()
  const myInfo = useAppSelector(state => state.users.myInfo)

  const { reviewId, reviewText, reviewImages, rating, roomId, userUid } = reviewData

  useEffect(() => {
    setNewImages(reviewImages)
    setEditText(reviewText)
    setNewRating(rating)
  }, [reviewText, reviewImages, rating])

  const onChangeEditText = (e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)

  const onCloseEditing = () => {
    setEditing(false)
    setNewImages(reviewImages)
  }

  const onSubmit = async () => {
    if (editText.trim() === '') 
      return setEditReviewError("피드의 내용을 작성해주세요!")
    if (!myInfo) 
      return alert("로그인한 이후에 피드를 수정해주세요.")
    if (myInfo.uid !== userUid) 
      return alert("당신의 피드가 아닌 글은 수정할 수 없습니다!")
    setEditReviewLoading(true)
    const shouldUpload = newImages.filter(img => img.startsWith('data:image'))
    const shouldNotUpload = newImages.filter(img => !img.startsWith('data:image'))
    const newImagesURLs = await uploadImagesDB(shouldUpload, myInfo.uid).catch(err => console.log(err))
    const data = {
      reviewText: editText,
      reviewImages: [...shouldNotUpload, ...newImagesURLs!],
      rating: newRating,
      reviewId,
      modifiedAt: Date.now(),
    }
    const { searchedDocRef: reviewDocRef, searchedData: reviewData } = await searchFirestoreDoc(`reviews/${roomId}`)
    const reviewsArray = reviewData!.reviews
    const reviewIndex = reviewsArray.findIndex((review: RoomReviewType) => review.reviewId === reviewId)
    reviewsArray[reviewIndex].reviewText = data.reviewText
    reviewsArray[reviewIndex].modifiedAt = data.modifiedAt
    reviewsArray[reviewIndex].reviewImages = data.reviewImages
    reviewsArray[reviewIndex].rating = data.rating

    await updateDoc(reviewDocRef, { reviews: reviewsArray })
    dispatch(updateRoomReview(data))
    alert('리뷰 수정이 완료되었습니다!')
    setEditReviewLoading(false)
    setEditing(false)
  }

  return (
    <Dialog
      open={editing}
      onClose={onCloseEditing}
      fullWidth
    >
      <CardContent>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
          <Rating size="large" precision={0.1} value={newRating} onChange={(e, v) => setNewRating(v)} />
          <span>({newRating})</span>
        </Stack>
        <TextInput 
          value={editText}
          onChange={onChangeEditText}
        />
        <div>
          <InputFileForm label="edit-room-review-file" images={newImages} setImages={setNewImages} />
          <SubmitFormButton onClick={onSubmit} sx={{ float: 'right', mt: 1 }} loading={editReviewLoading}>
            Edit Feed
          </SubmitFormButton>
          <MainButton variant="outlined" sx={{ float: 'right', mt: 1, mr: 1 }} onClick={onCloseEditing}>
            cancel
          </MainButton>
        </div>
        { editReviewError !== '' && (
          <Alert
            severity="warning" 
            onClose={() => setEditReviewError('')}
            sx={{ marginTop: 2 }}
          >
            <>리뷰의 내용을 작성해주세요!</>
          </Alert>
        )}
      </CardContent>
      {newImages[0] && <PreviewImagesTab images={newImages} setImages={setNewImages} />}
    </Dialog>
  )
}

export default AccommodationEditReviewForm