import { createAsyncThunk } from "@reduxjs/toolkit"
import { updateDoc } from "firebase/firestore"
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc"

export const onRemoveFollowing = createAsyncThunk(
  "REMOVE_FOLLOWING_REQUEST",
  async (data: FollowingDataType) => {
    const followingData = await removeFollowing(data)
    return followingData
  }
)

const removeFollowing = async (data: FollowingDataType) => {
  const { myUid, userUid } = data
  const { searchedDocRef: myInfoRef, searchedData: myInfoData } = await searchFirestoreDoc(`users/${myUid}`)
  const { searchedDocRef: userDocRef, searchedData: userData } = await searchFirestoreDoc(`users/${userUid}`)
  // 내 팔로잉에 상대 id 를 제거하고, followingsCount -1 감소
  const removedFollowings = myInfoData!.followings.filter((followingId: string) => followingId !== userUid)
  await updateDoc(myInfoRef, {
    followings: removedFollowings,
    followingsCount: myInfoData!.followingsCount -1,
  })
  // 상대 팔로우에 내 id 를 제거하고, followersCount -1 감소
  const removedFollowers = userData!.followers.filter((followerId: string) => followerId !== myUid)
  await updateDoc(userDocRef, {
    followers: removedFollowers,
    followersCount: userData!.followersCount - 1,
  })

  return userUid
}

export default removeFollowing