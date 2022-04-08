import type { AppProps } from 'next/app'
import Script from 'next/script';
import { createTheme, ThemeProvider } from '@mui/material';
import GlobalStyles, { mainColor } from 'styles/GlobalStyles';
import wrapper from "store/configureStore";
import { useAppSelector } from 'store/hooks';
import AppLayout from 'components/layout/AppLayout'
import SideAlert from 'components/parts/SideAlert';

const themeOptions = createTheme({
  palette: {
    primary: {
      main: mainColor,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const { isShown } = useAppSelector(state => state.app)

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
      {isShown && <SideAlert />}
    </>
  )
}

export default wrapper.withRedux(MyApp)
