import { FC, useRef } from "react";
import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import Feed from "components/feeds/feed/Feed";
import useLoadingFeeds from "utils/hooks/useLoadingFeeds";
import styled from "@emotion/styled";
import Image from "next/image";

const ImageWrapper = styled.div`
  max-height: 500px;
  min-height: 400px;
  height: 100%;
  width: 100%;
  position: relative;
  & span {
    height: inherit !important;
  }
`
  
const FeedContainer: FC = () => {
  const targetRef = useRef<HTMLDivElement>(null)
  const { feeds } = useLoadingFeeds(targetRef)

  return (
    <Stack direction="column" spacing={2}>
      {feeds[0] ? 
        feeds.map(feed => <Feed key={`${feed.id}/${feed.createdAt}`} feedData={feed} />)
        : (
          <Card raised>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography sx={{ color: '#353535', fontFamily: 'Katuri', fontSize: '24px' }}>
                모드락에 오신 것을 환영합니다!
              </Typography>
              <CardMedia>
                <ImageWrapper>
                  <Image
                    alt="기본 이미지" 
                    src="https://firebasestorage.googleapis.com/v0/b/modrak-c7468.appspot.com/o/OqIL4ckT2qc9t3hpxutUk3QQ9Rp2%2F78c4d2b4-74fd-41fb-b9e5-40733cd9adee?alt=media&token=3ce892ab-c47b-4080-8b97-8087598194be" 
                    layout="fill"
                    objectFit="contain"
                  />
                </ImageWrapper>
              </CardMedia>
              <Typography sx={{ color: '#353535', fontFamily: 'Katuri' }}>
                첫 피드를 작성하세요!
              </Typography>
            </CardContent>
          </Card>
        )
      }
      <div ref={targetRef} style={{ width: '100%', height: '30px', backgroundColor: 'transparent' }}></div>
    </Stack>
  )
}

export default FeedContainer