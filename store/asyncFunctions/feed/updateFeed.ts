import { createAsyncThunk } from "@reduxjs/toolkit"
import updateFirestoreDoc from "utils/functions/updateFirestoreDoc"
import uploadImagesDB from "utils/functions/uploadImagesDB"

export const onUpdateFeed = createAsyncThunk(
  "UPDATE_FEED_REQUEST",
  async (data: UpdateFeedDataType) => {
    const feedData = await updateFeed(data)
    return feedData
  }
)

const updateFeed = async (updateFeedData: UpdateFeedDataType) => {
  const { uid, feedId, editText, newImages, newTags } = updateFeedData
  const shouldUpload = newImages.filter(img => img.startsWith('data:image'))
  const shouldNotUpload = newImages.filter(img => !img.startsWith('data:image'))
  const newImagesURLs = await uploadImagesDB(shouldUpload, uid)
  const data = {
    feedId,
    feedText: editText,
    feedImages: [...shouldNotUpload, ...newImagesURLs!],
    tags: newTags,
    modifiedAt: Date.now(),
  }
  await updateFirestoreDoc(`feeds/${feedId}`, data)
  return data
}

export default updateFeed