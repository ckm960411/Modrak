import { FC } from "react";
import { CardContent, Chip, Stack, Typography } from "@mui/material";

const FeedContent: FC<{ text: string; tags: string[] }> = ({ text, tags }) => {
  return (
    <>
      <CardContent>
        <Typography variant="body2">{text}</Typography>
      </CardContent>
      {tags[0] && (
        <CardContent sx={{ pt: 0, pb: 0 }}>
          <Stack direction="row" spacing={1}>
            {tags.map((tag, i) => <Chip key={i} label={tag} onClick={() => console.log(tag)} /> )}
          </Stack>
        </CardContent>
      )}
    </>
  );
};

export default FeedContent;
