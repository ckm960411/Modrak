declare type DivisionType = "전체 지역" | "제주시" | "애월" | "한경/한림" | "대정/안덕" | "서귀포" | "남원" | "표선/성산" | "구좌" | "조천"

declare type Tags = "로컬맛집" | "데이트" | "가족식사" | "모임" | "혼밥/혼술"

declare type FoodCategory = "한식/분식" | "양식" | "일식/중식" | "카페"

declare type RestaurantType = {
  id: string
  images: string[],
  title: string
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