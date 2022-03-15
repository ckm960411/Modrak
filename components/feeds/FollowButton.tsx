import { FC } from "react";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { updateDoc } from "firebase/firestore";
import searchFirestoreDoc from "utils/searchFirestoreDoc";
import { addFollowings, removeFollowings } from "store/usersSlice";

const FollowButton: FC<{userUid: string}> = ({ userUid }) => {
  const myInfo = useAppSelector(state => state.users.myInfo)
  const { uid, followings } = myInfo!

  const dispatch = useAppDispatch()

  const onToggleFollow = async () => {
    const { searchedDocRef: myInfoRef, searchedData: myInfoData } = await searchFirestoreDoc(`users/${uid}`)
    const { searchedDocRef: userDocRef, searchedData: userData } = await searchFirestoreDoc(`users/${userUid}`)
    if (followings.includes(userUid)) { // 언팔로우
      // 내 팔로잉에 상대 id 를 제거하고, followingsCount -1 감소
      const removedFollowings = myInfoData!.followings.filter((followingId: string) => followingId !== userUid)
      await updateDoc(myInfoRef, {
        followings: removedFollowings,
        followingsCount: myInfoData!.followingsCount -1,
      })
      dispatch(removeFollowings({ userUid }))
      // 상대 팔로우에 내 id 를 제거하고, followersCount -1 감소
      const removedFollowers = userData!.followers.filter((followerId: string) => followerId !== uid)
      await updateDoc(userDocRef, {
        followers: removedFollowers,
        followersCount: userData!.followersCount - 1,
      })
    } else { // 팔로우
      // 내 팔로잉에 상대 id 를 추가하고, followingsCount +1 증가
      const addedFollowings = [ ...myInfoData!.followings, userUid ]
      await updateDoc(myInfoRef, {
        followings: addedFollowings,
        followingsCount: myInfoData!.followingsCount + 1,
      })
      dispatch(addFollowings({ userUid }))
      // 상대 팔로우에 내 id 를 추가하고, followersCount +1 증가
      const addedFollowers = [ ...userData!.followers, uid ]
      await updateDoc(userDocRef, {
        followers: addedFollowers,
        followersCount: userData!.followersCount + 1,
      })
    }
  }

  return (
    <Button 
      variant="outlined" 
      size="small" 
      sx={{ mr: 1 }}
      onClick={onToggleFollow}
    >
      {followings.includes(userUid) ? '언팔로우' : '팔로우'}
    </Button>
  )
}

export default FollowButton