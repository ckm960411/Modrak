import { FC, useState } from "react";
import { Card, CardContent } from "@mui/material";
import TextInput from "components/parts/TextInput";
import InputFileForm from "components/parts/InputFileForm";
import MainButton from "components/parts/MainButton";
import PreviewImagesTab from "components/feeds/PreviewImagesTab";

const FeedForm: FC = () => {
  const [images, setImages] = useState<string[]>([])

  return (
    <Card raised>
      <CardContent>
        <TextInput placeholder="당신의 제주에서의 하루는 어땠나요?" />
        <div>
          <InputFileForm label="input-file" images={images} setImages={setImages} />
          <MainButton
            onClick={() => alert('hi')}
            // disabled={postText.trim() === ''}
          >
            작성하기
          </MainButton>
        </div>
        {images[0] && <PreviewImagesTab images={images} setImages={setImages} />}
      </CardContent>
    </Card>
  )
}

export default FeedForm