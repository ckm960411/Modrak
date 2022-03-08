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
      return alert('You can only attach up to 10 pictures.')
    }
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader()
      reader.onload = () => {
        setImages(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(files[i])
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
        upload images
      </Button>
    </label>
  );
};

export default InputFileForm;
