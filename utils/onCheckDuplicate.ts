import { collection, getDocs, query, where } from "firebase/firestore"
import { dbService } from "fireBaseApp/fBase"

const onCheckDuplicate = async (type: DuplicateCheck, keyword: string) => {
  const usersRef = collection(dbService, "users")
  const q = query(usersRef, where(type, "==", keyword))
  const response = await getDocs(q).then(res => {
    if (res.docs[0]) return res.docs[0].data()
    else return null
  }).catch(err => console.log(err))
  return response
}

export default onCheckDuplicate