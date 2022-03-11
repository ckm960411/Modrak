import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { dbService } from "fireBaseApp/fBase";
import searchUserInfo from "lib/searchUserInfo";
import { FeedDataType, FeedWithIdType, FeedWithUserInfoType } from "types/feedTypes";

const useGetFeeds = async (
  clearFeedsState: () => { payload: undefined; type: string; },
  setFeedsState: (payload: any) => { payload: any; type: string; }
) => {
  clearFeedsState()
  const feedDocRef = collection(dbService, "feeds")
  const queryInstance = query(feedDocRef, orderBy("createdAt", "desc"))
  const documentSnapshots = await getDocs(queryInstance)
  const feedWithId: FeedWithIdType[] = documentSnapshots.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as FeedDataType)
  }))

  const feedWithUserInfo = feedWithId.map(async (feed) => {
    const userData = await searchUserInfo(feed.userUid)
    const feedWithUserData: FeedWithUserInfoType = {
      ...feed,
      nickname: userData!.nickname,
      profileImg: userData!.profileImg,
    }
    return feedWithUserData
  })

  feedWithUserInfo.map(feed => feed.then(res => setFeedsState(res)))
}

export default useGetFeeds