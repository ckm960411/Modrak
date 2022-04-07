import { FC, useRef } from "react";
import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import useLoadingAccommodations from "utils/hooks/useLoadingAccommodations";
import AccommodationCard from "components/accommodations/AccommodationCard";

const AccommodationContainer: FC = () => {
  const targetRef = useRef<HTMLDivElement>(null)
  const { accommodations } = useLoadingAccommodations(targetRef)

  return (
    <>
      <Stack spacing={2}>
        {accommodations.map(accommodation => (
          <AccommodationCard key={accommodation.id} accommodation={accommodation} />
        ))}
      </Stack>
      <TargetDiv ref={targetRef} />
    </>
  )
}

const TargetDiv = styled.div`
  height: 100px;
  background-color: transparent;
`

export default AccommodationContainer