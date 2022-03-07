import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material';
import GlobalStyles from 'styles/GlobalStyles';
import { Provider } from 'react-redux';
import { store } from "store/configureStore";
import AppLayout from 'components/layout/AppLayout'

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
      <ThemeProvider theme={themeOptions}>
        <Provider store={store}>
          <GlobalStyles />
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </Provider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
