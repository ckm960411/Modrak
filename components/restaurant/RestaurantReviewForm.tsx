import { FC, useState } from "react";
import { Card, CardContent, CardHeader, Divider, Typography } from "@mui/material";
import TextInput from "components/parts/TextInput";
import InputFileForm from "components/parts/InputFileForm";
import SubmitFormButton from "components/parts/SubmitFormButton";

const RestaurantReviewForm: FC = () => {
  const [reviewText, setReviewText] = useState('')
  const [reviewImage, setReviewImage] = useState<string[]>([])
  const [submitReviewLoading, setSubmitReviewLoading] = useState(false)

  const onChangeReview = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReviewText(e.target.value)
  }

  const onSubmitReview = () => {

  }

  return (
    <Card raised>
      <CardHeader title={<Typography sx={{ fontFamily: 'Katuri' }}>리뷰 남기기!</Typography>} />
      <Divider />
      <CardContent>
        <div>
          <TextInput value={reviewText} onChange={onChangeReview} />
          <div>
            <InputFileForm label="input-review-image" images={reviewImage} setImages={setReviewImage} />
            <SubmitFormButton
              onClick={onSubmitReview}
              sx={{ float: 'right', mt: 1 }}
              loading={submitReviewLoading}
            >
              리뷰 작성하기
            </SubmitFormButton>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default RestaurantReviewForm