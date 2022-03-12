import React, { FC, useState } from "react";
import { dbService } from "fireBaseApp/fBase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { Card, CardContent } from "@mui/material";
import TextInput from "components/parts/TextInput";
import InputFileForm from "components/parts/InputFileForm";
import PreviewImagesTab from "components/feeds/PreviewImagesTab";
import { useAppDispatch, useAppSelector } from "store/hooks";
import uploadImagesDB from "utils/uploadImagesDB";
import { addFeeds, setFeedLoadingfalse, setFeedLoadingTrue } from "store/feedsSlice";
import SubmitFormButton from "components/parts/SubmitFormButton";
import { addFeedInfo } from "store/usersSlice";
import searchFirestoreDoc from "utils/searchFirestoreDoc";

const FeedForm: FC = () => {
  const [feedImages, setFeedImages] = useState<string[]>([])
  const [feedText, setFeedText] = useState<string>('')
  const dispatch = useAppDispatch()
  const myInfo = useAppSelector(state => state.users.myInfo)
  const feedLoading = useAppSelector(state => state.feeds.loading)

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeedText(e.target.value)
  }

  // 게시글 작성
  const onSubmitFeed = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!myInfo) return alert('게시글 작성을 위해 먼저 로그인해주세요!')
    if (feedText.trim() === '') return alert('게시글 내용을 작성해주세요!')
    dispatch(setFeedLoadingTrue())
    // 이미지배열을 스토리지에 저장하고 저장된 스토리지 경로를 배열로 리턴
    const imagesURLs = await uploadImagesDB(feedImages, myInfo.uid).catch(err => console.log(err.resultMessage))
    const feedData = {
      userUid: myInfo.uid,
      userRef: `users/${myInfo.uid}`,
      feedText: feedText,
      feedImages: imagesURLs,
      createdAt: Date.now(),
      modifiedAt: Date.now(),
      likes: [],
      bookmarks: [],
      comments: [],
    }
    // 글을 게시하는 사용자(본인)의 정보를 찾음
    const { searchedDocRef: userDocRef, searchedData: userData} = await searchFirestoreDoc(feedData.userRef)
    // feeds 컬렉션에 피드를 추가하고, 사용자의 feeds 배열에 문서id 를 추가
    await addDoc(collection(dbService, "feeds"), feedData)
      .then(res => {
        updateDoc(userDocRef, {
          feeds: [...userData!.feeds, `feeds/${res.id}`] // res.id 는 추가된 피드의 문서 id
        })
        dispatch(addFeeds({
          ...feedData,
          id: res.id,
          nickname: myInfo.nickname,
          profileImg: myInfo.profileImg,
        }))
        dispatch(addFeedInfo(`feeds/${res.id}`))
      })
      .catch(err => console.log(err.resultMessage))
      .finally(() => alert('게시글 작성이 완료됐습니다!'))
    
    dispatch(setFeedLoadingfalse())
    setFeedText("")
    setFeedImages([])
  }

  return (
    <Card raised>
      <CardContent>
        <TextInput
          value={feedText}
          onChange={onChangeText}
          placeholder="당신의 제주에서의 하루는 어땠나요?" 
        />
        <div>
          <InputFileForm label="input-file" images={feedImages} setImages={setFeedImages} />
          <SubmitFormButton
            onClick={onSubmitFeed}
            sx={{ float: 'right', mt: 1 }}
            loading={feedLoading}
          >
            작성하기
          </SubmitFormButton>
        </div>
        {feedImages[0] && <PreviewImagesTab images={feedImages} setImages={setFeedImages} />}
      </CardContent>
    </Card>
  )
}

export default FeedForm