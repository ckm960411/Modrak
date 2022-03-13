import { FC, useState } from "react";
import { Button, CardContent } from "@mui/material";
import TextInput from "components/parts/TextInput";
import SubmitFormButton from "components/parts/SubmitFormButton";
import { useAppSelector } from "store/hooks";
import { updateDoc } from "firebase/firestore";
import searchFirestoreDoc from "utils/searchFirestoreDoc";

const CommentForm: FC<{feedId: string}> = ({ feedId }) => {
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const myInfo = useAppSelector(state => state.users.myInfo)

  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  }

  const onSubmitComment = async () => {
    if (!myInfo) return alert('로그인 이후에 댓글을 작성해주세요!')
    if (comment.trim() === '') return alert('댓글 내용을 작성해주세요!')
    setLoading(true)
    const commentData = {
      userUid: myInfo.uid,
      feedId: feedId,
      commentText: comment,
      createdAt: Date.now(),
      modifiedAt: Date.now(),
    }
    // comments 컬렉션에 댓글을 다려는 피드id 로 된 문서에 해당 댓글 데이터를 저장
    const { searchedDocRef, searchedData } = await searchFirestoreDoc(`comments/${feedId}`)
    await updateDoc(searchedDocRef, {
      comments: [ ...searchedData!.comments, commentData ]
    })
    setComment('')
    setLoading(false)
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