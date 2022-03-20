import { collection, getDocs } from "firebase/firestore"
import { dbService } from "fireBaseApp/fBase"

export const getAllRestaurantsId = async () => {
  const restaurantsRef = collection(dbService, "restaurants")
  return await getDocs(restaurantsRef).then(res => res.docs.map(doc => {
    return {
      params: {
        id: doc.id,
      }
    }
  }))
}