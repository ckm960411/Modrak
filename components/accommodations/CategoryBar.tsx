import React, { FC, useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import { Card, CardContent, Collapse, Divider, MenuItem, Select, SelectChangeEvent, Stack, useTheme, Typography, useMediaQuery, Button } from "@mui/material";
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { mainColor } from "styles/GlobalStyles";
import { useAppDispatch } from "store/hooks";
import { setCategoryFilter, setDivisionFilter } from "store/slices/roomsSlice";

const divisions: DivisionType[] = [ "전체 지역", "제주시", "애월", "한경/한림", "대정/안덕", "서귀포", "남원", "표선/성산", "구좌", "조천" ]
type AccommodationCategories = "전체" | "호텔" | "모텔" | "펜션" | "게스트하우스"

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  position: 'absolute',
  top: 0, right: 0,
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CategoryBar: FC = () => {
  const [divisionSelect, setDivisionSelect] = useState<DivisionType>("전체 지역")
  const [accommodationCategory, setAccommodationCategory] = useState<AccommodationCategories>("전체")
  const [expanded, setExpanded] = useState(true);
  const theme = useTheme()
  const downSm = useMediaQuery(theme.breakpoints.down('sm'))

  const dispatch = useAppDispatch()

  const handleExpandClick = () => setExpanded(!expanded);
  // 지역 변경시 해당 지역으로 리스트 새로 로드
  const handleChangeDivision = (e: SelectChangeEvent) => {
    setDivisionSelect(e.target.value as DivisionType)
    dispatch(setDivisionFilter({ division: e.target.value as DivisionType }))
  }
  // 카테고리 변경시 해당 카테고리로 리스트 새로 로드
  const handleCategory = (e: React.MouseEvent<HTMLElement>) => {
    const { innerText } = e.target as HTMLElement
    setAccommodationCategory(innerText as AccommodationCategories)
    dispatch(setCategoryFilter({ category: innerText }))
  }

  useEffect(() => {
    if (downSm) 
      setExpanded(false)
    else
      setExpanded(true)
  }, [downSm])

  return (
    <Card raised sx={{ zIndex: 1 }}>
      <CardContent>
        <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <>{downSm || <Typography>현재 보고 계신 지역은</Typography>}</>
          <Select
            labelId="division-select"
            id="division-select"
            size="small"
            value={divisionSelect}
            onChange={handleChangeDivision}
            sx={{ flexGrow: 1, maxWidth: '160px', fontFamily: 'Katuri' }}
          >
            {divisions.map(division => <MenuItem key={division} value={division}>{division}</MenuItem>)}
          </Select>
          <>{downSm || <Typography>입니다</Typography>}</>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon sx={{ color: mainColor }} />
          </ExpandMore>
        </Stack>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
        <CardContent>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button variant={accommodationCategory === '전체' ? "contained" : "outlined"} onClick={handleCategory}>전체</Button>
            <Button variant={accommodationCategory === '호텔' ? "contained" : "outlined"} onClick={handleCategory}>호텔</Button>
            <Button variant={accommodationCategory === '모텔' ? "contained" : "outlined"} onClick={handleCategory}>모텔</Button>
            <Button variant={accommodationCategory === '펜션' ? "contained" : "outlined"} onClick={handleCategory}>펜션</Button>
            <Button variant={accommodationCategory === '게스트하우스' ? "contained" : "outlined"} onClick={handleCategory}>게스트하우스</Button>
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default CategoryBar