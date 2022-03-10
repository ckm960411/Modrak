import { FC, useState } from "react";
import { Card } from "@mui/material";
import { FeedWithUserInfoType } from "types/feedTypes";
import FeedHeader from "components/feeds/feed/FeedHeader";
import FeedImages from "components/feeds/feed/FeedImages";
import FeedContent from "components/feeds/feed/FeedContent";
import FeedActions from "components/feeds/feed/FeedActions";
import FeedComments from "components/feeds/feed/FeedComments";

const Feed: FC<{feedData: FeedWithUserInfoType}> = ({ feedData }) => {
  const [expanded, setExpanded] = useState(false);
  
  const { feedText, feedImages, likes, comments } = feedData

  return (
    <Card raised>
      <FeedHeader feedData={feedData} />
      <FeedImages images={feedImages} />
      <FeedContent text={feedText} />
      <FeedActions likes={likes} expanded={expanded} setExpanded={setExpanded} />
      <FeedComments comments={comments} expanded={expanded} />
    </Card>
  )
}

export default Feed