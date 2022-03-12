import { doc, getDoc } from "firebase/firestore"
import { dbService } from "fireBaseApp/fBase"

const searchFirestoreDoc = async (ref: string) => {
  // ref 는 '컬렉션id/문서id' 로 들어와야 해당 document 를 찾음
  const searchedDocRef = doc(dbService, ref) 
  const searchedData = await getDoc(searchedDocRef).then(res => res.data())
  return {
    searchedDocRef, searchedData
  }
}

export default searchFirestoreDoc