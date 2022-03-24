import React, { FC, useState } from "react";
import { Button, Card, CardContent, Stack, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { collection, getDocs, query, where } from "firebase/firestore";
import { dbService } from "fireBaseApp/fBase";
import { useAppDispatch } from "store/hooks";
import { setSearchNicknameFilter, setSearchTagFilter } from "store/slices/filterSlice";
import { setIsInitialLoad } from "store/slices/feedsSlice";

type SearchFilterType = "nickname" | "tag"

const FeedSearchForm: FC = () => {
  const [searchFilter, setSearchFilter] = useState<SearchFilterType>("nickname")
  const [keyword, setKeyword] = useState("")

  const dispatch = useAppDispatch()

  const handleChange = (event: SelectChangeEvent) => {
    setSearchFilter(event.target.value as SearchFilterType);
  };

  const onChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const onSearch = async () => {
    // 닉네임으로 검색할 경우
    if (searchFilter === "nickname") {
      const usersCollectionRef = collection(dbService, "users")
      const queryInstance = query(usersCollectionRef, where("nickname", "==", keyword))
      await getDocs(queryInstance).then(res => {
        if (!res.docs[0]) {
          return alert('해당하는 닉네임의 사용자가 없습니다!')
        } else {
          const userData = res.docs[0].data()
          dispatch(setSearchNicknameFilter({ userUid: userData.uid! }))
          dispatch(setIsInitialLoad(true))
        }
      })
    // 태그로 검색할 경우
    } else if (searchFilter === "tag") {
      dispatch(setSearchTagFilter({ tag: keyword }))
      dispatch(setIsInitialLoad(true))
    }
  }

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
              value={searchFilter}
              onChange={handleChange}
            >
              <MenuItem value="nickname">닉네임</MenuItem>
              <MenuItem value="tag">태그</MenuItem>
            </Select>
          </FormControl>
          <TextField 
            value={keyword}
            onChange={onChangeKeyword}
            label="검색 하기" 
            id="feed-search-label" 
            type="search" 
            sx={{ flexGrow: 1 }} 
          />
          <Button variant="contained" onClick={onSearch}>검색</Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default FeedSearchForm;
