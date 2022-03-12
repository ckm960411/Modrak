import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { collection, DocumentData, getDocs, limit, orderBy, query, QueryDocumentSnapshot, startAfter } from "firebase/firestore";
import { dbService } from "fireBaseApp/fBase";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setFeeds } from "store/feedsSlice";
import searchUserInfo from "utils/searchUserInfo";

const useLoadingFeeds = (
  initialLoad: boolean, 
  isFetching: boolean,
  setIsFetching: Dispatch<SetStateAction<boolean>>
) => {
  const dispatch = useAppDispatch()
  const feeds = useAppSelector(state => state.feeds.value)
  // 이전 불러온 게시물의 스냅샷을 보관하여 다음 데이터 요청시 해당 데이터 이후부터 불러옴
  const [last, setLast] = useState<QueryDocumentSnapshot<DocumentData> | null>(null)
  
  const loadFeeds = useCallback( async () => {
    const feedDocsRef = collection(dbService, "feeds")
    let queryInstance
    if (initialLoad) queryInstance = query(feedDocsRef, orderBy("createdAt", "desc"), limit(6)) // 처음 6개 로드
    else queryInstance = query(feedDocsRef, orderBy("createdAt", "desc"), startAfter(last), limit(5)) // 이전 로드한 게시물 이후 5개 로드
    const documentSnapshots = await getDocs(queryInstance)
    if (!documentSnapshots.docs[1]) return // 더 게시물이 없다면 로드X
    setLast(documentSnapshots.docs[documentSnapshots.docs.length -1]) // 게시물을 불러온 후 가장 마지막 문서 스냅샷을 상태에 저장
    const feedWithUserData = documentSnapshots.docs.map( async (doc) => {
      const userData = await searchUserInfo(doc.data().userRef)
      return {
        id: doc.id,
        ...doc.data(),
        nickname: userData!.nickname,
        profileImg: userData!.profileImg,
      }
    })
    setIsFetching(false)
    feedWithUserData.map(feed => feed.then(res => dispatch(setFeeds(res)))) // 불러온 게시물 순차적으로 리덕스에 저장
  }, [dispatch, initialLoad, last, setIsFetching])

  useEffect(() => {
    if (isFetching) loadFeeds() // isFetching 이 true 일 때만 요청
  }, [isFetching])

  return {
    feeds
  };
}

export default useLoadingFeeds

