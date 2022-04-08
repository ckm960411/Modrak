import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Button, CardContent } from "@mui/material";
import { updateDoc } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { updateComment } from "store/slices/feedsSlice";
import { showAlert } from "store/slices/appSlice";
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc";
import TextInput from "components/parts/TextInput";
import SubmitFormButton from "components/parts/SubmitFormButton";

type CommentEditFormProps = {
  setEditing: Dispatch<SetStateAction<boolean>>
  comment: CommentWithUserInfoType
}

const CommentEditForm: FC<CommentEditFormProps> = ({ setEditing, comment }) => {
  const { commentText, feedId, id, userUid } = comment
  const [editText, setEditText] = useState('')
  const [editCommentLoading, setEditCommentLoading] = useState(false)

  const dispatch = useAppDispatch()
  const myInfo = useAppSelector(state => state.users.myInfo)

  useEffect(() => {
    setEditText(commentText)
  }, [commentText])

  const onChangeEditText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value)
  }

  const onCancelEdit = () => {
    setEditing(false)
  }

  const onSubmitEdit = async () => {
    if (!myInfo)
      return dispatch(showAlert({ isShown: true, message: '로그인 이후에 댓글을 수정해주세요.', seveiry: 'warning' }))
    if (myInfo.uid !== userUid)
      return dispatch(showAlert({ isShown: true, message: '당신의 댓글이 아니면 수정할 수 없습니다!', severity: 'error' }))
    if (editText.trim() === '')
      return dispatch(showAlert({ isShown: true, message: '댓글의 내용을 작성해주세요!', severity: 'warning' }))
    setEditCommentLoading(true)

    const editData = {
      editText, feedId, commentId: id,
      modifiedAt: Date.now()
    }
    const { 
      searchedDocRef: commentsDocRef,
      searchedData: commentsData
    } = await searchFirestoreDoc(`comments/${feedId}`)
    const commentsArray = commentsData!.comments
    const commentIndex = commentsArray.findIndex((comment: CommentType) => comment.id === id)
    commentsArray[commentIndex].commentText = editText
    commentsArray[commentIndex].modifiedAt = Date.now()

    await updateDoc(commentsDocRef, { comments: commentsArray })
    dispatch(updateComment(editData))

    setEditCommentLoading(false)
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