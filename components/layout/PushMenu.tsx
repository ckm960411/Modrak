import { Dispatch, FC, SetStateAction } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { Button, CardContent, Divider, Menu, MenuItem, Typography } from "@mui/material";
import { format } from "date-fns";
import { updateDoc } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { removeCheckedPush } from "store/slices/usersSlice";
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc";

interface PushMenuProps {
  open: boolean
  anchorEl: HTMLElement | null
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>
  pushes: PushType[]
}
const PushMenu: FC<PushMenuProps> = ({ open, anchorEl, setAnchorEl, pushes }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const myInfo = useAppSelector(state => state.users.myInfo)

  const handleClose = () => setAnchorEl(null);
  
  const onCheckPush = (pushId: string) => async () => {
    // 알림 클릭시 확인안된 알림에서 제거
    const { searchedDocRef: userRef, searchedData: userData } = await searchFirestoreDoc(`users/${myInfo!.uid}`)
    const removedPushes = userData!.pushUnchecked.filter((push: PushType) => push.pushId !== pushId)
    await updateDoc(userRef, { pushUnchecked: removedPushes })
    dispatch(removeCheckedPush({ pushId }))
    // 알림 클릭시 전체 알림에서 확인 상태로 변경
    const { searchedDocRef: pushDocRef, searchedData: pushData } = await searchFirestoreDoc(`pushes/${myInfo!.uid}`)
    const checkedPush = pushData!.pushes.find((push: PushType) => push.pushId === pushId)
    checkedPush.isChecked = true
    await updateDoc(pushDocRef, {
      pushes: pushData!.pushes
    })
    handleClose()
  }
  const onLoadMorePushes = () => {
    router.push(`/user/push/${myInfo!.uid}`)
    handleClose()
  }

  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <div>
          {pushes[0] ? pushes.map(push => (
            <div key={push.pushId}>
              <MenuItem onClick={onCheckPush(push.pushId)}>
                <PushCard>
                  <Typography variant="subtitle2">{push.message}</Typography>
                  <Typography variant="caption">{format(push.createdAt, 'yyyy년 MM월 d일')}</Typography>
                </PushCard>
              </MenuItem>
              <Divider />
            </div>
          )) : (
            <CardContent sx={{ width: '360px', textAlign: 'center' }}>새로운 알림이 없습니다!</CardContent>
          )}
        </div>
        <Button sx={{ width: '100%' }} onClick={onLoadMorePushes}>알림 더보기</Button>
      </Menu>
    </div>
  )
}

const PushCard = styled.div`
  width: 360px;
  white-space: normal;
  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

export default PushMenu