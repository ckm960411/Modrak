import { Dispatch, FC, SetStateAction, useCallback } from "react";
import { Box } from "@mui/system";
import { Card, CardContent, CardHeader, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import PreviewImage from "components/feeds/PreviesImage";

interface PreviewImagesTabProps {
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
}
const PreviewImagesTab: FC<PreviewImagesTabProps> = ({ images, setImages }) => {

  const clearAttachments = useCallback(() => {
    const ok = window.confirm('정말 모든 사진 첨부를 취소하시겠습니까?')
    if (!ok) return
    setImages([])
  }, [setImages])

  return (
    <Box>
      <Card sx={{ mt: 1 }}>
        <CardHeader 
          subheader="사진 미리보기"
          action={
            <IconButton onClick={clearAttachments}>
              <CloseIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Stack direction="row" spacing={1} sx={{ overflowX: 'scroll' }}>
            {images.map((image, i) => <PreviewImage key={i} image={image} setImages={setImages} order={i} />)}
          </Stack>
        </CardContent>
        <CardContent sx={{ pt: 1 }}>
          <Typography variant="body2">최대 10개의 사진을 첨부할 수 있습니다.</Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default PreviewImagesTab