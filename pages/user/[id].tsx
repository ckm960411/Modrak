import { FC } from "react";
import getAllUsersId from "utils/SSRFunctions/getAllUsersId";
import getUserInfoById from "utils/SSRFunctions/getUserInfoById";

const Profile: FC<{userData: UserType}> = ({ userData }) => {
  return (
    <>
      {userData.nickname}
    </>
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

export default Profile