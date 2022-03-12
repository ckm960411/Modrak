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
import { updateDoc } from "firebase/firestore";
import searchFirestoreDoc from "utils/searchFirestoreDoc";
import { addFeedBookmarkUserUid, addFeedLikeUserUid, removeFeedBookmarkUserUid, removeFeedLikeUserUid } from "store/feedsSlice";
import { addBookmarkFeedRef, addLikeFeedRef, removeBookmarkFeedRef, removeLikeFeedRef } from "store/usersSlice";
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

  const onLikeFeed = async () => {
    if (!myInfo) return alert('먼저 로그인을 해주세요!')
    const { searchedDocRef: feedDocRef, searchedData: feedData } = await searchFirestoreDoc(`feeds/${feedId}`)
    const { searchedDocRef: userDocRef, searchedData: userData } = await searchFirestoreDoc(`users/${myInfo.uid}`)
    if (AmILiked) { // unlike
      const removedFeedLikes = feedData!.likes.filter((userUid: string) => userUid !== myInfo.uid)
      await updateDoc(feedDocRef, { likes: removedFeedLikes })
      const removedLikeFeeds = userData!.likeFeeds.filter((feedRef: string) => feedRef !== `feeds/${feedId}`)
      await updateDoc(userDocRef, { likeFeeds: removedLikeFeeds })
      dispatch(removeFeedLikeUserUid({ feedId, userUid: userData!.uid }))
      dispatch(removeLikeFeedRef({ feedRef: `feeds/${feedId}` }))
    } else { // like
      await updateDoc(feedDocRef, { likes: [...feedData!.likes, myInfo.uid ] })
      await updateDoc(userDocRef, { likeFeeds: [ ...userData!.likeFeeds, `feeds/${feedId}` ] })
      dispatch(addFeedLikeUserUid({ feedId, userUid: userData!.uid }))
      dispatch(addLikeFeedRef({ feedRef: `feeds/${feedId}` }))
    }
  }

  const onBookmarkFeed = async () => {
    if (!myInfo) return alert('먼저 로그인을 해주세요!')
    const { searchedDocRef: feedDocRef, searchedData: feedData } = await searchFirestoreDoc(`feeds/${feedId}`)
    const { searchedDocRef: userDocRef, searchedData: userData } = await searchFirestoreDoc(`users/${myInfo.uid}`)
    if (AmIMarked) { // unmark
      const removedFeedBookmarks = feedData!.bookmarks.filter((userUid: string) => userUid !== myInfo.uid)
      await updateDoc(feedDocRef, { bookmarks: removedFeedBookmarks })
      const removedBookmarkFeeds = userData!.bookmarkFeeds.filter((feedRef: string) => feedRef !== `feeds/${feedId}`)
      await updateDoc(userDocRef, { bookmarkFeeds: removedBookmarkFeeds })
      dispatch(removeFeedBookmarkUserUid({ feedId, userUid: userData!.uid }))
      dispatch(removeBookmarkFeedRef({ feedRef: `feeds/{feedId}` }))
    } else { // mark
      await updateDoc(feedDocRef, { bookmarks: [ ...feedData!.bookmarks, myInfo.uid] })
      await updateDoc(userDocRef, { bookmarkFeeds: [ ...userData!.bookmarkFeeds, `feeds/${feedId}` ]  })
      dispatch(addFeedBookmarkUserUid({ feedId, userUid: userData!.uid }))
      dispatch(addBookmarkFeedRef({ feedRef: `feeds/${feedId}` }))
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
        <IconButton aria-label="bookmark" onClick={onBookmarkFeed}>
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
