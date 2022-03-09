import { Timestamp } from "firebase/firestore";

declare type FeedType = {
  id: string
  userUid: string
  feedText: string
  feedImages: string[]
  createdAt: Timestamp
  modifiedAt: Timestamp
}