import { Grid, Stack, useMediaQuery, useTheme } from "@mui/material";
import FeedContainer from "components/feeds/FeedContainer";
import FeedForm from "components/feeds/FeedForm";
import FilterSidebar from "components/feeds/FilterSidebar";
import { NextPage } from "next";
import Head from "next/head";

const Feed: NextPage = () => {
  const theme = useTheme()
  const downLg = useMediaQuery(theme.breakpoints.down("lg"))

  return (
    <>
      <Head>
        <title>Feed | Modrak</title>
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7} order={{ xs: 2, md: 1 }} 
          sx={{ width: '400px', maxWidth: '863px !important', m: '0 auto' }}
        >
          <Stack spacing={2}>
            <FeedForm />
            <FeedContainer />
          </Stack>
        </Grid>
        <Grid item xs={12} md={5} order={{ xs: 1, md: 2 }} 
          sx={{ width: '400px', maxWidth: '863px !important', m: '0 auto' }}
        >
          <FilterSidebar />
        </Grid>
      </Grid>
    </>
  )
}

export default Feed