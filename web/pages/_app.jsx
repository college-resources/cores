import { Provider, connect } from 'react-redux'
import { session, setUser } from 'redux/authSlice'
import { setVersion } from 'redux/envSlice'
import store, { wrapper } from 'redux/store'
import Box from '@material-ui/core/Box'
import CssBaseline from '@material-ui/core/CssBaseline'
import Head from 'next/head'
import Navbar from 'components/navigation/navbar'
import { StyledEngineProvider, useTheme } from '@material-ui/core/styles'
import { ThemeProvider } from 'components/theme-context'
import { CacheProvider } from '@emotion/react'
import { withRouter } from 'next/router'
import createEmotionCache from '../scripts/createEmotionCache'
import { useEffect, useState } from 'react'

// Client-side cache, shared for the whole session of the user in the browser
const clientSideEmotionCache = createEmotionCache()

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const theme = useTheme()
  const [title, setTitle] = useState('')

  useEffect(() => {
    props.setUser(props.ctxUser)
    props.setVersion(props.version)

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }

    // Get profile from session
    if (!props.user) {
      props.session()
    }
  }, [])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{title} | College Resources</title>

        {/* This needs to be here and not in _document */}
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          name="viewport"
        />
      </Head>
      <StyledEngineProvider injectFirst>
        <ThemeProvider>
          <CssBaseline />
          <Provider store={store}>
            <Navbar title={title} />
            <Box
              mt={2}
              sx={{
                [theme.breakpoints.up('lg')]: {
                  marginLeft: '240px',
                },
              }}
            >
              <Component updateTitle={setTitle} {...pageProps} />
            </Box>
          </Provider>
        </ThemeProvider>
      </StyledEngineProvider>
    </CacheProvider>
  )
}

MyApp.getInitialProps = async ({ ctx }) => {
  const initialProps = { version: process.env.npm_package_version }

  if (ctx.req) {
    initialProps.ctxUser = ctx.req.user && ctx.req.user.profile
  }

  return initialProps
}

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapDispatchToProps = {
  session,
  setUser,
  setVersion,
}

export default wrapper.withRedux(withRouter(connect(mapStateToProps, mapDispatchToProps)(MyApp)))
