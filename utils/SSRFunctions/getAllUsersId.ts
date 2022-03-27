import { collection, getDocs } from "firebase/firestore"
import { dbService } from "fireBaseApp/fBase"

const getAllUsersId = async () => {
  const usersRef = collection(dbService, "users")
  return await getDocs(usersRef).then(res => res.docs.map(doc => {
    return {
      params: {
        id: doc.id
      }
    }
  }))
}

export default getAllUsersId