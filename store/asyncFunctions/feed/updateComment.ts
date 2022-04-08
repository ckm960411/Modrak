import { createAsyncThunk } from "@reduxjs/toolkit"
import { updateDoc } from "firebase/firestore"
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc"

export const onUpdateComment = createAsyncThunk(
  "UPDATE_COMMENT_REQUEST",
  async (data: UpdateCommentDataType) => {
    const commentData = await updateComment(data)
    return commentData
  }
)

const updateComment = async (data: UpdateCommentDataType) => {
  const { editText, feedId, commentId } = data
  const editData = { editText, feedId, commentId, modifiedAt: Date.now() }
  const { searchedDocRef: commentsDocRef, searchedData: commentsData } = await searchFirestoreDoc(`comments/${feedId}`)
  const commentsArray = commentsData!.comments
  const commentIndex = commentsArray.findIndex((comment: CommentType) => comment.id === commentId)
  commentsArray[commentIndex].commentText = editText
  commentsArray[commentIndex].modifiedAt = editData.modifiedAt
  await updateDoc(commentsDocRef, { comments: commentsArray })

  return editData
}

export default updateComment