import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, onSnapshot } from "firebase/firestore";
import { dbService } from "fireBaseApp/fBase";
import { Stack, Typography } from "@mui/material";
import { useAppSelector } from "store/hooks";
import getAllUsersId from "utils/SSRFunctions/getAllUsersId";
import getUserInfoById from "utils/SSRFunctions/getUserInfoById";
import PushCard from "components/parts/PushCard";

const Pushes: FC<{userData: UserType}> = ({ userData }) => {
  const [pushes, setPushes] = useState<PushType[]>([])
  const router = useRouter()
  const myInfo = useAppSelector(state => state.users.myInfo)

  useEffect(() => { // 로그인한 상태가 아니거나 자신의 알림페이지가 아닌 경우 진입 불가
    if (!myInfo || myInfo.uid !== userData.uid) router.push('/')
  }, [myInfo, router, userData.uid])
  
  useEffect(() => { // 실시간으로 알림들을 받아옴
    const pushDocRef = doc(dbService, `pushes/${userData.uid}`)
    let unsub = onSnapshot(pushDocRef, (doc) => {
      setPushes(doc.data()!.pushes.sort((a: any, b: any) => {
        return b.createdAt - a.createdAt
      }))
    })
    return () => unsub()
  }, [userData.uid])

  return (
    <Stack spacing={2} sx={{ maxWidth: '720px', m: '0 auto' }}>
      <Typography sx={{ fontFamily: 'Katuri', fontSize: '22px' }}>전체 알림 확인</Typography>
      {pushes.map(push => <PushCard key={push.pushId} push={push} userUid={userData.uid} />)}
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