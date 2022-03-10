import { Timestamp } from "firebase/firestore";

declare type FeedType = {
  id: string
  userUid: string
  // nickname: string
  // profileImg: string | null
  feedText: string
  feedImages: string[]
  likes: string[]
  bookmarks: string[]
  comments: string[]
  createdAt: number
  modifiedAt: number
}

declare type FeedWithUserInfoType = {
  id: string
  userUid: string
  nickname: string
  profileImg: string | null
  feedText: string
  feedImages: string[]
  likes: string[]
  bookmarks: string[]
  comments: string[]
  createdAt: number
  modifiedAt: number
}