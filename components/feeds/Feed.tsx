import { FC, useState } from "react";
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Divider, Stack, Typography } from "@mui/material";
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

const NicknameTypo = styled(Typography)`
  font-family: 'Katuri';
  color: #353535;
`
const TimeTypo = styled(Typography)`
  font-size: 14px;
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
const images = [
  {
    alt: "사진1",
    src: "https://firebasestorage.googleapis.com/v0/b/modrak-c7468.appspot.com/o/SLa0iD88QAd5TZB1wN39RUiOtai1%2F409ca469-216c-40a3-9e54-0fba764e98da?alt=media&token=9ea98026-502e-432f-80ec-75eb41ae0bab"
  },
  {
    alt: "사진2",
    src: "https://firebasestorage.googleapis.com/v0/b/modrak-c7468.appspot.com/o/SLa0iD88QAd5TZB1wN39RUiOtai1%2F723bc82e-6224-43f4-a14f-1329329e0d15?alt=media&token=505503ec-17ec-4ddd-9c07-7c83cf7a865e"
  },
  {
    alt: "사진3",
    src: "https://firebasestorage.googleapis.com/v0/b/modrak-c7468.appspot.com/o/SLa0iD88QAd5TZB1wN39RUiOtai1%2F1e5a8e36-eee9-4162-a24c-bf175cbf4ee5?alt=media&token=9c686cec-1e44-497b-bdf8-799ed4d8e48b"
  }
]
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(() => ({ marginLeft: "auto" }));

const Feed: FC = () => {
  const myInfo = useAppSelector(state => state.users.myInfo)
  const [timeAgo, setTimeAgo] = useState<string>("0");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [editing, setEditing] = useState<boolean>(false)
  const [expanded, setExpanded] = useState(false);

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
        avatar={<Avatar alt={"nickname"} src={defaultImg.src} />}
        title={(
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <NicknameTypo>짱운트</NicknameTypo>
            <FollowButton />
          </Stack>
        )}
        subheader={<TimeTypo>2022-03-09 13:11 (5분 전 수정됨)</TimeTypo>}
        action={
          <EditMenu 
            userUid={"SLa0iD88QAd5TZB1wN39RUiOtai1"}
            anchorEl={anchorEl}
            handleClick={handleClick}
            handleClose={handleClose}
            onEditContent={onEditFeed}
            onDeleteContent={onDeleteFeed}
          />
        }
      />

      <CardMedia>
        <CustomCarousel>
          {images.map((img, i) => (
            <ImageWrapper key={i}>
              <Image
                src={img.src} alt="image" 
                layout="fill"
                objectFit="contain"
              />
            </ImageWrapper>
          ))}
        </CustomCarousel>
      </CardMedia>

      <CardContent>
        <Typography variant="body2">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi perspiciatis ut quia omnis, libero totam optio id, veritatis voluptate, accusantium illum odio tempore? Expedita omnis perspiciatis quia, similique asperiores impedit veniam reiciendis, ab accusantium sequi consequatur. Molestiae illo, accusantium iste unde fugit aut assumenda vero. Nam accusantium voluptates id harum.
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