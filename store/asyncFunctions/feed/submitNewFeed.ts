import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore"
import { dbService } from "fireBaseApp/fBase"
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc"
import uploadImagesDB from "utils/functions/uploadImagesDB"

const submitNewFeed = async (newFeedData: newFeedDataType) => {
  const { imgs, feedText, uid, tags, nickname, profileImg } = newFeedData
  const imagesURLs = await uploadImagesDB(imgs, uid) // 이미지배열을 스토리지에 저장하고 저장된 스토리지 경로를 배열로 리턴
  const feedData = {
    userUid: uid,
    userRef: `users/${uid}`,
    feedText: feedText,
    feedImages: imagesURLs,
    createdAt: Date.now(),
    modifiedAt: Date.now(),
    likes: [],
    likesCount: 0,
    bookmarks: [],
    bookmarksCount: 0,
    tags: tags,
    comments: [],
  }
  // 글을 게시하는 사용자(본인)의 정보를 찾음
  const { searchedDocRef: userDocRef, searchedData: userData} = await searchFirestoreDoc(`users/${uid}`)
  // feeds 컬렉션에 피드를 추가하고, 사용자의 feeds 배열에 문서id 를 추가
  const feedDataWithUserInfo: FeedWithUserInfoType = await addDoc(collection(dbService, "feeds"), feedData)
    .then(res => {
      updateDoc(userDocRef, { feeds: [...userData!.feeds, `feeds/${res.id}`] }) // res.id 는 추가된 피드의 문서 id 
      const commentsCollectionRef = collection(dbService, "comments")
      setDoc(doc(commentsCollectionRef, res.id), { comments: [] })
      return {
        id: res.id,
        nickname, profileImg,
        ...feedData as FeedDataType
      }
    })
  return feedDataWithUserInfo
}

export default submitNewFeed