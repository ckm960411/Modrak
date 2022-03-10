import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Alert, CardContent, Dialog } from "@mui/material";
import { FeedWithUserInfoType } from "types/feedTypes";
import TextInput from "components/parts/TextInput";
import InputFileForm from "components/parts/InputFileForm";
import MainButton from "components/parts/MainButton";
import PreviewImagesTab from "./PreviewImagesTab";
import { useAppDispatch, useAppSelector } from "store/hooks";
import uploadImagesDB from "lib/uploadImagesDB";
import { doc, updateDoc } from "firebase/firestore";
import { dbService } from "fireBaseApp/fBase";
import { updateFeed } from "store/feedsSlice";

type EditFeedModalProps = {
  feedData: FeedWithUserInfoType
  editing: boolean
  setEditing: Dispatch<SetStateAction<boolean>>
}

const EditFeedModal: FC<EditFeedModalProps> = ({ feedData, editing, setEditing }) => {
  const [editText, setEditText] = useState<string>('')
  const [newImages, setNewImages] = useState<string[]>([])
  const [editFeedError, setEditFeedError] = useState<string>('')
  const dispatch = useAppDispatch()
  const myInfo = useAppSelector(state => state.users.myInfo)

  const { id, feedText, feedImages, userUid } = feedData

  useEffect(() => {
    setNewImages(feedImages)
    setEditText(feedText)
  }, [feedText, feedImages])

  const onChangeEditText = (e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)

  const onCloseEditing = () => {
    setEditing(false)
    setNewImages(feedImages)
  }

  const onSubmit = async () => {
    if (editText.trim() === '') 
      return setEditFeedError("피드의 내용을 작성해주세요!")
    if (!myInfo) 
      return alert("로그인한 이후에 피드를 수정해주세요.")
    if (myInfo.uid !== userUid) 
      return alert("당신의 피드가 아닌 글은 수정할 수 없습니다!")
    const shouldUpload = newImages.filter(img => img.startsWith('data:image'))
    const shouldNotUpload = newImages.filter(img => !img.startsWith('data:image'))
    const newImagesURLs = await uploadImagesDB(shouldUpload, myInfo.uid).catch(err => console.log(err))
    const data = {
      feedText: editText,
      feedImages: [...shouldNotUpload, ...newImagesURLs!],
      modifiedAt: Date.now(),
    }

    const feedDocRef = doc(dbService, "feeds", id)
    await updateDoc(feedDocRef, data)
    dispatch(updateFeed({...data, id}))
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
        <div>
          <InputFileForm label="edit-input-file" images={newImages} setImages={setNewImages} />
          <MainButton onClick={onSubmit}>Edit Feed</MainButton>
          <MainButton
            variant="outlined"
            sx={{ float: 'right', mt: 1, mr: 1 }}
            onClick={onCloseEditing}
          >
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