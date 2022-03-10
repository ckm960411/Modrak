import { FC, useState } from "react";
import { Button, Card, CardContent, Stack, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const FeedSearchForm: FC = () => {
  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Card raised>
      <CardContent>
        <Stack direction="row" spacing={1}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="feed-search-select">검색 필터</InputLabel>
            <Select
              labelId="feed-search-select"
              id="feed-search-select"
              label="검색 필터"
              value={age}
              onChange={handleChange}
            >
              <MenuItem value={10}>통합검색</MenuItem>
              <MenuItem value={20}>사용자</MenuItem>
              <MenuItem value={30}>내용</MenuItem>
              <MenuItem value={40}>태그</MenuItem>
            </Select>
          </FormControl>
          <TextField label="검색 하기" id="feed-search-label" type="search" sx={{ flexGrow: 1 }} />
          <Button variant="contained">검색</Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default FeedSearchForm;
