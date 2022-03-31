import { useEffect, useState } from "react";
import { collection, DocumentData, getDocs, limit, orderBy, query, QueryDocumentSnapshot, startAfter } from "firebase/firestore";
import { dbService } from "fireBaseApp/fBase";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { clearFeeds, setFeeds } from "store/slices/feedsSlice";
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc";
import { setIsInitialLoad } from "store/slices/feedFilterSlice";

const useLoadingFeeds: UseLoadingFeedsType = (reference, filter = []) => {
  const dispatch = useAppDispatch()
  // 이전 불러온 게시물의 스냅샷을 보관하여 다음 데이터 요청시 해당 데이터 이후부터 불러옴
  const [last, setLast] = useState<QueryDocumentSnapshot<DocumentData> | string>('hello')
  const [hasMore, setHasMore] = useState(true)
  const { isInitialLoad, searchFilter, orderFilter, showFilter, tagFilter } = useAppSelector(state => state.feedFilter)
  const { value: feeds } = useAppSelector(state => state.feeds)
  
  const loadFeeds = async () => {
    const feedDocsRef = collection(dbService, "feeds")
    let queryInstance
    if (isInitialLoad) {
      queryInstance = query(
        feedDocsRef, 
        ...searchFilter,
        ...orderFilter,
        ...showFilter,
        ...tagFilter,
        ...filter,
        orderBy("createdAt", "desc"), 
        limit(6)
      ) // 처음 6개 로드
    } else {
      queryInstance = query(
        feedDocsRef, 
        ...searchFilter,
        ...orderFilter,
        ...showFilter,
        ...tagFilter,
        ...filter,
        orderBy("createdAt", "desc"), 
        startAfter(last), 
        limit(5)
      ) // 이전 로드한 게시물 이후 5개 로드
    } 
    const documentSnapshots = await getDocs(queryInstance)

    // 더 게시물이 없다면 로드 요청 자체를 중지함
    if (!documentSnapshots.docs[0]) {
      return setHasMore(false)
    }

    setLast(documentSnapshots.docs[documentSnapshots.docs.length -1]) // 게시물을 불러온 후 가장 마지막 문서 스냅샷을 상태에 저장
    const feedWithUserData = documentSnapshots.docs.map( async (doc) => {
      const { searchedData: userData } = await searchFirestoreDoc(doc.data().userRef)
      return {
        id: doc.id,
        ...doc.data(),
        nickname: userData!.nickname,
        profileImg: userData!.profileImg,
      }
    })
    feedWithUserData.map(feed => feed.then(res => dispatch(setFeeds(res)))) // 불러온 게시물 순차적으로 리덕스에 저장
  }

  const loadMoreFeeds = () => {
    loadFeeds()
  }

  useEffect(() => {
    let observer: IntersectionObserver
    if (reference.current && !isInitialLoad) {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && hasMore) loadMoreFeeds()
      }, {})
      observer.observe(reference.current)
    }
    return () => observer && observer.disconnect()
  }, [loadMoreFeeds])

  useEffect(() => {
    if (isInitialLoad) { // isInitialLoad 이 true 일 때만 요청
      dispatch(clearFeeds())
      loadFeeds()
      dispatch(setIsInitialLoad(false))
      setHasMore(true)
      setLast('hello')
    }
  }, [dispatch, isInitialLoad])

  return {
    feeds
  };
}

export default useLoadingFeeds

