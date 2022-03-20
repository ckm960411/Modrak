import { FC, useState } from "react";
import { Card, CardContent, CardHeader, Divider, Typography } from "@mui/material";
import { v4 as uuid_v4 } from "uuid";
import { useAppSelector } from "store/hooks";
import TextInput from "components/parts/TextInput";
import InputFileForm from "components/parts/InputFileForm";
import SubmitFormButton from "components/parts/SubmitFormButton";
import searchFirestoreDoc from "utils/searchFirestoreDoc";
import { updateDoc } from "firebase/firestore";
import PreviewImagesTab from "components/feeds/PreviewImagesTab";
import uploadImagesDB from "utils/uploadImagesDB";

const RestaurantReviewForm: FC<{restaurantId: string}> = ({ restaurantId }) => {

  const [reviewText, setReviewText] = useState('')
  const [reviewImages, setReviewImages] = useState<string[]>([])
  const [submitReviewLoading, setSubmitReviewLoading] = useState(false)
  const myInfo = useAppSelector(state => state.users.myInfo)

  const onChangeReview = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReviewText(e.target.value)
  }

  const onSubmitReview = async () => {
    if (!myInfo) return alert('로그인 이후에 리뷰를 작성해주세요!')
    if (reviewText.trim() === '') return alert('리뷰 내용을 작성해주세요!')
    setSubmitReviewLoading(true)
    // 이미지배열을 스토리지에 저장하고 저장된 스토리지 경로를 배열로 리턴
    const imagesURLs = await uploadImagesDB(reviewImages, myInfo.uid).catch(err => console.log(err.resultMessage))
    const myReviewData = {
      reviewId: uuid_v4(),
      userUid: myInfo.uid,
      restaurantId,
      reviewText,
      reviewImages: imagesURLs,
      createdAt: Date.now(),
      modifiedAt: Date.now(),
    }
    // review 컬렉션에 리뷰를 다려는 맛집id 로 된 문서에 해당 리뷰 데이터를 저장
    const { searchedDocRef: reviewDocRef, searchedData: reviewData } = await searchFirestoreDoc(`reviews/${restaurantId}`)
    await updateDoc(reviewDocRef, {
      reviews: [ ...reviewData!.reviews, myReviewData ]
    }).then(() => alert('리뷰 작성이 완료됐습니다!'))
    setReviewText('')
    setReviewImages([])
    setSubmitReviewLoading(false)
  }

  return (
    <Card raised>
      <CardHeader title={<Typography sx={{ fontFamily: 'Katuri' }}>리뷰 남기기!</Typography>} />
      <Divider />
      <CardContent>
        <TextInput value={reviewText} onChange={onChangeReview} />
        <div>
          <InputFileForm label="input-review-image" images={reviewImages} setImages={setReviewImages} />
          <SubmitFormButton
            onClick={onSubmitReview}
            sx={{ float: 'right', mt: 1 }}
            loading={submitReviewLoading}
          >
            리뷰 작성하기
          </SubmitFormButton>
        </div>
        {reviewImages[0] && <PreviewImagesTab images={reviewImages} setImages={setReviewImages} />}
      </CardContent>
    </Card>
  )
}

export default RestaurantReviewForm