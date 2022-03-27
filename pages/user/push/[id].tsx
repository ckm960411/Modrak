import { FC, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, Collapse, Divider, Stack, Typography } from "@mui/material";
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc";
import getAllUsersId from "utils/SSRFunctions/getAllUsersId";
import getUserInfoById from "utils/SSRFunctions/getUserInfoById";

const Pushes: FC<{userData: UserType}> = ({ userData }) => {
  const [pushes, setPushes] = useState<PushType[]>([])
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => setExpanded(!expanded);
  
  useEffect(() => {
    (async () => {
      const { searchedData: pushData } = await searchFirestoreDoc(`pushes/${userData.uid}`)
      setPushes(pushData!.pushes as PushType[])
    })()
  }, [userData.uid])

  return (
    <Stack spacing={2} sx={{ maxWidth: '720px', m: '0 auto' }}>
      <Card raised>
        <CardHeader 
          title={<Typography sx={{ fontSize: '18px', fontFamily: 'Katuri' }}>서머셋 제주신화월드</Typography>}
          subheader={<Typography variant="caption">2022년 3월 28일 20:00</Typography>}
          onClick={handleExpandClick}
          sx={{ cursor: 'pointer' }}
        />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Divider />
          <CardContent>
            킹짱황버츠
          </CardContent>
        </Collapse>
      </Card>
    </Stack>
  )
}

export const getStaticPaths = async () => {
  const paths = await getAllUsersId()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }: { params: { id: string } }) => {
  const userData = await getUserInfoById(params.id)
  return {
    props: {
      userData
    }
  }
}

export default Pushes