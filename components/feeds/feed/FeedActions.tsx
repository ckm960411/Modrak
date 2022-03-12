import { Dispatch, FC, SetStateAction, useMemo } from "react";
import { CardActions, Typography } from "@mui/material";
import CommentIcon from "@mui/icons-material/CommentOutlined";
import BookmarkIcon from "@mui/icons-material/BookmarkBorderOutlined";
import LikeIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LikeFilledIcon from '@mui/icons-material/Favorite';
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import styled from "@emotion/styled";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { dbService } from "fireBaseApp/fBase";
import searchUserInfo from "utils/searchUserInfo";
import { removeFeedLikeUserUid } from "store/feedsSlice";
import { removeLikeFeedRef } from "store/usersSlice";

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
    } else {
      return false
    }
  }, [feedId, likes, myInfo])

  const onLikeFeed = async () => {
    if (!myInfo) return alert('먼저 로그인을 해주세요!')
    if (AmILiked) { // unlike
      const feedDocRef = doc(dbService, "feeds", feedId)
      await getDoc(feedDocRef).then(async (res) => {
        const feedData = res.data()
        const removedFeedLikes = feedData!.likes.filter((userUid: string) => userUid !== myInfo.uid)
        await updateDoc(feedDocRef, { likes: removedFeedLikes })
        const { userDocRef, userData } = await searchUserInfo(feedData!.userRef)
        const removedLikeFeeds = userData!.likeFeeds.filter((feedRef: string) => feedRef !== `feeds/${feedId}`)
        await updateDoc(userDocRef, { likeFeeds: removedLikeFeeds })
        dispatch(removeFeedLikeUserUid({ feedId, userUid: userData!.uid }))
        dispatch(removeLikeFeedRef({ feedRef: `feeds/${feedId}` }))
      }).catch(err => console.log(err))
    } else {
      // console.log('like')
    }
  }

  return (
    <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
      <div>
        <IconButton aria-label="like" onClick={onLikeFeed}>
          {AmILiked ? <LikeFilledIcon sx={{ color: '#ff0000' }} /> : <LikeIcon />}
        </IconButton>
        <Typography variant="subtitle2" component="span">
          {likes.length} likes
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
  );
};

export default FeedActions;
