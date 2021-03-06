// 유저 정보 타입
declare interface UserType {
  uid: string
  email: string
  name: string
  nickname: string
  profileImg: string | null
  feeds: string[] = []
  followers: string[]
  followersCount: number
  followings: string[]
  followingsCount: number
  likeFeeds: string[]
  bookmarkFeeds: string[]
  recommendRestaurants: string[]
  bookmarkRestaurants: string[]
  bookmarkAccommodations: string[]
  roomReserved: RoomReserved[]
  pushUnchecked: PushType[]
}
declare interface RoomReserved {
  accommodationId: string
  roomId: string
  reservedDates: string[]
}
declare interface PushType {
  pushId: string
  isChecked: boolean
  message: string
  createdAt: number
}

// 회원가입 시 입력할 값들 타입
declare type SignUpFormValue = {
  name: string;
  nickname: string;
  email: string;
  password: string;
  password_confirm: string;
}
// 로그인 시 입력할 값들 타입
declare type LoginFormValue = {
  email: string;
  password: string;
}

// 회원가입 시 중복체크 타입
declare type DuplicateCheck = "nickname" | "email"

// async function arguments type
declare interface FollowingDataType {
  myUid: string
  userUid: string
}
declare interface RestaurantDataType {
  restaurantId: string
  uid: string
}
declare interface AccommodationDataType {
  uid: string
  accommodationId: string
}
declare interface AddRoomInfoDataType {
  accommodationId: string
  roomId: string
  uid: string
  datesArray: string[]
  newPush: {
    pushId: string
    isChecked: boolean
    createdAt: number
    message: string
  }
}
declare interface RemoveCheckedPushType {
  uid: string
  pushId: string
}
declare interface UpdateProfileImgData {
  uid: string
  newProfileImg: string | null
}
declare interface UpdateNicknameData {
  uid: string
  nickname: string
}