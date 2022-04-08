import { createAsyncThunk } from "@reduxjs/toolkit"
import { updateDoc } from "firebase/firestore"
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc"

export const onBookmarkFeed = createAsyncThunk(
  "BOOKMARK_FEED_REQUEST",
  async (data: LikeBookmarkFeedDataType) => {
    const bookmarkData = await bookmarkFeed(data)
    return bookmarkData
  }
)

const bookmarkFeed = async (data: LikeBookmarkFeedDataType) => {
  const { feedId, uid } = data
  const { searchedDocRef: feedDocRef, searchedData: feedData } = await searchFirestoreDoc(`feeds/${feedId}`)
  const { searchedDocRef: userDocRef, searchedData: userData } = await searchFirestoreDoc(`users/${uid}`)
  await updateDoc(feedDocRef, {
    bookmarks: [ ...feedData!.bookmarks, uid],
    bookmarksCount: feedData!.bookmarksCount +1
  })
  await updateDoc(userDocRef, { bookmarkFeeds: [ ...userData!.bookmarkFeeds, `feeds/${feedId}` ]  })

  return { feedId, uid }
}

export default bookmarkFeed