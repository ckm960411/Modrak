import { FC } from "react";
import { Collapse, Divider } from "@mui/material";
import CommentForm from "components/feeds/comments/CommentForm";
import Comments from "components/feeds/comments/Comments";

type FeedCommentsProps = {
  feedId: string
  expanded: boolean
}

const FeedComments: FC<FeedCommentsProps> = ({ expanded, feedId }) => {

  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <Divider />
      <CommentForm feedId={feedId} />
      <Comments feedId={feedId} />
    </Collapse>
  );
};

export default FeedComments;
