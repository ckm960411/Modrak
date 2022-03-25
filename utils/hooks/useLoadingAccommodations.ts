import { collection, DocumentData, getDocs, limit, orderBy, query, QueryDocumentSnapshot, startAfter } from "firebase/firestore";
import { dbService } from "fireBaseApp/fBase";
import { RefObject, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { clearAccommodationsData, setAccommodationsData, setIsInitialLoad } from "store/slices/roomsSlice";

const useLoadingAccommodations = (reference: RefObject<HTMLDivElement>) => {
  const dispatch = useAppDispatch()
  // 이전 불러온 숙소정보들의 스냅샷을 보관하여 다음 데이터 요청시 해당 데이터 이후부터 불러옴
  const [last, setLast] = useState<QueryDocumentSnapshot<DocumentData> | string>('initialLoad')
  const [hasMore, setHasMore] = useState(true)
  const { divisionFilter, categoryFilter, tagFilter, value: accommodations, isInitialLoad } = useAppSelector(state => state.rooms)

  const loadAccommodationsList = async () => {
    const accommodationsRef = collection(dbService, "accommodations")
    let queryInstance
    if (isInitialLoad) {
      queryInstance = query(
        accommodationsRef, 
        ...divisionFilter,
        ...categoryFilter,
        ...tagFilter,
        orderBy("rating", "desc"), 
        limit(9) // 처음 9개 로드
      ) 
    } else {
      queryInstance = query(
        accommodationsRef, 
        ...divisionFilter, 
        ...categoryFilter,
        ...tagFilter,
        orderBy("rating", "desc"), 
        startAfter(last), 
        limit(9) // 이전 로드한 리스트 이후 9개 로드
      ) 
    }
    const documentSnapshots = await getDocs(queryInstance)

    // 더 로드할 리스트가 없다면 로드 요청 자체를 중지함
    if (!documentSnapshots.docs[0]) {
      return setHasMore(false)
    }

    setLast(documentSnapshots.docs[documentSnapshots.docs.length -1]) // 리스트를 불러온 후 가장 마지막 문서 스냅샷을 상태에 저장
    documentSnapshots.docs.map(doc => dispatch(setAccommodationsData({ id: doc.id, ...doc.data() })))
  }

  const loadMoreAccommodationsList = () => {
    loadAccommodationsList()
  }

  useEffect(() => {
    let observer: IntersectionObserver
    if (reference.current && !isInitialLoad) {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && hasMore) {
          loadMoreAccommodationsList()
        }
      }, {})
      observer.observe(reference.current)
    }
    return () => observer && observer.disconnect()
  }, [loadMoreAccommodationsList])

  useEffect(() => {
    if (isInitialLoad) { // isInitialLoad 가 true 일 때만 요청
      dispatch(clearAccommodationsData())
      loadAccommodationsList()
      dispatch(setIsInitialLoad(false))
      setHasMore(true)
      setLast('initialLoad')
    }
  }, [dispatch, isInitialLoad])

  return {
    accommodations
  }
}

export default useLoadingAccommodations