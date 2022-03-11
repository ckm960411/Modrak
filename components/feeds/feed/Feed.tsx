import { FC, useState } from "react";
import { Card } from "@mui/material";
import FeedHeader from "components/feeds/feed/FeedHeader";
import FeedImages from "components/feeds/feed/FeedImages";
import FeedContent from "components/feeds/feed/FeedContent";
import FeedActions from "components/feeds/feed/FeedActions";
import FeedComments from "components/feeds/feed/FeedComments";
import EditFeedModal from "components/feeds/EditFeedModal";

const Feed: FC<{ feedData: FeedWithUserInfoType }> = ({ feedData }) => {
  const [expanded, setExpanded] = useState(false)
  const [editing, setEditing] = useState(false)

  const { feedText, feedImages, likes, comments } = feedData;

  return (
    <Card raised>
      {editing && <EditFeedModal feedData={feedData} editing={editing} setEditing={setEditing} />}
      <FeedHeader feedData={feedData} editing={editing} setEditing={setEditing} />
      <FeedImages images={feedImages} />
      <FeedContent text={feedText} />
      <FeedActions likes={likes} expanded={expanded} setExpanded={setExpanded} />
      <FeedComments comments={comments} expanded={expanded} />
    </Card>
  )
}

export default Feed