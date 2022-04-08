import { createAsyncThunk } from "@reduxjs/toolkit"
import { updateDoc } from "firebase/firestore"
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc"

export const onDeleteComment = createAsyncThunk(
  "DELETE_COMMENT_REQUEST",
  async (data: DeleteCommentDataType) => {
    const commentData = await deleteComment(data)
    return commentData
  }
)

const deleteComment = async (data: DeleteCommentDataType) => {
  const { feedId, commentId } = data
  const { searchedDocRef: commentsDocRef, searchedData: commentsData } = await searchFirestoreDoc(`comments/${feedId}`)
  const commentsArray = commentsData!.comments
  const filteredComments = commentsArray.filter((comment: CommentType) => comment.id !== commentId)
  await updateDoc(commentsDocRef, { comments: filteredComments })

  return { feedId, commentId }
}

export default deleteComment