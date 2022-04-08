import { createAsyncThunk } from "@reduxjs/toolkit"
import { updateDoc } from "firebase/firestore"
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc"

export const onUnlikeFeed = createAsyncThunk(
  "UNLIKE_FEED_REQUEST",
  async (data: LikeBookmarkFeedDataType) => {
    const unlikeData = await unlikeFeed(data)
    return unlikeData
  }
)

const unlikeFeed = async (data: LikeBookmarkFeedDataType) => {
  const { feedId, uid } = data
  const { searchedDocRef: feedDocRef, searchedData: feedData } = await searchFirestoreDoc(`feeds/${feedId}`)
  const { searchedDocRef: userDocRef, searchedData: userData } = await searchFirestoreDoc(`users/${uid}`)
  const removedFeedLikes = feedData!.likes.filter((userUid: string) => userUid !== uid)
  await updateDoc(feedDocRef, {
    likes: removedFeedLikes,
    likesCount: feedData!.likesCount -1
  })
  const removedLikeFeeds = userData!.likeFeeds.filter((feedRef: string) => feedRef !== `feeds/${feedId}`)
  await updateDoc(userDocRef, { likeFeeds: removedLikeFeeds })

  return { feedId, uid }
}

export default unlikeFeed