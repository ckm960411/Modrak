import { FC, useEffect } from "react";
import { Stack } from "@mui/material";
import Feed from "components/feeds/feed/Feed";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { clearFeeds, setFeeds } from "store/feedsSlice";
import getFeeds from "lib/getFeeds";

const FeedContainer: FC = () => {
  const dispatch = useAppDispatch()
  const feeds = useAppSelector(state => state.feeds.value)

  const clearFeedsState = () => dispatch(clearFeeds())
  const setFeedsState = (payload: any) => dispatch(setFeeds(payload))

  useEffect(() => {
    getFeeds(clearFeedsState, setFeedsState)
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