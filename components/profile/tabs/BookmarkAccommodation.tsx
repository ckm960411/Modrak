import { FC, useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { getDoc } from "firebase/firestore";
import { useAppSelector } from "store/hooks";
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc";
import AccommodationCard from "components/accommodations/AccommodationCard";

const BookmarkAccommodation: FC = () => {
  const [accommodations, setAccommodations] = useState<AccommodationWithId[]>([])
  const userData = useAppSelector(state => state.profile.userData!)

  const onLoadAccommodations = async () => {
    userData.bookmarkAccommodations.map( async (accId) => {
      const { searchedDocRef: accommodationRef } = await searchFirestoreDoc(`accommodations/${accId}`)
      await getDoc(accommodationRef).then(res => {
        const accommodationData: AccommodationWithId = {
          id: res.id,
          ...res.data() as AccommodationType
        }
        setAccommodations(prev => [ ...prev, accommodationData ])
      })
    })
  }

  useEffect(() => {
    onLoadAccommodations()
  }, [])

  return (
    <div>
      <Stack spacing={2}>
        {accommodations.map(accommodation => (
          <AccommodationCard key={accommodation.id} accommodation={accommodation} />
          ))}
      </Stack>
    </div>
  )
}

export default BookmarkAccommodation