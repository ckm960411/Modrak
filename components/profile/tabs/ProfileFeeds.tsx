import { FC, useRef } from "react";
import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import { where } from "firebase/firestore";
import { useAppSelector } from "store/hooks";
import useLoadingFeeds from "utils/hooks/useLoadingFeeds";
import Feed from "components/feeds/feed/Feed";

const ProfileFeeds: FC = () => {
  const targetRef = useRef<HTMLDivElement>(null)
  const userData = useAppSelector(state => state.profile.userData!)

  const { feeds } = useLoadingFeeds(targetRef, [ where("userUid", "==", userData.uid) ])

  return (
    <div>
      <Stack spacing={2}>
        {feeds.map(feed => <Feed key={`${feed.id}/${feed.createdAt}`} feedData={feed} />)}
      </Stack>
      <TargetDiv ref={targetRef} />
    </div>
  )
}

const TargetDiv = styled.div`
  height: 100px;
`

export default ProfileFeeds