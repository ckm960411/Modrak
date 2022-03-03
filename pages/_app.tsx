import type { AppProps } from 'next/app'
import AppLayout from 'components/layout/AppLayout'
import { createTheme, ThemeProvider } from '@mui/material';
import GlobalStyles from 'styles/GlobalStyles';

const themeOptions = createTheme({
  palette: {
    primary: {
      main: "#009e5d",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={themeOptions}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ThemeProvider>
    </>
  )
}

export default MyApp
