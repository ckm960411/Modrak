import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Alert, CardContent, Dialog } from "@mui/material";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { doc, updateDoc } from "firebase/firestore";
import { dbService } from "fireBaseApp/fBase";
import { updateFeed } from "store/slices/feedsSlice";
import uploadImagesDB from "utils/functions/uploadImagesDB";
import TextInput from "components/parts/TextInput";
import InputFileForm from "components/parts/InputFileForm";
import MainButton from "components/parts/MainButton";
import PreviewImagesTab from "components/feeds/PreviewImagesTab";
import SubmitFormButton from "components/parts/SubmitFormButton";
import TagInput from "components/parts/TagInput";

interface EditFeedModalProps {
  feedData: FeedWithUserInfoType
  editing: boolean
  setEditing: Dispatch<SetStateAction<boolean>>
}
const EditFeedModal: FC<EditFeedModalProps> = ({ feedData, editing, setEditing }) => {
  const [editText, setEditText] = useState<string>('')
  const [newImages, setNewImages] = useState<string[]>([])
  const [editFeedError, setEditFeedError] = useState<string>('')
  const [newTags, setNewTags] = useState<string[]>([])
  const [editFeedLoading, setEditFeedLoading] = useState(false)

  const dispatch = useAppDispatch()
  const myInfo = useAppSelector(state => state.users.myInfo)

  const { id, feedText, feedImages, tags, userUid } = feedData

  useEffect(() => {
    setNewImages(feedImages)
    setEditText(feedText)
    setNewTags(tags)
  }, [feedText, feedImages, tags])

  const onChangeEditText = (e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)

  const onCloseEditing = () => {
    setEditing(false)
    setNewImages(feedImages)
  }

  const onChangeNewTags = (e: React.SyntheticEvent<Element, Event>, value: string[]) => {
    setNewTags(value.map(v => v.trim()))
  }

  const onSubmit = async () => {
    if (editText.trim() === '') 
      return setEditFeedError("피드의 내용을 작성해주세요!")
    if (!myInfo) 
      return alert("로그인한 이후에 피드를 수정해주세요.")
    if (myInfo.uid !== userUid) 
      return alert("당신의 피드가 아닌 글은 수정할 수 없습니다!")
    setEditFeedLoading(true)
    const shouldUpload = newImages.filter(img => img.startsWith('data:image'))
    const shouldNotUpload = newImages.filter(img => !img.startsWith('data:image'))
    const newImagesURLs = await uploadImagesDB(shouldUpload, myInfo.uid).catch(err => console.log(err))
    const data = {
      feedText: editText,
      feedImages: [...shouldNotUpload, ...newImagesURLs!],
      tags: newTags,
      modifiedAt: Date.now(),
    }

    const feedDocRef = doc(dbService, "feeds", id)
    await updateDoc(feedDocRef, data)
    dispatch(updateFeed({...data, feedId: id}))
    setEditFeedLoading(false)
    setEditing(false)
  }

  return (
    <Dialog
      open={editing}
      onClose={onCloseEditing}
      fullWidth
    >
      <CardContent>
        <TextInput 
          value={editText}
          onChange={onChangeEditText}
        />
        <TagInput value={newTags} onChange={onChangeNewTags} />
        <div>
          <InputFileForm label="edit-input-file" images={newImages} setImages={setNewImages} />
          <SubmitFormButton onClick={onSubmit} sx={{ float: 'right', mt: 1 }} loading={editFeedLoading}>
            Edit Feed
          </SubmitFormButton>
          <MainButton variant="outlined" sx={{ float: 'right', mt: 1, mr: 1 }} onClick={onCloseEditing}>
            cancel
          </MainButton>
        </div>
        { editFeedError !== '' && (
          <Alert
            severity="warning" 
            onClose={() => setEditFeedError('')}
            sx={{ marginTop: 2 }}
          >
            <>피드의 내용을 작성해주세요!</>
          </Alert>
        )}
      </CardContent>
      {newImages[0] && <PreviewImagesTab images={newImages} setImages={setNewImages} />}
    </Dialog>
  )
}

export default EditFeedModal