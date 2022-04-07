import { FC } from "react";
import { useRouter } from "next/router";
import { CardContent, Chip, Typography } from "@mui/material";
import { useAppDispatch } from "store/hooks";
import { setSearchTagFilter } from "store/slices/feedFilterSlice";

const FeedContent: FC<{ text: string; tags: string[] }> = ({ text, tags }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  
  const onClickTag = (tag: string) => () => {
    if (router.route === '/user/[id]') return
    dispatch(setSearchTagFilter({ tag }))
  }

  return (
    <>
      <CardContent>
        <Typography variant="body2">{text}</Typography>
      </CardContent>
      {tags[0] && (
        <CardContent sx={{ pt: 0, pb: 0 }}>
          <div style={{ overflowWrap: 'normal' }}>
            {tags.map((tag, i) => <Chip key={i} label={tag} onClick={onClickTag(tag)} sx={{ margin: '2px' }} /> )}
          </div>
        </CardContent>
      )}
    </>
  );
};

export default FeedContent;
