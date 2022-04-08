import { Dispatch, FC, SetStateAction } from "react";
import { Button, styled } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useAppDispatch } from "store/hooks";
import { showAlert } from "store/slices/appSlice";

interface InputFileFormProps {
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
  label: string;
}
const InputFileForm: FC<InputFileFormProps> = ({ label, images, setImages }) => {
  const dispatch = useAppDispatch()
  
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!
    if (!files[0]) return
    if ((images.length + files.length) > 10) {
      return dispatch(showAlert({ isShown: true, message: '최대 10개 사진만 첨부할 수 있습니다.', severity: 'warning' }))
    }
    const readAndPreview = (file: any) => {
      if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
        const reader = new FileReader()
        reader.onload = () => setImages(prev => [...prev, reader.result as string])
        reader.readAsDataURL(file)
      }
    }
    if (files) {
      [].forEach.call(files, readAndPreview)
    }
  }

  return (
    <label htmlFor={label}>
      <Input
        accept="image/*"
        id={label}
        multiple
        type="file"
        onChange={onFileChange}
      />
      <Button
        color="primary"
        component="span"
        sx={{ mt: 1 }}
        startIcon={<PhotoCamera />}
      >
        사진 첨부하기
      </Button>
    </label>
  );
};

const Input = styled('input')({ display: 'none' })

export default InputFileForm;
