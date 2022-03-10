import { FC } from "react";
import { CardContent, Collapse, Divider } from "@mui/material";

type FeedCommentsProps = {
  expanded: boolean
  comments: string[]
}

const FeedComments: FC<FeedCommentsProps> = ({ expanded, comments }) => {
  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <Divider />
      <CardContent>
        댓글
      </CardContent>
    </Collapse>
  );
};

export default FeedComments;
