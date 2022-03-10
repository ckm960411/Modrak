import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import EditMenu from "components/parts/EditMenu"
import defaultImg from "public/imgs/profileImg.png"
import { Avatar, CardHeader, Stack, Typography } from "@mui/material";
import FollowButton from "components/feeds/FollowButton";
import styled from "@emotion/styled";
import { format } from "date-fns";
import formatDistanceToNowKo from "lib/formatDistanceToNowKo";
import { FeedWithUserInfoType } from "types/feedTypes";

const NicknameTypo = styled(Typography)`
  font-family: 'Katuri';
  color: #353535;
`
type FeedHeaderProps = {
  feedData: FeedWithUserInfoType
  editing: boolean
  setEditing: Dispatch<SetStateAction<boolean>>
}

const FeedHeader: FC<FeedHeaderProps> = ({ feedData, editing, setEditing }) => {
  const [timeAgo, setTimeAgo] = useState<string>("0");
  const [date, setDate] = useState<string>('')
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const { userUid, createdAt, modifiedAt, nickname, profileImg } = feedData
  
  useEffect(() => {
    if (createdAt === modifiedAt) {
      setTimeAgo(`${formatDistanceToNowKo(createdAt)} 전`);
      setDate(format(createdAt, 'yyyy년 MM월 d일 H시 m분'))
    } else {
      setTimeAgo(`${formatDistanceToNowKo(modifiedAt)} 전 수정됨`);
      setDate(format(modifiedAt, 'yyyy년 MM월 d일 H시 m분'))
    }
  }, [createdAt, modifiedAt, setTimeAgo]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () =>  setAnchorEl(null);

  const onEditFeed = () => {
    setEditing(true)
    handleClose()
  }
  const onDeleteFeed = () => handleClose()

  return (
    <CardHeader
      avatar={<Avatar alt={nickname} src={profileImg ? profileImg : defaultImg.src} />}
      title={
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <NicknameTypo>{nickname}</NicknameTypo>
          <FollowButton />
        </Stack>
      }
      subheader={`${date} (${timeAgo})`}
      action={
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

export default FeedHeader;
