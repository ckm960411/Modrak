import { Dispatch, FC, SetStateAction } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { Button, CardContent, Divider, Menu, MenuItem, Typography } from "@mui/material";
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { onRemoveCheckedPush } from "store/asyncFunctions";

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
  
  const handleCheckPush = (pushId: string) => async () => {
    dispatch(onRemoveCheckedPush({ uid: myInfo!.uid, pushId }))
    handleClose()
  }
  const handleLoadMorePushes = () => {
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
              <MenuItem onClick={handleCheckPush(push.pushId)}>
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
        <Button sx={{ width: '100%' }} onClick={handleLoadMorePushes}>알림 더보기</Button>
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