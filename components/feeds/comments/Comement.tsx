import { FC, useState } from "react";
import styled from "@emotion/styled";
import { Avatar, Card, CardHeader, Divider, Typography } from "@mui/material";
import EditMenu from "components/parts/EditMenu";

const NicknameTypo = styled(Typography)`
  font-family: 'Katuri';
  color: #353535;
`

const Comment: FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () =>  setAnchorEl(null);

  const onEditComment = () => {
    // setEditing(true)
    handleClose()
  }

  const onDeleteComment = () => {
    handleClose()
  }

  return (
    <Card>
      <Divider sx={{ ml: 2, mr: 2 }} />
      <CardHeader
        id="comment-header"
        avatar={<Avatar alt="닉네임" src="https://firebasestorage.googleapis.com/v0/b/modrak-c7468.appspot.com/o/FJwflfhOqWSu0zXXD7BbZqj3FTu2%2F186686b7-c50d-4cbb-8e27-658706601994?alt=media&token=cb4be561-0d2f-4df0-bcbf-73cc6c199b01" />}
        title={<NicknameTypo>{'짱버츠'}</NicknameTypo>}
        subheader={
          <div>
            <Typography variant="body2" sx={{ color: '#000', mb: '6px' }}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio error dolorem odit porro tenetur repellat maiores magni veritatis nam. Quas.
            </Typography>
            <Typography variant="caption" component="div">2022년 03월 14일 05시 42분 (1초 전)</Typography>
          </div>
        }
        action={
          <EditMenu
            userUid={`OqIL4ckT2qc9t3hpxutUk3QQ9Rp2`}
            anchorEl={anchorEl}
            handleClick={handleClick}
            handleClose={handleClose}
            onEditContent={onEditComment}
            onDeleteContent={onDeleteComment}
          />
        }
      />
    </Card>
  )
}

export default Comment