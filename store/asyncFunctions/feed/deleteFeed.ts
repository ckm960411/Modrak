import { createAsyncThunk } from "@reduxjs/toolkit"
import { deleteDoc, updateDoc } from "firebase/firestore"
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc"

export const onDeleteFeed = createAsyncThunk(
  "DELETE_FEED_REQUEST",
  async (data: FeedWithUserInfoType) => {
    const feedId = await deleteFeed(data)
    return feedId
  }
)

const deleteFeed = async (feedWithUserInfo: FeedWithUserInfoType) => {
  const { id: feedId, userRef } = feedWithUserInfo
  const { searchedDocRef: feedDocRef, searchedData: feedData } = await searchFirestoreDoc(`feeds/${feedId}`)
  // 피드를 좋아요한 사람들의 likeFeeds 목록에서 해당 피드 삭제
  feedData!.likes.forEach(async (userUid: string) => {
    const { searchedDocRef: userDocRef, searchedData: userData } = await searchFirestoreDoc(`users/${userUid}`)
    await updateDoc(userDocRef, {
      likeFeeds: userData!.likeFeeds.filter((feedRef: string) => feedRef !== `feeds/${feedId}`),
    })
  })
  // 피드를 북마크한 사람들의 bookmarkFeeds 목록에서 해당 피드 삭제
  feedData!.bookmarks.forEach(async (userUid: string) => {
    const { searchedDocRef: userDocRef, searchedData: userData } = await searchFirestoreDoc(`users/${userUid}`)
    await updateDoc(userDocRef, {
      bookmarkFeeds: userData!.bookmarkFeeds.filter((feedRef: string) => feedRef !== `feeds/${feedId}`),
    })
  })
  // 피드를 작성한 사용자의 feeds 목록에서 해당 피드 삭제
  const { searchedDocRef: userDocRef, searchedData: userData } = await searchFirestoreDoc(userRef)
  await updateDoc(userDocRef, {
    feeds: userData!.feeds.filter((feedRef: string) => feedRef !== `feeds/${feedId}`),
  })
  await deleteDoc(feedDocRef)
  // 피드의 댓글 목록 삭제
  const { searchedDocRef: commentsDocRef } = await searchFirestoreDoc(`comments/${feedId}`)
  await deleteDoc(commentsDocRef)

  return feedId
}

export default deleteFeed