import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AppLayout from 'components/layout/AppLayout'
import { createTheme, ThemeProvider } from '@mui/material';

const themeOptions = createTheme({
  palette: {
    primary: {
      main: "#54d13f",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={themeOptions}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </ThemeProvider>
  )
}

export default MyApp
