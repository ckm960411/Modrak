import { FC, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Avatar, Card, CardHeader, Divider, Typography } from "@mui/material";
import { format } from "date-fns";
import { updateDoc } from "firebase/firestore";
import { useAppDispatch } from "store/hooks";
import { deleteComment } from "store/feedsSlice";
import formatDistanceToNowKo from "utils/formatDistanceToNowKo";
import searchFirestoreDoc from "utils/searchFirestoreDoc";
import defaultImg from "public/imgs/profileImg.png"
import EditMenu from "components/parts/EditMenu";
import CommentEditForm from "components/feeds/comments/CommentEditForm";

const NicknameTypo = styled(Typography)`
  font-family: 'Katuri';
  color: #353535;
`

const Comment: FC<{comment: CommentWithUserInfoType}> = ({ comment }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [timeAgo, setTimeAgo] = useState<string>("0");
  const [date, setDate] = useState<string>('')
  const [editing, setEditing] = useState(false)

  const dispatch = useAppDispatch()
  const { id, feedId, userUid, commentText, createdAt, modifiedAt, nickname, profileImg } = comment

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () =>  setAnchorEl(null);

  const onEditComment = () => {
    setEditing(true)
    handleClose()
  }

  const onDeleteComment = async () => {
    const ok = window.confirm('이 댓글을 정말 삭제하시겠습니까?')
    if (!ok) return handleClose()

    const { 
      searchedDocRef: commentsDocRef,
      searchedData: commentsData
    } = await searchFirestoreDoc(`comments/${feedId}`)
    const commentsArray = commentsData!.comments
    const filteredComments = commentsArray.filter((comment: CommentType) => comment.id !== id)

    await updateDoc(commentsDocRef, { comments: filteredComments })
    dispatch(deleteComment({ feedId, commentId: id }))

    handleClose()
  }

  useEffect(() => {
    if (createdAt === modifiedAt) {
      setTimeAgo(`${formatDistanceToNowKo(createdAt)} 전`);
      setDate(format(createdAt, 'yyyy년 MM월 d일 H시 m분'))
    } else {
      setTimeAgo(`${formatDistanceToNowKo(modifiedAt)} 전 수정됨`);
      setDate(format(modifiedAt, 'yyyy년 MM월 d일 H시 m분'))
    }
  }, [createdAt, modifiedAt, setTimeAgo]);

  return (
    <Card sx={{ boxShadow: 'none' }}>
      <Divider sx={{ ml: 2, mr: 2 }} />
      {editing ? (
        <CommentEditForm setEditing={setEditing} comment={comment} />
      ): (
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
              onEditContent={onEditComment}
              onDeleteContent={onDeleteComment}
            />
          }
        />
      )}
    </Card>
  )
}

export default Comment