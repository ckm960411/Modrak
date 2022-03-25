import { accommodations } from "dummyData/accommodation"

export const getAllAccommodationsId = async () => {
  const accommodationsData = accommodations
  return accommodationsData.map(accommodation => {
    return {
      params: {
        id: accommodation.id
      }
    }
  })
}