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

declare type AccommodationCategories  = "전체" | "호텔" | "모텔" | "펜션" | "게스트하우스"

declare interface RoomType {
  roomName: string
  price: string 
  people: string
  bed: string
  equipment: string[]
  images: string[]
  description: string[]
}