import { Dispatch, FC, SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import { Avatar, CardHeader, Stack, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { deleteFeedInfo } from "store/slices/usersSlice";
import { onDeleteFeed } from "store/asyncFunctions";
import { showAlert } from "store/slices/appSlice";
import useSetTimeDistance from "utils/hooks/useSetTimeDistance";
import FollowButton from "components/feeds/FollowButton";
import EditMenu from "components/parts/EditMenu"
import defaultImg from "public/imgs/profileImg.png"

const FeedHeader: FC<FeedHeaderProps> = ({ feedData, setEditing }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const router = useRouter()
  const dispatch = useAppDispatch()
  const myInfo = useAppSelector(state => state.users.myInfo)

  const { id, userUid, createdAt, modifiedAt, nickname, profileImg } = feedData
  const { date, timeAgo } = useSetTimeDistance(createdAt, modifiedAt)

  const MoveToUserProfile = (userUid: string) => () => router.push(`/user/${userUid}`)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () =>  setAnchorEl(null);

  const handleEditFeed = () => {
    setEditing(true)
    handleClose()
  }
  const handleDeleteFeed = async () => {
    const ok = window.confirm('이 피드를 정말 삭제하시겠습니까?')
    if (!ok) return
    handleClose()
    dispatch(onDeleteFeed(feedData as FeedWithUserInfoType)).then(() => {
      dispatch(deleteFeedInfo(`feeds/${id}`))
      dispatch(showAlert({ isShown: true, message: "삭제가 완료되었습니다!" }))
    })
  }

  return (
    <CardHeader
      avatar={<Avatar alt={nickname} src={profileImg ? profileImg : defaultImg.src} />}
      title={
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", height: "30.75px" }}>
          <NicknameTypo onClick={MoveToUserProfile(userUid)}>{nickname}</NicknameTypo>
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
          onEditContent={handleEditFeed}
          onDeleteContent={handleDeleteFeed}
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
