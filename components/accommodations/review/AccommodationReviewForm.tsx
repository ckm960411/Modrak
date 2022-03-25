import { FC, useState } from "react";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import InputFileForm from "components/parts/InputFileForm";
import SubmitFormButton from "components/parts/SubmitFormButton";
import TextInput from "components/parts/TextInput";

const AccommodationReviewForm: FC = () => {
  const [reviewText, setReviewText] = useState('')
  const [reviewImage, setReviewImage] = useState<string[]>([])
  const [submitReviewLoading, setSubmitReviewLoading] = useState(false)

  const onChangeReview = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReviewText(e.target.value)
  }

  const onSubmitReview = () => {}

  return (
    <FormContainer>
      <Typography sx={{ fontFamily: 'Katuri' }}>리뷰 남기기!</Typography>
      <ButtonContainer>
        <TextInput value={reviewText} onChange={onChangeReview} />
        <div>
          <InputFileForm label="input-room-review-image" images={reviewImage} setImages={setReviewImage} />
          <SubmitFormButton
            onClick={onSubmitReview}
            sx={{ float: 'right', mt: 1 }}
            loading={submitReviewLoading}
          >
            리뷰 작성하기
          </SubmitFormButton>
        </div>
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