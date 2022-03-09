import { Timestamp } from "firebase/firestore";

declare type FeedType = {
  id: string
  userUid: string
  feedText: string
  feedImages: string[]
  likes: string[]
  bookmarks: string[]
  comments: []
  createdAt: Timestamp
  modifiedAt: Timestamp
}