import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateDoc } from "firebase/firestore";
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc";
import { v4 as uuid_v4 } from "uuid";

export const onAddComment = createAsyncThunk(
  "ADD_COMMENT_REQUEST",
  async (data: AddCommentDataType) => {
    const commentData = await addComment(data)
    return commentData
  }
)

const addComment = async (data: AddCommentDataType) => {
  const { feedId, uid, comment } = data
  const commentData: CommentType = {
    id: uuid_v4(),
    userUid: uid,
    feedId: feedId,
    commentText: comment,
    createdAt: Date.now(),
    modifiedAt: Date.now(),
  }
  // comments 컬렉션에 댓글을 다려는 피드id 로 된 문서에 해당 댓글 데이터를 저장
  const { searchedDocRef: commentDocRef, searchedData: searchedCommentData } = await searchFirestoreDoc(`comments/${feedId}`)
  const { searchedData: userData } = await searchFirestoreDoc(`users/${uid}`)
  await updateDoc(commentDocRef, {
    comments: [ ...searchedCommentData!.comments, commentData ]
  })

  return {
    ...commentData,
    nickname: userData!.nickname,
    profileImg: userData!.profileImg,
  } as CommentWithUserInfoType
}

export default addComment