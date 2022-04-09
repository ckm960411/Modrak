declare interface AccommodationType {
  name: string
  division: DivisionType
  category: AccommodationCategories
  tags: string[]
  rating: number
  address: string
  images: string[]
  description: string[]
  checkin: string
  checkout: string
  convenience: string[]
  service: string[]
  notice: string[]
  rooms: RoomType[]
}
declare interface AccommodationWithId extends AccommodationType {
  id: string
}

declare type AccommodationCategories  = "전체" | "호텔" | "캠핑" | "펜션" | "게스트하우스"

declare type AccommodationTags = '전체' | '오션뷰' | '5성급' | '독채' | '아이와함께' | '가성비숙소'

declare interface RoomType {
  roomId: string
  roomName: string
  price: string 
  people: string
  bed: string
  equipment: string[]
  images: string[]
  description: string[]
  reservedDates: string[]
}

declare interface RoomReviewType {
  reviewId: string
  accommodationId: string
  userUid: string
  reviewText: string
  reviewImages: string[]
  rating: number
  createdAt: number
  modifiedAt: number
}
declare interface RoomReviewWithUserInfo extends RoomReviewType {
  nickname: string
  profileImg: string
}

// async function arguments type
declare interface RoomReservationType {
  accommodationId: string
  roomId: string
  datesArray: string[]
}
declare interface RoomReviewData {
  uid: string
  accommodationId: string
  reviewText: string
  images: string[]
  rating: number
}
declare interface UpdateRoomReview extends RoomReviewData {
  reviewId: string
}
declare interface DeleteRoomReview {
  accommodationId: string
  reviewId: string
}