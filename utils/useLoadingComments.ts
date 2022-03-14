import { useEffect } from "react";
import searchFirestoreDoc from "utils/searchFirestoreDoc";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setComments, clearComments } from "store/feedsSlice";

const useLoadingComments = (feedId: string) => {
  const dispatch = useAppDispatch()
  const feeds = useAppSelector(state => state.feeds.value)
  const comments = feeds.find(feed => feed.id === feedId)?.comments

  const loadComments = async () => {
    const { searchedData: commentData } = await searchFirestoreDoc(`comments/${feedId}`)
    if (!commentData) return
    commentData.comments.map(async (comment: CommentType) => {
      const { searchedData: userData} = await searchFirestoreDoc(`users/${comment.userUid}`)
      const commentWithUserInfo: CommentWithUserInfoType = {
        ...comment,
        nickname: userData!.nickname,
        profileImg: userData!.profileImg,
      }
      dispatch(setComments(commentWithUserInfo))
    })
  }

  useEffect(() => {
    loadComments()
    return () => { dispatch(clearComments({ feedId })) }
  }, [])

  return {
    comments
  }
}

export default useLoadingComments