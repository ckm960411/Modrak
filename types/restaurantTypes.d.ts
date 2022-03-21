declare type DivisionType = "전체 지역" | "제주시" | "애월" | "한경/한림" | "대정/안덕" | "서귀포" | "남원" | "표선/성산" | "구좌" | "조천"

declare type Tags = "전체" | "로컬맛집" | "데이트" | "가족식사" | "모임" | "혼밥/혼술"

declare type FoodCategory = "전체" | "한식/분식" | "양식" | "일식/중식" | "카페"

declare interface RestaurantType {
  images: string[],
  name: string
  subtitle: string
  division: DivisionType
  detailDivision: string
  address: string
  description: string
  phoneNumber: string
  workHours: string
  breaktime?: string
  holiday: string
  menu: string[]
  rating: number
  recommend: number
  bookmark: number
  category: FoodCategory
  detailCategory: string
  tags: Tags[]
}
declare interface RestaurantWithId extends RestaurantType {
  id: string
}

declare interface ReviewType {
  reviewId: string
  restaurantId: string
  userUid: string
  reviewText: string
  reviewImages: string[]
  rating: number
  createdAt: number
  modifiedAt: number
}
declare interface ReviewWithUserInfo extends ReviewType {
  nickname: string
  profileImg: string
}