declare interface FeedDataType {
  userUid: string
  userRef: string
  feedText: string
  feedImages: string[]
  likes: string[]
  likesCount: number
  bookmarks: string[]
  bookmarksCount: number
  tags: string[]
  comments: CommentWithUserInfoType[]
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

interface CommentType {
  id: string
  userUid: string
  feedId: string
  commentText: string
  createdAt: number
  modifiedAt: number
}

interface CommentWithUserInfoType extends CommentType {
  nickname: string
  profileImg: string | null
}

type OrderType = "latest" | "famous" | "interest"
type ShowType = "allShow" | "followingOnly" | "myFeedOnly"
type TagType = "allTag" | "restaurantOnly" | "accommodationOnly"

type UseLoadingFeedsType = (
  reference: RefObject<HTMLDivElement>,
  filter?: any[]
) => { feeds: FeedWithUserInfoType[] }

// async function arguments type
declare interface NewFeedDataType {
  uid: string
  feedText: string
  imgs: string[]
  tags: string[]
  nickname: string
  profileImg: string | null
}
declare interface UpdateFeedDataType {
  uid: string
  feedId: string
  editText: string
  newImages: string[]
  newTags: string[]
}
declare interface LikeBookmarkFeedDataType {
  feedId: string
  uid: string
}
declare interface AddCommentDataType {
  feedId: string
  uid: string
  comment: string
}
declare interface UpdateCommentDataType {
  feedId: string
  commentId: string
  editText: string
}
declare interface DeleteCommentDataType {
  feedId: string
  commentId: string
}