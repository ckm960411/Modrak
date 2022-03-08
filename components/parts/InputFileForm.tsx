import { Dispatch, FC, SetStateAction } from "react";
import { Button, styled } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

const Input = styled('input')({ display: 'none' })

type InputFileFormProps = {
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
  label: string;
}

const InputFileForm: FC<InputFileFormProps> = ({ label, images, setImages }) => {
  
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!
    if (!files[0]) return
    if ((images.length + files.length) > 10) {
      return alert('최대 10개 사진만 첨부할 수 있습니다.')
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

export default InputFileForm;
