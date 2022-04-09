import { FC, useState } from "react";
import { Button, CardContent } from "@mui/material";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { showAlert } from "store/slices/appSlice";
import { onAddComment } from "store/asyncFunctions";
import TextInput from "components/parts/TextInput";
import SubmitFormButton from "components/parts/SubmitFormButton";

const CommentForm: FC<{feedId: string}> = ({ feedId }) => {
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const myInfo = useAppSelector(state => state.users.myInfo)

  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  }

  const onSubmitComment = async () => {
    if (!myInfo) return dispatch(showAlert({ isShown: true, message: '로그인 이후에 댓글을 작성해주세요!', severity: 'error' }))
    if (comment.trim() === '') return dispatch(showAlert({ isShown: true, message: '댓글 내용을 작성해주세요!', severity: 'error' }))
    setLoading(true)
    dispatch(onAddComment({ feedId, comment, uid: myInfo.uid })).then(() => {
      dispatch(showAlert({ isShown: true, message: "댓글이 작성되었습니다!" }))
      setComment('')
      setLoading(false)
    })
  }

  return (
    <CardContent>
      <TextInput rows={1} value={comment} onChange={onChangeComment} />
      <div style={{ textAlign: 'right', marginTop: '8px' }}>
        <Button variant="text">취소</Button>
        <SubmitFormButton
          onClick={onSubmitComment}
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