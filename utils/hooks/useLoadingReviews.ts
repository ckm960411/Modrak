import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { clearReviews, setReviews } from "store/slices/restaurantsSlice"
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc"

const LoadMoreReviewsLength = 3 // 한번에 가져올 리뷰들의 개수

const useLoadingReviews = ( restaurantId: string ) => {
  const [nextLength, setNextLength] = useState(0) // 가져오려는 리뷰의 인덱스 범위 (nextLength -3 ~ nextLength)
  const [loadMore, setLoadMore] = useState(1) // 리뷰를 요청한 횟수
  const [hasMore, setHasMore] = useState(true)  // 가져올 리뷰가 더 있는지

  const dispatch = useAppDispatch()
  const reviews = useAppSelector(state => state.restaurants.reviews)

  // 첫 리뷰들을 로드하는 함수
  const loadReviews = async () => {
    const { searchedData: reviewData } = await searchFirestoreDoc(`reviews/${restaurantId}`)
    if (!reviewData) return
    // 가장 최근의 리뷰부터 순차적으로 3개만 업로드
    for (let i = reviewData.reviews.length -1; i >= reviewData.reviews.length -3 && i >= 0; i--) {
      setNextLength(reviewData.reviews.length - LoadMoreReviewsLength)
      const review: ReviewType = reviewData.reviews[i]
      const { searchedData: userData } = await searchFirestoreDoc(`users/${review.userUid}`)
      const reviewWithUserInfo: ReviewWithUserInfo = {
        ...review,
        nickname: userData!.nickname,
        profileImg: userData!.profileImg,
      }
      dispatch(setReviews(reviewWithUserInfo))
    }
  }

  // 두번째부터 더보기로 리뷰를 로드하는 함수
  const loadMoreReviews = async () => {
    if (!hasMore) return

    const { searchedData: reviewData } = await searchFirestoreDoc(`reviews/${restaurantId}`)
    if (!reviewData) return
    for (let i = nextLength -1; i >= nextLength -3 && i >= 0; i--) {
      setNextLength(nextLength - LoadMoreReviewsLength)
      const review: ReviewType = reviewData.reviews[i]
      const { searchedData: userData } = await searchFirestoreDoc(`users/${review.userUid}`)
      const reviewWithUserInfo: ReviewWithUserInfo = {
        ...review,
        nickname: userData!.nickname,
        profileImg: userData!.profileImg
      }
      dispatch(setReviews(reviewWithUserInfo))
    }
  }

  useEffect(() => {
    if (loadMore === 1) {
      dispatch(clearReviews()) // 처음 로드될 때 기존의 리뷰상태는 지움
      setHasMore(true) // 처음 리뷰들을 펼칠 때 hasMore 을 true 로 변환
      loadReviews() // 첫 리뷰 3개 로드
    } else {
      loadMoreReviews()
    }
  }, [loadMore])

  useEffect(() => {
    if (loadMore !== 1 && nextLength <= 0) setHasMore(false) // 두번째 로드이후에서 더 로드할 리뷰가 없다면
  }, [nextLength, loadMore])

  return {
    reviews, setLoadMore, hasMore
  }

}

export default useLoadingReviews