/* eslint-disable class-methods-use-this */
import Document, { Head, Html, Main, NextScript } from 'next/document'
import { Children } from 'react'
import createEmotionServer from '@emotion/server/create-instance'
import createEmotionCache from '../scripts/createEmotionCache'
import { themeColor } from '../components/ThemeContext'

export default class MyDocument extends Document {
  render() {
    return (
      // TODO automatic lang selection
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
          <meta content="The go-to place for all your college needs." name="description" />
          <meta content={themeColor} name="theme-color" />

          {/* Appears as a tile, just like a native Windows app in Windows 8 and 10 */}
          <meta content="#2d89ef" name="msapplication-TileColor" />

          {/* Standard for most desktop browsers */}
          <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
          <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />

          {/* Apple devices https://realfavicongenerator.net/blog/how-ios-scales-the-apple-touch-icon/ */}
          <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />

          {/* Safari implements pinned tabs and takes advantage of the MacBook Touch Bar.
              This feature relies on an SVG icon. This icon must be monochrome and Safari does the rest. */}
          <link color={themeColor} href="/safari-pinned-tab.svg" rel="mask-icon" />

          {/* Google Developer Web App Manifest Recommendation */}
          <link href="/android-chrome-192x192.png" rel="icon" sizes="192x192" type="image/png" />
          <link href="/manifest.json" rel="manifest" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      // eslint-disable-next-line react/display-name
      enhanceApp: (App) => (props) => <App emotionCache={cache} {...props} />,
    })

  const initialProps = await Document.getInitialProps(ctx)
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags],
  }
}
