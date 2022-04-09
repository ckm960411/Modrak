import { FC } from "react";
import { Card, CardHeader, Typography } from "@mui/material";
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { onCheckPush } from "store/asyncFunctions";

const PushCard: FC<{push: PushType, userUid: string}> = ({ push, userUid }) => {
  const dispatch = useAppDispatch()
  const myInfo = useAppSelector(state => state.users.myInfo!)

  const { pushId, isChecked, message, createdAt } = push

  const handleCheckPush = async () => {
    dispatch(onCheckPush({ uid: myInfo.uid, pushId }))
  }

  return (
    <Card raised>
      <CardHeader
        title={
          <Typography sx={{ fontSize: "16px", fontFamily: 'Katuri' }}>
            <span style={isChecked ? { color: '#777' } : { color: "#000" }}>{message}</span>
          </Typography>
        }
        subheader={<Typography variant="caption">{format(createdAt, "yyyy년 MM월 dd일")}</Typography>}
        onClick={handleCheckPush}
        sx={{ cursor: "pointer" }}
      />
    </Card>
  );
};

export default PushCard;
