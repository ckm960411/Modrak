import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Stack } from "@mui/material";
import Feed from "components/feeds/feed/Feed";
import { useAppDispatch } from "store/hooks";
import { clearFeeds } from "store/feedsSlice";
import useLoadingFeeds from "utils/useLoadingFeeds";

const FeedContainer: FC = () => {
  const dispatch = useAppDispatch()
  const targetRef = useRef<HTMLDivElement>(null)
  const [isFetching, setIsFetching] = useState(false)
  const [initialLoad, setInitialLoad] = useState(true)
  const { feeds } = useLoadingFeeds(initialLoad, isFetching, setIsFetching)

  const loadMoreFeeds = useCallback( async () => {
    setInitialLoad(false)
    setIsFetching(true)
  }, [])

  useEffect(() => {
    setIsFetching(true)
    dispatch(clearFeeds())
  }, [dispatch])

  useEffect(() => {
    let observer: IntersectionObserver
    if (targetRef.current) {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) loadMoreFeeds()
      }, {})
      observer.observe(targetRef.current)
    }
    return () => observer && observer.disconnect()
  }, [loadMoreFeeds])

  return (
    <Stack direction="column" spacing={2}>
      {feeds.map(feed => <Feed key={`${feed.id}/${feed.createdAt}`} feedData={feed} />)}
      <div ref={targetRef} style={{ width: '100%', height: '30px', backgroundColor: 'transparent' }}></div>
    </Stack>
  )
}

export default FeedContainer