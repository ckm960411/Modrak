import { FC, useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import { Card, CardContent, Collapse, Divider, MenuItem, Select, SelectChangeEvent, Stack, useTheme, Typography, useMediaQuery, Button } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { mainColor } from "styles/GlobalStyles";

const divisions: DivisionType[] = [ "전체 지역", "제주시", "애월", "한경/한림", "대정/안덕", "서귀포", "남원", "표선/성산", "구좌", "조천" ]

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
  const [expanded, setExpanded] = useState(false);

  const theme = useTheme()
  const downSm = useMediaQuery(theme.breakpoints.down('sm'))

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setDivisionSelect(event.target.value as DivisionType);
  };
  
  useEffect(() => {
    if (downSm) setExpanded(true)
  }, [downSm])

  return (
    <>
      <Card raised>
        <CardContent>
          <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <>{downSm || <Typography>현재 보고 계신 지역은</Typography>}</>
            <Select
              labelId="division-select"
              id="division-select"
              size="small"
              value={divisionSelect}
              onChange={handleChange}
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
              <Button variant="contained">전체</Button>
              <Button variant="outlined">한식/분식</Button>
              <Button variant="outlined">양식</Button>
              <Button variant="outlined">일식/중식</Button>
              <Button variant="outlined">카페</Button>
            </Stack>
          </CardContent>
        </Collapse>
      </Card>
    </>
  )
}

export default CategoryBar