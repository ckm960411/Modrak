import { FC } from "react";
import useLoadingComments from "utils/useLoadingComments";
import Comment from "./Comement";

const Comments: FC<{feedId: string}> = ({ feedId }) => {
  const { comments } = useLoadingComments(feedId)

  return (
    <>
      {comments?.map((comment) => (
        <Comment
          key={`${comment.feedId}/${comment.createdAt}`} 
          comment={comment}
        />
      ))}
    </>
  )
}

export default Comments