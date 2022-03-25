import { collection, getDocs } from "firebase/firestore"
import { dbService } from "fireBaseApp/fBase"

export const getAllAccommodationsId = async () => {
  const accommodationsRef = collection(dbService, "accommodations")
  return await getDocs(accommodationsRef).then(res => res.docs.map(doc => {
    return {
      params: {
        id: doc.id
      }
    }
  }))
}