import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { updateDoc } from "firebase/firestore";
import searchFirestoreDoc from "utils/searchFirestoreDoc";
import { addFollowings, removeFollowings } from "store/slices/usersSlice";
import SubmitFormButton from "components/parts/SubmitFormButton";
import { mainColor } from "styles/GlobalStyles";

const FollowButton: FC<{userUid: string}> = ({ userUid }) => {
  const [followLoading, setFollowLoading] = useState(false)
  const dispatch = useAppDispatch()
  const myInfo = useAppSelector(state => state.users.myInfo)
  
  const { uid, followings } = myInfo!

  const onToggleFollow = async () => {
    setFollowLoading(true)
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
      setFollowLoading(false)
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
      setFollowLoading(false)
    }
  }

  return (
    <SubmitFormButton
      variant="outlined"
      size="small"
      icon={false}
      spinColor={mainColor}
      loading={followLoading}
      onClick={onToggleFollow}
      sx={{ border: `1px solid ${mainColor}`, mr: 1 }}
    >
      {followings.includes(userUid) ? '언팔로우' : '팔로우'}
    </SubmitFormButton>
  )
}

export default FollowButton