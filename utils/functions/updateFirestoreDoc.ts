import { doc, updateDoc } from "firebase/firestore"
import { dbService } from "fireBaseApp/fBase"

const updateFirestoreDoc = async <T>(ref: string, data: T) => {
  const docRef = doc(dbService, ref)
  await updateDoc(docRef, data)
}

export default updateFirestoreDoc