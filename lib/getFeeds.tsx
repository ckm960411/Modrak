import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { dbService } from "fireBaseApp/fBase";
import searchUserInfo from "lib/searchUserInfo";

const getFeeds = async (
  clearFeedsState: () => { payload: undefined; type: string; },
  setFeedsState: (payload: any) => { payload: any; type: string; }
) => {
  clearFeedsState()
  const feedDocRef = collection(dbService, "feeds")
  const queryInstance = query(feedDocRef, orderBy("createdAt", "desc"))
  const documentSnapshots = await getDocs(queryInstance)
  const result = documentSnapshots.docs.map(async (doc) => {
    const userData = await searchUserInfo(doc.data().userUid)
    const docData = doc.data()
    return {
      id: doc.id,
      userUid: docData.userUid,
      feedText: docData.feedText,
      feedImages: docData.feedImages,
      likes: docData.likes,
      bookmarks: docData.bookmarks,
      comments: docData.comments,
      createdAt: docData.createdAt,
      modifiedAt:docData.modifiedAt,
      nickname: userData!.nickname,
      profileImg: userData!.profileImg,
    }
  })
  result.map(promise => promise.then(res => setFeedsState(res)))
}

export default getFeeds