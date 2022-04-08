import { createAsyncThunk } from "@reduxjs/toolkit"
import { updateDoc } from "firebase/firestore"
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc"

export const onLikeFeed = createAsyncThunk(
  "LIKE_FEED_REQUEST",
  async (data: LikeBookmarkFeedDataType) => {
    const likeData = await likeFeed(data)
    return likeData
  }
)

const likeFeed = async (data: LikeBookmarkFeedDataType) => {
  const { feedId, uid } = data
  const { searchedDocRef: feedDocRef, searchedData: feedData } = await searchFirestoreDoc(`feeds/${feedId}`)
  const { searchedDocRef: userDocRef, searchedData: userData } = await searchFirestoreDoc(`users/${uid}`)
  await updateDoc(feedDocRef, {
    likes: [...feedData!.likes, uid ],
    likesCount: feedData!.likesCount + 1,
  })
  await updateDoc(userDocRef, { likeFeeds: [ ...userData!.likeFeeds, `feeds/${feedId}` ] })

  return { feedId, uid }
}

export default likeFeed