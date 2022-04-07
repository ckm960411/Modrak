import { Dispatch, FC, SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import { Avatar, CardHeader, Stack, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { deleteDoc, updateDoc } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { deleteFeed } from "store/slices/feedsSlice";
import { deleteFeedInfo } from "store/slices/usersSlice";
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc";
import useSetTimeDistance from "utils/hooks/useSetTimeDistance";
import FollowButton from "components/feeds/FollowButton";
import EditMenu from "components/parts/EditMenu"
import defaultImg from "public/imgs/profileImg.png"

const FeedHeader: FC<FeedHeaderProps> = ({ feedData, setEditing }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const router = useRouter()
  const dispatch = useAppDispatch()
  const myInfo = useAppSelector(state => state.users.myInfo)

  const { id, userUid, userRef, createdAt, modifiedAt, nickname, profileImg } = feedData
  const { date, timeAgo } = useSetTimeDistance(createdAt, modifiedAt)

  const onMoveUserProfile = (userUid: string) => () => router.push(`/user/${userUid}`)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () =>  setAnchorEl(null);

  const onEditFeed = () => {
    setEditing(true)
    handleClose()
  }
  const onDeleteFeed = async () => {
    const ok = window.confirm('이 피드를 정말 삭제하시겠습니까?')
    if (!ok) return
    handleClose()
    const { searchedDocRef: feedDocRef, searchedData: feedData } = await searchFirestoreDoc(`feeds/${id}`)
    feedData!.likes.forEach(async (userUid: string) => {
      const { searchedDocRef: userDocRef, searchedData: userData } = await searchFirestoreDoc(`users/${userUid}`)
      await updateDoc(userDocRef, {
        likeFeeds: userData!.likeFeeds.filter((feedRef: string) => feedRef !== `feeds/${id}`),
      })
    })
    feedData!.bookmarks.forEach(async (userUid: string) => {
      const { searchedDocRef: userDocRef, searchedData: userData } = await searchFirestoreDoc(`users/${userUid}`)
      await updateDoc(userDocRef, {
        bookmarkFeeds: userData!.bookmarkFeeds.filter((feedRef: string) => feedRef !== `feeds/${id}`),
      })
    })
    const { searchedDocRef: userDocRef, searchedData: userData } = await searchFirestoreDoc(userRef)
    await updateDoc(userDocRef, {
      feeds: userData!.feeds.filter((feedRef: string) => feedRef !== `feeds/${id}`),
    })
    await deleteDoc(feedDocRef).catch(err => console.log(err))
    
    const { searchedDocRef: commentsDocRef } = await searchFirestoreDoc(`comments/${id}`)
    await deleteDoc(commentsDocRef).catch(err => console.log(err))
    
    dispatch(deleteFeed({ feedId: id }))
    dispatch(deleteFeedInfo(`feeds/${id}`))
    alert('피드가 정상적으로 삭제되었습니다!')
  }

  return (
    <CardHeader
      avatar={<Avatar alt={nickname} src={profileImg ? profileImg : defaultImg.src} />}
      title={
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", height: "30.75px" }}>
          <NicknameTypo onClick={onMoveUserProfile(userUid)}>{nickname}</NicknameTypo>
          {myInfo && myInfo.uid !== userUid &&  <FollowButton userUid={userUid} />}
        </Stack>
      }
      subheader={`${date} (${timeAgo})`}
      action={ myInfo &&
        <EditMenu
          userUid={userUid}
          anchorEl={anchorEl}
          handleClick={handleClick}
          handleClose={handleClose}
          onEditContent={onEditFeed}
          onDeleteContent={onDeleteFeed}
        />
      }
    />
  );
};

const NicknameTypo = styled(Typography)`
  font-family: 'Katuri';
  color: #353535;
  cursor: pointer;
`
type FeedHeaderProps = {
  feedData: FeedWithUserInfoType
  setEditing: Dispatch<SetStateAction<boolean>>
}

export default FeedHeader;
