import { getDownloadURL, ref, uploadString } from "firebase/storage"
import { storageService } from "fireBaseApp/fBase"
import { v4 as uuid_v4 } from "uuid";

const uploadImagesDB = async (images: string[], uid: string) => {
  if (images.length === 0) return []
  let imagesURLs: string[] = []
  for (let i = 0; i < images.length; i++) {
    // 파일 경로 참조 만들기  
    const imagesUrlRef = ref(storageService, `${uid}/${uuid_v4()}`)
    // 참조 경로로 파일 업로드하기
    await uploadString(imagesUrlRef, images[i], "data_url")
    // storage에 있는 파일 URL 로 다운로드 받기
    imagesURLs = await getDownloadURL(imagesUrlRef).then(res => [...imagesURLs, res])
  }
  return imagesURLs
}

export default uploadImagesDB