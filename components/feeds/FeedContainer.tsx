import { FC, RefObject } from "react";
import { Stack } from "@mui/material";
import Feed from "components/feeds/feed/Feed";

type FeedContainerProps = {
  feeds: FeedWithUserInfoType[]
  targetRef: RefObject<HTMLDivElement>
}

const FeedContainer: FC<FeedContainerProps> = ({ feeds, targetRef }) => {
  return (
    <Stack direction="column" spacing={2}>
      {feeds.map(feed => <Feed key={`${feed.id}/${feed.createdAt}`} feedData={feed} />)}
      <div ref={targetRef} style={{ width: '100%', height: '30px', backgroundColor: 'transparent' }}></div>
    </Stack>
  )
}

export default FeedContainer