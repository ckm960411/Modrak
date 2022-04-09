import { FC, useState } from "react";
import styled from "@emotion/styled";
import { Avatar, Card, CardHeader, Divider, Typography } from "@mui/material";
import { useAppDispatch } from "store/hooks";
import { onDeleteComment } from "store/asyncFunctions";
import { showAlert } from "store/slices/appSlice";
import useSetTimeDistance from "utils/hooks/useSetTimeDistance";
import defaultImg from "public/imgs/profileImg.png"
import EditMenu from "components/parts/EditMenu";
import CommentEditForm from "components/feeds/comments/CommentEditForm";

const Comment: FC<{comment: CommentWithUserInfoType}> = ({ comment }) => {
  const [editing, setEditing] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const dispatch = useAppDispatch()
  const { id: commentId, feedId, userUid, commentText, createdAt, modifiedAt, nickname, profileImg } = comment
  const { date, timeAgo } = useSetTimeDistance(createdAt, modifiedAt)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () =>  setAnchorEl(null);

  const handleEditComment = () => {
    setEditing(true)
    handleClose()
  }

  const handleDeleteComment = async () => {
    const ok = window.confirm('이 댓글을 정말 삭제하시겠습니까?')
    if (!ok) return handleClose()
    dispatch(onDeleteComment({ feedId, commentId })).then(() => {
      dispatch(showAlert({ isShown: true, message: "댓글 삭제가 완료되었습니다!" }))
    })
    handleClose()
  }

  return (
    <Card sx={{ boxShadow: 'none' }}>
      <Divider sx={{ ml: 2, mr: 2 }} />
      {editing ? (
        <CommentEditForm setEditing={setEditing} comment={comment} />
      ) : (
        <CardHeader
          id="comment-header"
          avatar={<Avatar alt={nickname} src={profileImg ? profileImg : defaultImg.src} />}
          title={<NicknameTypo>{nickname}</NicknameTypo>}
          subheader={
            <div>
              <Typography variant="body2" sx={{ color: '#000', mb: '6px' }}>
                {commentText}
              </Typography>
              <Typography variant="caption" component="div">{`${date} (${timeAgo})`}</Typography>
            </div>
          }
          action={
            <EditMenu
              userUid={userUid}
              anchorEl={anchorEl}
              handleClick={handleClick}
              handleClose={handleClose}
              onEditContent={handleEditComment}
              onDeleteContent={handleDeleteComment}
            />
          }
        />
      )}
    </Card>
  )
}

const NicknameTypo = styled(Typography)`
  font-family: 'Katuri';
  color: #353535;
`

export default Comment