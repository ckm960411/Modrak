import { collection, getDocs } from "firebase/firestore"
import { dbService } from "fireBaseApp/fBase"

export const getAllRestaurantsData = async () => {
  const restaurantsRef = collection(dbService, "restaurants")
  const restaurantsData: RestaurantWithId[] = await getDocs(restaurantsRef).then(res => res.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data() as RestaurantType
    }
  }))
  return restaurantsData
}