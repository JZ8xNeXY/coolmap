import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect } from 'react'
import HeaderContainer from '@/containers/HeaderContainer'
import { CoolingshelterProvider } from '@/context/CoolingshelterContext'
import { SessionProvider } from '@/context/SessionContext'
import Footer from '@/presentationals/Footer'

import createEmotionCache from '@/styles/createEmotionCache'
import theme from '@/styles/theme'
import * as gtag from '@/utils/googleAnalytics'
import '../styles/globals.css'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps): JSX.Element {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const router = useRouter()

  useEffect(() => {
    const handleRouterChange = (url: string) => {
      console.log(url)
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouterChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouterChange)
    }
  }, [router.events])

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
 
           gtag('config', '${gtag.GA_MEASUREMENT_ID}');
           `,
        }}
      />
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <SessionProvider>
            <CoolingshelterProvider>
              <CssBaseline />
              <HeaderContainer />
              <Component {...pageProps} />
              <Footer />
            </CoolingshelterProvider>
          </SessionProvider>
        </ThemeProvider>
      </CacheProvider>
    </>
  )
}
