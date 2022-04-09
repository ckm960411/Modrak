import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Button, CardContent } from "@mui/material";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { showAlert } from "store/slices/appSlice";
import { onUpdateComment } from "store/asyncFunctions";
import TextInput from "components/parts/TextInput";
import SubmitFormButton from "components/parts/SubmitFormButton";

type CommentEditFormProps = {
  setEditing: Dispatch<SetStateAction<boolean>>
  comment: CommentWithUserInfoType
}

const CommentEditForm: FC<CommentEditFormProps> = ({ setEditing, comment }) => {
  const { commentText, feedId, id: commentId, userUid } = comment
  const [editText, setEditText] = useState('')
  const [editCommentLoading, setEditCommentLoading] = useState(false)

  const dispatch = useAppDispatch()
  const myInfo = useAppSelector(state => state.users.myInfo)

  useEffect(() => {
    setEditText(commentText)
  }, [commentText])

  const handleChangeEditText = (e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)
  const handleCancelEdit = () => setEditing(false)

  const handleSubmitEdit = async () => {
    if (!myInfo)
      return dispatch(showAlert({ isShown: true, message: '로그인 이후에 댓글을 수정해주세요.', seveiry: 'warning' }))
    if (myInfo.uid !== userUid)
      return dispatch(showAlert({ isShown: true, message: '당신의 댓글이 아니면 수정할 수 없습니다!', severity: 'error' }))
    if (editText.trim() === '')
      return dispatch(showAlert({ isShown: true, message: '댓글의 내용을 작성해주세요!', severity: 'warning' }))
    setEditCommentLoading(true)
    dispatch(onUpdateComment({ editText, feedId, commentId })).then(() => {
      dispatch(showAlert({ isShown: true, message: '댓글 수정이 완료되었습니다!' }))
      setEditCommentLoading(false)
      setEditing(false)
    })
  }

  return (
    <CardContent>
      <TextInput 
        value={editText}
        onChange={handleChangeEditText}
        label="수정하기"
        rows={1}
      />
      <div style={{ textAlign: 'right', marginTop: '8px' }}>
        <Button variant="text" size="small" onClick={handleCancelEdit}>취소</Button>
        <SubmitFormButton
          onClick={handleSubmitEdit}
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