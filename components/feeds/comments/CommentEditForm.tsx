import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Button, CardContent } from "@mui/material";
import TextInput from "components/parts/TextInput";
import SubmitFormButton from "components/parts/SubmitFormButton";

type CommentEditFormProps = {
  setEditing: Dispatch<SetStateAction<boolean>>
  commentText: string
}

const CommentEditForm: FC<CommentEditFormProps> = ({ setEditing, commentText }) => {
  const [editText, setEditText] = useState('')
  const [editCommentLoading, setEditCommentLoading] = useState(false)

  useEffect(() => {
    setEditText(commentText)
  }, [commentText])

  const onChangeEditText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value)
  }

  const onCancelEdit = () => {
    setEditing(false)
  }

  const onSubmitEdit = () => {

    const editData = {
      editText,
      modifiedAt: Date.now()
    }
    console.log('editData: ', editData)
    setEditing(false)
  }

  return (
    <CardContent>
      <TextInput 
        value={editText}
        onChange={onChangeEditText}
        label="수정하기"
        rows={1}
      />
      <div style={{ textAlign: 'right', marginTop: '8px' }}>
        <Button variant="text" size="small" onClick={onCancelEdit}>취소</Button>
        <SubmitFormButton
          onClick={onSubmitEdit}
          icon={false}
          size="small"
          loading={editCommentLoading}
        >
          수정 완료
        </SubmitFormButton>
      </div>
    </CardContent>
  )
}

export default CommentEditForm