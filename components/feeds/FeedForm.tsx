import { FC, useState } from "react";
import { Card, CardContent } from "@mui/material";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { onSubmitNewFeed } from "store/slices/feedsSlice";
import { addFeedInfo } from "store/slices/usersSlice";
import PreviewImagesTab from "components/feeds/PreviewImagesTab";
import SubmitFormButton from "components/parts/SubmitFormButton";
import TextInput from "components/parts/TextInput";
import InputFileForm from "components/parts/InputFileForm";
import TagInput from "components/parts/TagInput";

const FeedForm: FC = () => {
  const [feedImages, setFeedImages] = useState<string[]>([])
  const [feedText, setFeedText] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
  const [submitLoading, setSubmitLoading] = useState(false)

  const dispatch = useAppDispatch()
  const myInfo = useAppSelector(state => state.users.myInfo)

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeedText(e.target.value)
  }
  const handleChangeTags = (e: React.SyntheticEvent<Element, Event>, value: string[]) => setTags(value)

  // 게시글 작성
  const handleSubmitFeed = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!myInfo) return alert('게시글 작성을 위해 먼저 로그인해주세요!')
    if (feedText.trim() === '') return alert('게시글 내용을 작성해주세요!')
    setSubmitLoading(true)
    const newFeedData: newFeedDataType = {
      feedText, tags, imgs: feedImages,
      uid: myInfo.uid, nickname: myInfo.nickname, profileImg: myInfo.profileImg
    }
    dispatch(onSubmitNewFeed(newFeedData)).then(res => {
      dispatch(addFeedInfo(`feeds/${(res.payload as FeedWithIdType).id}`))
    })
    setSubmitLoading(false)
    setTags([])
    setFeedText("")
    setFeedImages([])
  }

  return (
    <Card raised>
      <CardContent>
        <TextInput
          value={feedText}
          onChange={handleChangeText}
          placeholder="당신의 제주에서의 하루는 어땠나요?" 
        />
        <TagInput value={tags} onChange={handleChangeTags} />
        <div>
          <InputFileForm label="input-file" images={feedImages} setImages={setFeedImages} />
          <SubmitFormButton
            onClick={handleSubmitFeed}
            sx={{ float: 'right', mt: 1 }}
            loading={submitLoading}
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