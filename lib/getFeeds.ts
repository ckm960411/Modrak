import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { dbService } from "fireBaseApp/fBase";
import searchUserInfo from "lib/searchUserInfo";

const useGetFeeds = async (
  clearFeedsState: () => { payload: undefined; type: string; },
  setFeedsState: (payload: any) => { payload: any; type: string; }
) => {
  clearFeedsState()
  const feedDocRef = collection(dbService, "feeds")
  const queryInstance = query(feedDocRef, orderBy("createdAt", "desc"))
  const documentSnapshots = await getDocs(queryInstance)
  const feedWithUserData = documentSnapshots.docs.map( async (doc) => {
    const userData = await searchUserInfo(doc.data().userRef)
    return {
      id: doc.id,
      ...doc.data(),
      nickname: userData!.nickname,
      profileImg: userData!.profileImg,
    }
  })
  feedWithUserData.map(feed => feed.then(res => setFeedsState(res)))
}

export default useGetFeeds