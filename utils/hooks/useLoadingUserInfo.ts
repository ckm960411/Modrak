import { browserSessionPersistence, onAuthStateChanged, setPersistence } from "firebase/auth"
import { authService } from "fireBaseApp/fBase"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { loadMyInfoData } from "store/slices/usersSlice"
import searchFirestoreDoc from "utils/functions/searchFirestoreDoc"

const useLoadingUserInfo = () => {
  const dispatch = useAppDispatch()
  const { userData: userInfo } = useAppSelector(state => state.profile)

  const onLoadUserData = async (uid: string) => {
    const { searchedData: userData } = await searchFirestoreDoc(`users/${uid}`)
    dispatch(loadMyInfoData(userData))
  }

  useEffect(() => {
    setPersistence(authService, browserSessionPersistence)
    onAuthStateChanged(authService, user => {
      if (user) return onLoadUserData(user.uid)
      else return
    })
  }, [userInfo])
}

export default useLoadingUserInfo