import { FC, useEffect, useState } from "react";
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Divider, Skeleton, Stack, Typography } from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/CommentOutlined";
import BookmarkIcon from "@mui/icons-material/BookmarkBorderOutlined";
import LikeIcon from "@mui/icons-material/FavoriteBorderOutlined";
import defaultImg from "public/imgs/profileImg.png"
import styled from "@emotion/styled";
import { useAppSelector } from "store/hooks";
import EditMenu from "components/parts/EditMenu"
import FollowButton from "components/feeds/FollowButton";
import CustomCarousel from "components/parts/CustomCarousel";
import Image from "next/image";
import { FeedWithUserInfoType } from "types/feedTypes";
import { format } from "date-fns";
import formatDistanceToNowKo from "lib/formatDistanceToNowKo";

const NicknameTypo = styled(Typography)`
  font-family: 'Katuri';
  color: #353535;
`
const ImageWrapper = styled.div`
  max-height: 500px;
  min-height: 400px;
  height: 100%;
  width: 100%;
  background-color: #e0e0e0;
  position: relative;
  & span {
    height: inherit !important;
  }
`
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(() => ({ marginLeft: "auto" }));

const Feed: FC<{feedData: FeedWithUserInfoType}> = ({ feedData }) => {
  const myInfo = useAppSelector(state => state.users.myInfo)
  // const [userInfo, setUserInfo] = useState<DocumentData | null>(null)
  const [date, setDate] = useState<string>('')
  const [timeAgo, setTimeAgo] = useState<string>("0");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [editing, setEditing] = useState<boolean>(false)
  const [expanded, setExpanded] = useState(false);
  
  const { userUid, feedText, feedImages, createdAt, modifiedAt, nickname, profileImg } = feedData

  // useEffect(() => {
  //   const searchUser = async () => {
  //     const response = await searchUserInfo(userUid)
  //     setUserInfo(response!)
  //   }
  //   searchUser()
  // }, [userUid])

  useEffect(() => {
    if (createdAt === modifiedAt) {
      setTimeAgo(formatDistanceToNowKo(createdAt));
      setDate(format(createdAt, 'yyyy년 MM월 d일 H시 m분'))
    } else {
      setTimeAgo(formatDistanceToNowKo(modifiedAt));
      setDate(format(modifiedAt, 'yyyy년 MM월 d일 H시 m분'))
    }
  }, [createdAt, modifiedAt, setTimeAgo]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () =>  setAnchorEl(null);

  const onEditFeed = () => handleClose()
  const onDeleteFeed = () => handleClose()
  

  return (
    <Card raised>
      <CardHeader
        avatar={<Avatar alt={nickname} src={profileImg ? profileImg : defaultImg.src} />}
        title={(
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <NicknameTypo>{nickname}</NicknameTypo>
            <FollowButton />
          </Stack>
        )}
        subheader={`${date} (${timeAgo} 전)`}
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

      <>
        {feedImages[0] && (
          <CardMedia>
            <CustomCarousel>
              {feedImages.map((img, i) => (
                <ImageWrapper key={i}>
                  <Image
                    src={img} alt="image" 
                    layout="fill"
                    objectFit="contain"
                  />
                </ImageWrapper>
              ))}
            </CustomCarousel>
          </CardMedia>
        )}
      </>

      <CardContent>
        <Typography variant="body2">
          {feedText}
        </Typography>
      </CardContent>

      <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
        <div>
          <IconButton aria-label="like">
            <LikeIcon />
          </IconButton>
          <Typography variant="subtitle2" component="span">
            {/* {likes > 0
              ? `${likes.toLocaleString("ko-KR")} likes`
              : "like this post"} */}
              20,000 likes
          </Typography>
        </div>
        <div>
          <IconButton aria-label="bookmark">
            <BookmarkIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show comments"
          >
            <CommentIcon />
          </ExpandMore>
        </div>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
        <CardContent>
          댓글
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default Feed