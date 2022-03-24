import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material';
import GlobalStyles, { mainColor } from 'styles/GlobalStyles';
import wrapper from "store/configureStore";
import AppLayout from 'components/layout/AppLayout'
import Script from 'next/script';

const themeOptions = createTheme({
  palette: {
    primary: {
      main: mainColor,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script 
        strategy='beforeInteractive' 
        src={ `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false&libraries=services`}
      />
      <ThemeProvider theme={themeOptions}>
        <GlobalStyles />
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ThemeProvider>
    </>
  )
}

export default wrapper.withRedux(MyApp)
