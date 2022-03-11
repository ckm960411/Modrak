declare interface FeedDataType {
  userUid: string
  feedText: string
  feedImages: string[]
  likes: string[]
  bookmarks: string[]
  comments: string[]
  createdAt: number
  modifiedAt: number
}
declare interface FeedWithIdType extends FeedDataType {
  id: string
}
declare interface FeedWithUserInfoType extends FeedWithIdType {
  nickname: string
  profileImg: string | null
}
