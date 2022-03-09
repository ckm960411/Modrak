import { FC } from "react";
import Feed from "components/feeds/Feed";
import { Stack } from "@mui/material";

const FeedContainer: FC = () => {
  return (
    <Stack direction="column" spacing={2}>
      <Feed />
    </Stack>
  )
}

export default FeedContainer