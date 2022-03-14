import { FC } from "react";
import { CardContent, Chip, Stack, Typography } from "@mui/material";
import { useAppDispatch } from "store/hooks";
import { setSearchTagFilter } from "store/filterSlice";
import { setIsInitialLoad } from "store/feedsSlice";

const FeedContent: FC<{ text: string; tags: string[] }> = ({ text, tags }) => {
  const dispatch = useAppDispatch()
  
  const onClickTag = (tag: string) => () => {
    dispatch(setSearchTagFilter({ tag }))
    dispatch(setIsInitialLoad(true))
  }

  return (
    <>
      <CardContent>
        <Typography variant="body2">{text}</Typography>
      </CardContent>
      {tags[0] && (
        <CardContent sx={{ pt: 0, pb: 0 }}>
          <Stack direction="row" spacing={1}>
            {tags.map((tag, i) => <Chip key={i} label={tag} onClick={onClickTag(tag)} /> )}
          </Stack>
        </CardContent>
      )}
    </>
  );
};

export default FeedContent;
