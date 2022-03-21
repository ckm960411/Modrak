import { RefObject, useEffect, useState } from "react"
import { dbService } from "fireBaseApp/fBase"
import { collection, DocumentData, getDocs, limit, orderBy, query, QueryDocumentSnapshot, startAfter } from "firebase/firestore"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { clearRestaurantsData, setIsInitialLoad, setRestaurantsData } from "store/restaurantsSlice"

const useLoadingRestaurants = (reference: RefObject<HTMLDivElement>) => {
  const dispatch = useAppDispatch()
  // 이전 불러온 맛집정보들의 스냅샷을 보관하여 다음 데이터 요청시 해당 데이터 이후부터 불러옴
  const [last, setLast] = useState<QueryDocumentSnapshot<DocumentData> | string>('initialLoad')
  const [hasMore, setHasMore] = useState(true)
  const { divisionFilter, categoryFilter, tagFilter } = useAppSelector(state => state.restaurants)
  const { value: restaurants, isInitialLoad } = useAppSelector(state => state.restaurants)

  const loadRestaurantsList = async () => {
    const restaurantsRef = collection(dbService, "restaurants")
    let queryInstance
    if (isInitialLoad) {
      queryInstance = query(
        restaurantsRef, 
        ...divisionFilter,
        ...categoryFilter,
        ...tagFilter,
        orderBy("rating", "desc"), 
        limit(9) // 처음 9개 로드
      ) 
    } else {
      queryInstance = query(
        restaurantsRef, 
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
    documentSnapshots.docs.map(doc => dispatch(setRestaurantsData({ id: doc.id, ...doc.data() })))
  }

  const loadMoreRestaurantsList = () => {
    loadRestaurantsList()
  }

  useEffect(() => {
    let observer: IntersectionObserver
    if (reference.current && !isInitialLoad) {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && hasMore) {
          loadMoreRestaurantsList()
        }
      }, {})
      observer.observe(reference.current)
    }
    return () => observer && observer.disconnect()
  }, [loadMoreRestaurantsList])

  useEffect(() => {
    if (isInitialLoad) { // isInitialLoad 가 true 일 때만 요청
      dispatch(clearRestaurantsData())
      loadRestaurantsList()
      dispatch(setIsInitialLoad(false))
      setHasMore(true)
      setLast('initialLoad')
    }
  }, [dispatch, isInitialLoad])

  return {
    restaurants
  }
}

export default useLoadingRestaurants