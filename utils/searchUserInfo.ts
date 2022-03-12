import { doc, getDoc } from "firebase/firestore"
import { dbService } from "fireBaseApp/fBase"

const searchUserInfo = async (useRef: string) => {
  const userDocRef = doc(dbService, useRef)
  const userData = await getDoc(userDocRef).then(res => res.data())
  return {
    userDocRef, userData
  }
}

export default searchUserInfo