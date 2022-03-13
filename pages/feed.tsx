import { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Grid, Stack, useMediaQuery, useTheme, SpeedDial, SpeedDialIcon, SpeedDialAction, Dialog} from "@mui/material";
import FeedContainer from "components/feeds/FeedContainer";
import FeedForm from "components/feeds/FeedForm";
import FeedFilterSidebar from "components/feeds/sidebar/FeedFilterSidebar";
import FeedSearchForm from "components/feeds/sidebar/FeedSearchForm";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import SortIcon from '@mui/icons-material/Sort';

const Feed: NextPage = () => {
  const theme = useTheme()
  const downLg = useMediaQuery(theme.breakpoints.down("lg"))
  const [filterOpened, setFilterOpened] = useState(false)

  const onCloseFilter = () => setFilterOpened(false)

  useEffect(() => {
    if (!downLg) setFilterOpened(false)
  }, [downLg])

  return (
    <>
      <Head>
        <title>Feed | Modrak</title>
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={7} order={{ xs: 2, lg: 1 }} 
          sx={{ width: '400px', maxWidth: '863px !important', m: '0 auto' }}
        >
          <Stack spacing={2}>
            <FeedForm />
            <FeedContainer />
          </Stack>
        </Grid>
        <Grid item xs={12} lg={5} order={{ xs: 1, lg: 2 }} 
          sx={{ width: '400px', maxWidth: '863px !important', m: '0 auto' }}
        >
          <Stack spacing={2}>
            <>
              <FeedSearchForm />
              {downLg || <FeedFilterSidebar filterOpened={filterOpened} />}
            </>
          </Stack>
        </Grid>
      </Grid>

      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: '4%', right: '4%' }}
        icon={<SpeedDialIcon />}
      >
        {downLg && <SpeedDialAction icon={<SortIcon />} tooltipTitle="정렬 필터" onClick={() => setFilterOpened(true)} />}
        <SpeedDialAction icon={<ArrowUpwardIcon />} tooltipTitle="위로 가기" />
      </SpeedDial>
      <Dialog open={filterOpened} onClose={onCloseFilter} maxWidth="xs" fullWidth>
        <FeedFilterSidebar filterOpened={filterOpened} onClose={onCloseFilter} />
      </Dialog>
    </>
  )
}

export default Feed