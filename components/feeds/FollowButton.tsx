import { FC, useState } from "react";
import { mainColor } from "styles/GlobalStyles";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { onAddFollowing, onRemoveFollowing } from "store/asyncFunctions";
import SubmitFormButton from "components/parts/SubmitFormButton";

const FollowButton: FC<{userUid: string, [key: string]: any}> = ({ userUid, ...props }) => {
  const [followLoading, setFollowLoading] = useState(false)
  const dispatch = useAppDispatch()
  const myInfo = useAppSelector(state => state.users.myInfo)
  
  const onToggleFollow = async () => {
    if (!myInfo) return
    const { uid: myUid, followings } = myInfo
    setFollowLoading(true)
    if (followings.includes(userUid)) { // 언팔로우
      dispatch(onRemoveFollowing({ myUid, userUid }))
    } else { // 팔로우
      dispatch(onAddFollowing({ myUid, userUid }))
    }
    setFollowLoading(false)
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
      {...props}
    >
      {myInfo?.followings.includes(userUid) ? '언팔로우' : '팔로우'}
    </SubmitFormButton>
  )
}

export default FollowButton