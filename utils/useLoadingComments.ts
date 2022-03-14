import { useEffect, useState } from "react";
import searchFirestoreDoc from "utils/searchFirestoreDoc";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setComments, clearComments } from "store/feedsSlice";

const LoadMoreCommentLength = 3 // 한번에 가져올 댓글의 개수

const useLoadingComments = (feedId: string) => {
  const [nextLength, setNextLength] = useState(0) // 가져오려는 댓글의 인덱스 범위 (nextLength -3 ~ nextLength)
  const [loadMore, setLoadMore] = useState(1) // 댓글을 요청한 횟수
  const [hasMore, setHasMore] = useState(true)  // 가져올 댓글이 더 있는지

  const dispatch = useAppDispatch()
  const feeds = useAppSelector(state => state.feeds.value)
  const comments = feeds.find(feed => feed.id === feedId)!.comments

  // 첫 댓글을 로드하는 함수
  const loadComments = async () => {
    const { searchedData: commentData } = await searchFirestoreDoc(`comments/${feedId}`)
    if (!commentData) return
    // 가장 최근 댓글부터 순차적으로 3개만 먼저 로드
    for (let i = commentData.comments.length -1; i  >= commentData.comments.length - 3 && i >= 0; i--) {
      setNextLength(commentData.comments.length - LoadMoreCommentLength)
      const comment = commentData.comments[i]
      const { searchedData: userData } = await searchFirestoreDoc(`users/${comment.userUid}`)
      const commentWithUserInfo: CommentWithUserInfoType = {
        ...comment,
        nickname: userData!.nickname,
        profileImg: userData!.profileImg,
      }
      dispatch(setComments(commentWithUserInfo))
    }
  }

  // 두번째부터 더보기로 댓글을 로드하는 함수
  const loadMoreComments = async () => {
    if (!hasMore) return

    const { searchedData: commentData } = await searchFirestoreDoc(`comments/${feedId}`)
    if (!commentData) return
    // 이전에 불러온 댓글 다음부터 순차적으로 3개씩 로드
    for (let i = nextLength -1; i >= nextLength -3 && i >= 0; i--) {
      setNextLength(nextLength - LoadMoreCommentLength)
      const comment = commentData.comments[i]
      const { searchedData: userData } = await searchFirestoreDoc(`users/${comment.userUid}`)
      const commentWithUserInfo: CommentWithUserInfoType = {
        ...comment,
        nickname: userData!.nickname,
        profileImg: userData!.profileImg,
      }
      dispatch(setComments(commentWithUserInfo))
    }
  }

  useEffect(() => {
    if (loadMore === 1) {
      dispatch(clearComments({ feedId })) // 처음 댓글창을 펼칠 때 기존 댓글들은 지움
      setHasMore(true) // 처음 댓글창을 펼칠 때 hasMore 을 true 로 변환
      loadComments() // 첫 댓글 3개 로드
    } else {
      loadMoreComments() // 두번째 이후 3개씩 로드
    }
  }, [loadMore, feedId])

  useEffect(() => {
    if (loadMore !== 1 && nextLength <= 0) setHasMore(false) // 두번째 로드이후에서 더 로드할 댓글이 없다면
  }, [nextLength, loadMore])

  return {
    comments, setLoadMore, hasMore
  }
}

export default useLoadingComments