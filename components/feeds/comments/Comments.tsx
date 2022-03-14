import { Button, Divider } from "@mui/material";
import { FC } from "react";
import useLoadingComments from "utils/useLoadingComments";
import Comment from "./Comement";

const Comments: FC<{feedId: string}> = ({ feedId }) => {
  const { comments, setLoadMore, hasMore } = useLoadingComments(feedId)

  // 댓글 3개 더 불러오기
  const onLoadMoreComments = () => {
    setLoadMore(prev => prev +1)
  }
  // 첫댓글 3개만 표시하기
  const onFoldComments = () => {
    setLoadMore(1)
  }

  return (
    <>
      <div>
        {comments.map(comment => <Comment key={`${comment.feedId}/${comment.createdAt}`} comment={comment} />)}
      </div>
      <Divider sx={{ ml: 2, mr: 2 }} />
      <div style={{ textAlign: 'center' }}>
        {hasMore ? ( // 전체 댓글을 불러오면 접기 버튼으로 바꿈
          <Button onClick={onLoadMoreComments}>더보기</Button>
        ): (
          <Button onClick={onFoldComments}>접기</Button>
        )}
      </div>
    </>
  )
}

export default Comments