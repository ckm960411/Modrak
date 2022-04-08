import { Dispatch, FC, SetStateAction, useMemo } from "react";
import { CardActions, Typography } from "@mui/material";
import CommentIcon from "@mui/icons-material/CommentOutlined";
import BookmarkIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkFilledIcon from '@mui/icons-material/Bookmark';
import LikeIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LikeFilledIcon from '@mui/icons-material/Favorite';
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import styled from "@emotion/styled";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { showAlert } from "store/slices/appSlice";
import { addBookmarkFeedRef, addLikeFeedRef, removeBookmarkFeedRef, removeLikeFeedRef } from "store/slices/usersSlice";
import { onBookmarkFeed, onLikeFeed, onRemoveBookmarkFeed, onUnlikeFeed } from "store/asyncFunctions";
import { mainColor } from "styles/GlobalStyles";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(() => ({ marginLeft: "auto" }));

type FeedActionsProps = {
  feedId: string
  likes: string[]
  bookmarks: string[]
  expanded: boolean
  setExpanded: Dispatch<SetStateAction<boolean>>
}

const FeedActions: FC<FeedActionsProps> = ({ feedId, likes, bookmarks, expanded, setExpanded }) => {
  const dispatch = useAppDispatch()
  const myInfo = useAppSelector(state => state.users.myInfo)

  const handleExpandClick = () => setExpanded(!expanded);

  const AmILiked = useMemo(() => {
    if (myInfo) {
      const amILikedThisFeed = likes.includes(myInfo.uid) && myInfo.likeFeeds.includes(`feeds/${feedId}`)
      return amILikedThisFeed
    } else return false
  }, [feedId, likes, myInfo])

  const AmIMarked = useMemo(() => {
    if (myInfo) {
      const amIMarkedThisFeed = bookmarks.includes(myInfo.uid) && myInfo.bookmarkFeeds.includes(`feeds/${feedId}`)
      return amIMarkedThisFeed
    } else return false
  }, [feedId, bookmarks, myInfo])

  const handleLikeFeed = async () => {
    if (!myInfo) return dispatch(showAlert({ isShown: true, message: '먼저 로그인을 해주세요!', severity: 'warning' }))
    if (AmILiked) { // unlike
      dispatch(onUnlikeFeed({ feedId, uid: myInfo.uid }))
      dispatch(removeLikeFeedRef({ feedRef: `feeds/${feedId}` }))
    } else { // like
      dispatch(onLikeFeed({ feedId, uid: myInfo.uid }))
      dispatch(addLikeFeedRef({ feedRef: `feeds/${feedId}` }))
    }
  }

  const handleBookmarkFeed = async () => {
    if (!myInfo) return dispatch(showAlert({ isShown: true, message: '먼저 로그인을 해주세요!', severity: 'warning' }))
    if (AmIMarked) { // unmark
      dispatch(onRemoveBookmarkFeed({ feedId, uid: myInfo.uid }))
      dispatch(removeBookmarkFeedRef({ feedRef: `feeds/${feedId}` }))
    } else { // mark
      dispatch(onBookmarkFeed({ feedId, uid: myInfo.uid }))
      dispatch(addBookmarkFeedRef({ feedRef: `feeds/${feedId}` }))
    }
  }

  return (
    <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
      <div>
        <IconButton aria-label="like" onClick={handleLikeFeed}>
          {AmILiked ? <LikeFilledIcon sx={{ color: '#ff0000' }} /> : <LikeIcon />}
        </IconButton>
        <Typography variant="subtitle2" component="span">
          {likes.length} likes
        </Typography>
      </div>
      <div>
        <IconButton aria-label="bookmark" onClick={handleBookmarkFeed}>
          {AmIMarked ? <BookmarkFilledIcon sx={{ color: mainColor }} /> : <BookmarkIcon />}
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
  );
};

export default FeedActions;
