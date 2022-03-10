import { FC, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { dbService } from "fireBaseApp/fBase";
import { Stack } from "@mui/material";
import Feed from "components/feeds/feed/Feed";
import searchUserInfo from "lib/searchUserInfo";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { clearFeeds, setFeeds } from "store/feedsSlice";

const FeedContainer: FC = () => {
  const dispatch = useAppDispatch()
  const feeds = useAppSelector(state => state.feeds.value)

  const getFeeds = async () => {
    dispatch(clearFeeds())
    const feedDocRef = collection(dbService, "feeds")
    const queryInstance = query(feedDocRef, orderBy("createdAt", "desc"))
    const documentSnapshots = await getDocs(queryInstance)
    const result = documentSnapshots.docs.map(async (doc) => {
      const userData = await searchUserInfo(doc.data().userUid)
      const docData = doc.data()
      return {
        id: doc.id,
        userUid: docData.userUid,
        feedText: docData.feedText,
        feedImages: docData.feedImages,
        likes: docData.likes,
        bookmarks: docData.bookmarks,
        comments: docData.comments,
        createdAt: docData.createdAt,
        modifiedAt:docData.modifiedAt,
        nickname: userData!.nickname,
        profileImg: userData!.profileImg,
      }
    })
    result.map(promise => promise.then(res => dispatch(setFeeds(res))))
  }

  useEffect(() => {
    getFeeds()
  }, [])
  console.log(feeds)

  return (
    <Stack direction="column" spacing={2}>
      {feeds.map(feed => (
        <Feed key={`${feed.id}/${feed.createdAt}`} feedData={feed}  />
      ))}
    </Stack>
  )
}

export default FeedContainer