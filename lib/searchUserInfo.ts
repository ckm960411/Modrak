import { doc, getDoc } from "firebase/firestore"
import { dbService } from "fireBaseApp/fBase"

const searchUserInfo = async (uid: string) => {
  const userDocRef = doc(dbService, "users", uid)
  const userData = await getDoc(userDocRef).then(res => res.data())
  return userData
}

export default searchUserInfo