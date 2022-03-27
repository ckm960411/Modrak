import { doc, getDoc } from "firebase/firestore"
import { dbService } from "fireBaseApp/fBase"

const getUserInfoById = async (userUid: string) => {
  const userDocRef = doc(dbService, `users/${userUid}`)
  const userInfo: UserType = await getDoc(userDocRef).then(res => {
    return {
      ...res.data() as UserType
    }
  })
  return userInfo
}

export default getUserInfoById