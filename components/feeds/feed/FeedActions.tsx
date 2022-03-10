import { Dispatch, FC, SetStateAction } from "react";
import { CardActions, Typography } from "@mui/material";
import CommentIcon from "@mui/icons-material/CommentOutlined";
import BookmarkIcon from "@mui/icons-material/BookmarkBorderOutlined";
import LikeIcon from "@mui/icons-material/FavoriteBorderOutlined";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import styled from "@emotion/styled";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(() => ({ marginLeft: "auto" }));

type FeedActionsProps = {
  likes: string[]
  expanded: boolean
  setExpanded: Dispatch<SetStateAction<boolean>>
}

const FeedActions: FC<FeedActionsProps> = ({ likes, expanded, setExpanded }) => {

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
      <div>
        <IconButton aria-label="like">
          <LikeIcon />
        </IconButton>
        <Typography variant="subtitle2" component="span">
          {likes.length} likes
        </Typography>
      </div>
      <div>
        <IconButton aria-label="bookmark">
          <BookmarkIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show comments"
        >
          <CommentIcon />
        </ExpandMore>
      </div>
    </CardActions>
  );
};

export default FeedActions;
