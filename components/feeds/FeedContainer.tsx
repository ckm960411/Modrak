import { FC, useRef } from "react";
import { Stack } from "@mui/material";
import Feed from "components/feeds/feed/Feed";
import useLoadingFeeds from "utils/useLoadingFeeds";
  
const FeedContainer: FC = () => {
  const targetRef = useRef<HTMLDivElement>(null)
  const { feeds } = useLoadingFeeds(targetRef)

  return (
    <Stack direction="column" spacing={2}>
      {feeds.map(feed => <Feed key={`${feed.id}/${feed.createdAt}`} feedData={feed} />)}
      <div ref={targetRef} style={{ width: '100%', height: '30px', backgroundColor: 'transparent' }}></div>
    </Stack>
  )
}

export default FeedContainer