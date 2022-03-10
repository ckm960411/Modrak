import { FC } from "react";
import { CardContent, Typography } from "@mui/material";

const FeedContent: FC<{text: string}> = ({ text }) => {
  return (
    <CardContent>
      <Typography variant="body2">{text}</Typography>
    </CardContent>
  );
};

export default FeedContent;
