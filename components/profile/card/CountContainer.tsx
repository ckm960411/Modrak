import { FC, useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { doc, onSnapshot } from "firebase/firestore";
import { dbService } from "fireBaseApp/fBase";
import { useAppSelector } from "store/hooks";
import FollowList from "components/layout/FollowList";

const CountContainer: FC = () => {
  const [followersCount, setFollowersCount] = useState(0)
  const [followingsCount, setFollowingsCount] = useState(0)
  const [followOpened, setFollowOpened] = useState(false)
  const [followType, setFollowType] = useState<"followers" | "followings">("followers")

  const myInfo = useAppSelector(state => state.users.myInfo)
  const { userData } = useAppSelector(state => state.profile)
  const { uid, feeds } = userData!

  const onClickFollowList = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.currentTarget.firstElementChild as HTMLElement).innerText === '팔로워') {
      setFollowType('followers')
    } else {
      setFollowType('followings')
    }
    setFollowOpened(true)
  }

  const isMyProfile = useMemo(() => { // 내 정보와 프로필 유저가 같다면 isMyProfile 을 true
    if (myInfo && myInfo.uid === uid) return true
    else false
  }, [myInfo, uid])

  useEffect(() => { // 실시간으로 사용자 정보를 받아옴
    const userDocRef = doc(dbService, `users/${uid}`)
    let unsub = onSnapshot(userDocRef, (doc) => {
      setFollowersCount((doc.data() as UserType).followersCount)
      setFollowingsCount((doc.data() as UserType).followingsCount)
    })
    return () => unsub()
  }, [uid])

  return (
    <Section>
      <div>
        <Typography>게시글</Typography>
        <Typography>{feeds.length}</Typography>
      </div>
      <div onClick={onClickFollowList}>
        <Typography>팔로워</Typography>
        <Typography>{isMyProfile ? myInfo?.followersCount : followersCount}</Typography>
      </div>
      <div onClick={onClickFollowList}>
        <Typography>팔로잉</Typography>
        <Typography>{isMyProfile ? myInfo?.followingsCount : followingsCount}</Typography>
      </div>
      {followOpened && (
        <FollowList 
          userInfo={userData!}
          open={followOpened} 
          setFollowOpened={setFollowOpened} 
          followType={followType} 
        />
      )}
    </Section>
  )
}

const Section = styled.section`
  display: flex;
  text-align: center;
  margin-top: 8px;
  border-top: 1px solid #e5e5e5;
  & > div {
    flex-grow: 1;
    cursor: pointer;
    padding: 16px 0;
    border-right: 1px solid #e5e5e5;
  }
  & > div:first-of-type {
    cursor: auto;
  }
  & > div:last-of-type {
    border-right: none;
  }
`

export default CountContainer