import { collection, getDocs, limit, query } from "firebase/firestore"
import { dbService } from "fireBaseApp/fBase"

export const getAllRestaurantsData = async () => {
  const restaurantsRef = collection(dbService, "restaurants")
  const queryInstance = query(restaurantsRef, limit(9))
  const restaurantsData: RestaurantWithId[] = await getDocs(queryInstance).then(res => res.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data() as RestaurantType
    }
  }))
  return restaurantsData
}