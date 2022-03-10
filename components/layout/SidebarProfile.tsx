import { FC } from "react";
import { useAppSelector } from "store/hooks";
import { Avatar, Card, CardActions, CardContent, IconButton, Stack, Typography } from "@mui/material";
import MoreIcon from '@mui/icons-material/MoreVert';
import Image from "next/image";
import defaultImg from "public/imgs/profileImg.png"

const SidebarProfile: FC = () => {
  const myInfo = useAppSelector(state => state.users.myInfo)

  return (
    <Card sx={{ margin: 1, padding: "6px", boxShadow: "none" }}>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Avatar sx={{ width: 40, height: 40, backgroundColor: '#dbdbdb' }}>
          {myInfo.profileImg ? (
            <Image alt={myInfo.nickname} src={myInfo.profileImg} layout="fill" />
          ): (
            <Image alt={myInfo.nickname} src={defaultImg} />
          )}
        </Avatar>
        <IconButton>
          <MoreIcon />
        </IconButton>
      </CardActions>
      <CardContent sx={{ padding: '8px !important' }}>
        <Stack>
          <Typography variant="subtitle1" sx={{ color: '#353535', fontFamily: 'Katuri' }}>
            {myInfo.nickname}
          </Typography>
          <Typography variant="subtitle2">
            {myInfo.email}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SidebarProfile;
