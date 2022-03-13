import { FC } from "react";
import { Collapse, Divider } from "@mui/material";
import CommentForm from "components/feeds/comments/CommentForm";
import Comment from "components/feeds/comments/Comement";

type FeedCommentsProps = {
  expanded: boolean
  comments: string[]
}

const FeedComments: FC<FeedCommentsProps> = ({ expanded, comments }) => {
  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <Divider />
      <CommentForm />
      <Comment />
      <Comment />
      <Comment />
    </Collapse>
  );
};

export default FeedComments;
