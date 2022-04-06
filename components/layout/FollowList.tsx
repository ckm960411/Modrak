import { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from "react";
import { Avatar, Card, CardHeader, Dialog, IconButton, Stack, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useAppSelector } from "store/hooks";
import defaultImg from "public/imgs/profileImg.png"
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc";
import FollowButton from "components/feeds/FollowButton";

type FollowList = {
  uid: string
  profileImg: string
  nickname: string
  email: string
}
type FollowListProps = {
  userInfo: UserType
  open: boolean
  setFollowOpened: Dispatch<SetStateAction<boolean>>
  followType: "followers" | "followings"
}
const FollowList: FC<FollowListProps> = ({ userInfo, open, setFollowOpened, followType }) => {
  const [followList, setFollowList] = useState<FollowList[]>([])

  const onClose = () => {
    setFollowOpened(false)
  }

  useEffect(() => {
    userInfo[followType].map( async (follow) => {
      const { searchedData: userData } = await searchFirestoreDoc(`users/${follow}`)
      const userInfo: FollowList = {
        uid: userData!.uid,
        profileImg: userData!.profileImg,
        nickname: userData!.nickname,
        email: userData!.email,
      }
      setFollowList(prev => [ ...prev, userInfo ])
    })
  }, [followType, userInfo])

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <Card sx={{ width: '400px' }} raised>
        <CardHeader 
          title={<Typography sx={{ fontFamily: 'Katuri' }}>{followType === 'followers' ? '팔로워' : '팔로우'} 목록</Typography>}
          action={<IconButton onClick={onClose}><Close /></IconButton>}
        />
        <Stack spacing={2}>
          {followList.map(follow => (
            <Card key={follow.uid} sx={{ boxShadow: 'none' }}>
              <CardHeader 
                avatar={<Avatar alt={follow.nickname} src={follow.profileImg ? follow.profileImg : defaultImg.src} />}
                title={<Typography sx={{ fontFamily: 'Katuri' }}>{follow.nickname}</Typography>}
                subheader={<Typography>{follow.email}</Typography>}
                action={<FollowButton userUid={follow.uid} />}
              />
            </Card>
          ))}
        </Stack>
      </Card>
    </Dialog>
  )
}

export default FollowList