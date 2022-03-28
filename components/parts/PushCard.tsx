import { FC, useState } from "react";
import { Card, CardHeader, Typography } from "@mui/material";
import { format } from "date-fns";
import { updateDoc } from "firebase/firestore";
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc"
import { useAppDispatch } from "store/hooks";
import { removeCheckedPush } from "store/slices/usersSlice";

const PushCard: FC<{push: PushType, userUid: string}> = ({ push, userUid }) => {
  const dispatch = useAppDispatch()

  const { pushId, isChecked, message, createdAt } = push

  const onCheckPush = async () => {
    // 전체 알림 목록에서 확인안 된 알림 클릭시 확인됨으로 처리
    const { searchedDocRef: pushDocRef, searchedData: pushData } = await searchFirestoreDoc(`pushes/${userUid}`)
    const pushFinded = pushData!.pushes.find((push: PushType) => push.pushId === pushId)
    pushFinded.isChecked = true
    await updateDoc(pushDocRef, { pushes: pushData!.pushes })
    // 알림 클릭시 확인안된 알림에서 제거
    const { searchedDocRef: userRef, searchedData: userData } = await searchFirestoreDoc(`users/${userUid}`)
    const removedPushes = userData!.pushUnchecked.filter((push: PushType) => push.pushId !== pushId)
    await updateDoc(userRef, { pushUnchecked: removedPushes })
    dispatch(removeCheckedPush({ pushId }))
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
        onClick={onCheckPush}
        sx={{ cursor: "pointer" }}
      />
    </Card>
  );
};

export default PushCard;
