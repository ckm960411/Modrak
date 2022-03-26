import { FC, useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import RoomInfo from "@roomDetail/body/tabs/RoomInfo";
import RoomReservation from "@roomDetail/body/tabs/RoomReservation";
import RoomReviews from "@roomDetail/body/tabs/RoomReviews";

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

const AccommodationTabs: FC = () => {
  const [tab, setTab] = useState(0)

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleChangeTab}>
          <Tab label="객실 안내/예약" />
          <Tab label="숙소 정보" />
          <Tab label="리뷰" />
        </Tabs>
      </Box>
      <TabPanel value={tab} index={0}>
        <RoomReservation />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <RoomInfo />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <RoomReviews />
      </TabPanel>
    </Box>
  );
};

export default AccommodationTabs;
