import { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
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
  const router = useRouter()
  const myInfo = useAppSelector(state => state.users.myInfo)

  const onClose = () => {
    setFollowOpened(false)
  }

  const onMoveUserProfile = (userUid: string) => () => {
    router.push(`/user/${userUid}`)
    onClose()
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
  }, [])

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
        <Stack>
          {followList.map(follow => (
            <FollowCard key={follow.uid}>
              <CardHeader 
                avatar={<Avatar alt={follow.nickname} src={follow.profileImg ? follow.profileImg : defaultImg.src} />}
                title={<FollowTitle onClick={onMoveUserProfile(follow.uid)}>{follow.nickname}</FollowTitle>}
                subheader={<Typography>{follow.email}</Typography>}
                action={follow.uid !== myInfo?.uid && <FollowButton userUid={follow.uid} />}
              />
            </FollowCard>
          ))}
        </Stack>
      </Card>
    </Dialog>
  )
}

const FollowCard = styled(Card)`
  box-shadow: none;
`
const FollowTitle = styled(Typography)`
  font-family: Katuri;
  cursor: pointer;
`

export default FollowList