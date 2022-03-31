import { FC, useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import ProfileFeeds from "components/profile/tabs/ProfileFeeds";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ pt: 2 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const ProfileTabs: FC = () => {
  const [tab, setTab] = useState(0)

  const handleChangeTab = (e: React.SyntheticEvent, newValue: number) => setTab(newValue);

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleChangeTab}>
          <Tab label="게시글" />
          <Tab label="좋아요한 글" />
          <Tab label="찜한 맛집" />
          <Tab label="찜한 숙소" />
        </Tabs>
      </Box>
      <TabPanel value={tab} index={0}>
        <ProfileFeeds />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        탭2
      </TabPanel>
      <TabPanel value={tab} index={2}>
        탭3
      </TabPanel>
      <TabPanel value={tab} index={3}>
        탭4
      </TabPanel>
    </Box>
  )
}

export default ProfileTabs