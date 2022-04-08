import { createAsyncThunk } from "@reduxjs/toolkit"
import { updateDoc } from "firebase/firestore"
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc"

export const onRemoveBookmarkFeed = createAsyncThunk(
  "REMOVE_BOOKMARK_FEED_REQUEST",
  async (data: LikeBookmarkFeedDataType) => {
    const removeBookmarkData = await removeBookmarkFeed(data)
    return removeBookmarkData
  }
)

const removeBookmarkFeed = async (data: LikeBookmarkFeedDataType) => {
  const { feedId, uid } = data
  const { searchedDocRef: feedDocRef, searchedData: feedData } = await searchFirestoreDoc(`feeds/${feedId}`)
  const { searchedDocRef: userDocRef, searchedData: userData } = await searchFirestoreDoc(`users/${uid}`)
  const removedFeedBookmarks = feedData!.bookmarks.filter((userUid: string) => userUid !== uid)
  await updateDoc(feedDocRef, {
    bookmarks: removedFeedBookmarks,
    bookmarksCount: feedData!.bookmarksCount -1
  })
  const removedBookmarkFeeds = userData!.bookmarkFeeds.filter((feedRef: string) => feedRef !== `feeds/${feedId}`)
  await updateDoc(userDocRef, { bookmarkFeeds: removedBookmarkFeeds })

  return { feedId, uid }
}

export default removeBookmarkFeed