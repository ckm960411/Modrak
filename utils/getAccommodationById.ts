import { accommodations } from "dummyData/accommodation"

export const getAccommodationById = async (id: string) => {
  const accommodation = accommodations.find(acc => acc.id === id)
  return accommodation
}