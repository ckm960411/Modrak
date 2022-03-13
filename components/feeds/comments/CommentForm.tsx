import { FC, useState } from "react";
import { Button, CardContent } from "@mui/material";
import TextInput from "components/parts/TextInput";
import SubmitFormButton from "components/parts/SubmitFormButton";

const CommentForm: FC = () => {
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)

  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  }

  return (
    <CardContent>
      <TextInput rows={1} onChange={onChangeComment} />
      <div style={{ textAlign: 'right', marginTop: '8px' }}>
        <Button variant="text">취소</Button>
        <SubmitFormButton
          // onClick={onSubmitFeed}
          sx={{ ml: 1 }}
          loading={loading}
        >
          작성하기
        </SubmitFormButton>
      </div>
    </CardContent>
  )
}

export default CommentForm