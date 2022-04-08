import { createAsyncThunk } from "@reduxjs/toolkit"
import { updateDoc } from "firebase/firestore"
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc"

export const onAddFollowing = createAsyncThunk(
  "ADD_FOLLOWING_REQUEST",
  async (data: FollowingDataType) => {
    const followingUid = await addfollowing(data)
    return followingUid
  }
)

const addfollowing = async (data: FollowingDataType) => {
  const { myUid, userUid } = data
  const { searchedDocRef: myInfoRef, searchedData: myInfoData } = await searchFirestoreDoc(`users/${myUid}`)
  const { searchedDocRef: userDocRef, searchedData: userData } = await searchFirestoreDoc(`users/${userUid}`)
  // 내 팔로잉에 상대 id 를 추가하고, followingsCount +1 증가
  const addedFollowings = [ ...myInfoData!.followings, userUid ]
  await updateDoc(myInfoRef, {
    followings: addedFollowings,
    followingsCount: myInfoData!.followingsCount + 1,
  })
  const addedFollowers = [ ...userData!.followers, myUid ]
  await updateDoc(userDocRef, {
    followers: addedFollowers,
    followersCount: userData!.followersCount + 1,
  })

  return userUid
}

export default addfollowing