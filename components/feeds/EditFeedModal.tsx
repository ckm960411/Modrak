import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Alert, CardContent, Dialog } from "@mui/material";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { onUpdateFeed } from "store/asyncFunctions";
import { showAlert } from "store/slices/appSlice";
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

  const handleChangeEditText = (e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)
  const handleChangeNewTags = (e: React.SyntheticEvent<Element, Event>, value: string[]) => {
    setNewTags(value.map(v => v.trim()))
  }

  const handleCloseEditing = () => {
    setEditing(false)
    setNewImages(feedImages)
  }

  const handleSubmitEdit = async () => {
    if (editText.trim() === '') 
      return dispatch(showAlert({ isShown: true, message: "피드의 내용을 작성해주세요!", severity: "error" }))
    if (!myInfo) 
      return dispatch(showAlert({ isShown: true, message: "로그인한 이후에 피드를 수정해주세요.", severity: "error" }))
      if (myInfo.uid !== userUid) 
      return dispatch(showAlert({ isShown: true, message: "당신의 피드가 아닌 글은 수정할 수 없습니다!", severity: "error" }))
      setEditFeedLoading(true)
    dispatch(onUpdateFeed({
      uid: myInfo.uid,
      feedId: id,
      editText,
      newImages,
      newTags,
    }))
    setEditFeedLoading(false)
    setEditing(false)
    return dispatch(showAlert({ isShown: true, message: "수정이 완료됐습니다!" }))
  }

  return (
    <Dialog
      open={editing}
      onClose={handleCloseEditing}
      fullWidth
    >
      <CardContent>
        <TextInput 
          value={editText}
          onChange={handleChangeEditText}
        />
        <TagInput value={newTags} onChange={handleChangeNewTags} />
        <div>
          <InputFileForm label="edit-input-file" images={newImages} setImages={setNewImages} />
          <SubmitFormButton onClick={handleSubmitEdit} sx={{ float: 'right', mt: 1 }} loading={editFeedLoading}>
            Edit Feed
          </SubmitFormButton>
          <MainButton variant="outlined" sx={{ float: 'right', mt: 1, mr: 1 }} onClick={handleCloseEditing}>
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