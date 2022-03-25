import { doc, getDoc } from "firebase/firestore"
import { dbService } from "fireBaseApp/fBase"

export const getAccommodationById = async (id: string) => {
  const accommodationDocRef = doc(dbService, `accommodations/${id}`)
  const accommodationData: AccommodationWithId = await getDoc(accommodationDocRef).then(res => {
    return {
      id: res.id,
      ...res.data() as AccommodationType
    }
  })
  return accommodationData
}