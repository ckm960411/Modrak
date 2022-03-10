import { FC, useState } from "react";
import { Button, Card, CardActions, CardContent, CardHeader, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Typography } from "@mui/material";

type OrderType = "latest" | "famous" | "interest"
type ShowType = "allShow" | "followingOnly" | "myFeedOnly"
type TagType = "allTag" | "restaurantOnly" | "accommodationOnly"

const FeedFilterSidebar: FC<{filterOpened: boolean}> = ({ filterOpened }) => {
  const [order, setOrder] = useState<OrderType>("latest")
  const [show, setShow] = useState<ShowType>("allShow")
  const [tag, setTag] = useState<TagType>("allTag")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if ((e.target as HTMLInputElement).name === 'order') setOrder(e.target.value as OrderType)
    else if ((e.target as HTMLInputElement).name === 'show') setShow(e.target.value as ShowType)
    else setTag(e.target.value as TagType)
  };

  return (
    <Card raised>
      <CardHeader title={<Typography>정렬 필터</Typography>} />
      <Divider />
      <CardContent sx={{ pb: 0 }}>
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>순서</FormLabel>
            <RadioGroup 
              row
              name="order"
              value={order}
              onChange={handleChange}
            >
              <FormControlLabel value="latest" control={<Radio />} label="최신순" />
              <FormControlLabel value="famous" control={<Radio />} label="인기순" />
              <FormControlLabel value="interest" control={<Radio />} label="관심순" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel>표시</FormLabel>
            <RadioGroup 
              row
              name="show"
              value={show}
              onChange={handleChange}
            >
              <FormControlLabel value="allShow" control={<Radio />} label="전체" />
              <FormControlLabel value="followingOnly" control={<Radio />} label="팔로잉" />
              <FormControlLabel value="myFeedOnly" control={<Radio />} label="내 피드" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel>태그</FormLabel>
            <RadioGroup 
              row
              name="tag"
              value={tag}
              onChange={handleChange}
            >
              <FormControlLabel value="allTag" control={<Radio />} label="전체" />
              <FormControlLabel value="restaurantOnly" control={<Radio />} label="맛집만" />
              <FormControlLabel value="accommodationOnly" control={<Radio />} label="숙소만" />
            </RadioGroup>
          </FormControl>
        </Stack>
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end', width: '100%' }}>
          {filterOpened && <Button>닫기</Button>}
          <Button>초기화</Button>
          <Button>정렬하기</Button>
        </Stack>
      </CardActions>

    </Card>
  );
};

export default FeedFilterSidebar;
