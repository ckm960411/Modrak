import { doc, getDoc } from "firebase/firestore"
import { dbService } from "fireBaseApp/fBase"

export const getRestaurantDataById = async (restaurantId: string) => {
  const restaurantDocRef = doc(dbService, `restaurants/${restaurantId}`)
  const restaurantData: RestaurantWithId = await getDoc(restaurantDocRef).then(res => {
    return {
      id: res.id,
      ...res.data() as RestaurantType
    }
  })
  return restaurantData
}