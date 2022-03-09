import { FC, useEffect, useState } from "react";
import Feed from "components/feeds/Feed";
import { Stack } from "@mui/material";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "fireBaseApp/fBase";
import { FeedType } from "types/feedTypes";

const FeedContainer: FC = () => {
  const [feeds, setFeeds] = useState<FeedType[]>([]) // 일단 임시로 any

  useEffect(() => {
    // realtime 으로 피드 불러오기
    const feedDocRef = collection(dbService, "feeds")
    const queryInstance = query(feedDocRef, orderBy("createdAt", "desc"))
    onSnapshot(queryInstance, (snapshot) => {
      const feedsArray = snapshot.docs.map(doc => ({
        id: doc.id, // doc.id 는 한개 문서의 id 를 말함
        ...doc.data(), // doc.data()에는 feedText, userUid 등의 필드 정보가 담김
      }))
      setFeeds(feedsArray as FeedType[])
    })
  }, [])

  return (
    <Stack direction="column" spacing={2}>
      {feeds.map(feed => (
        <Feed key={feed.id} feedData={feed}  />
      ))}
    </Stack>
  )
}

export default FeedContainer