import {
  ThemeProvider as MuiThemeProvider,
  createTheme as createLegacyModeTheme,
  unstable_createMuiStrictModeTheme as createStrictModeTheme,
} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { createContext, useReducer, useEffect, useMemo, useContext, useCallback } from 'react'
import { getCookie } from 'scripts/helpers'
import { indigo } from '@material-ui/core/colors'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { darkScrollbar } from '@material-ui/core'

export const themeColor = indigo['800']

const themeInitialOptions = {
  paletteColors: {},
}

export const DispatchContext = createContext(() => {
  throw new Error('Forgot to wrap component in `ThemeProvider`')
})

if (process.env.NODE_ENV !== 'production') {
  DispatchContext.displayName = 'ThemeDispatchContext'
}

let createTheme
if (process.env.REACT_STRICT_MODE) {
  createTheme = createStrictModeTheme
} else {
  createTheme = createLegacyModeTheme
}

export function ThemeProvider(props) {
  const { children } = props

  const [themeOptions, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'CHANGE':
        return {
          ...state,
          paletteColors: action.payload.paletteColors || state.paletteColors,
          paletteMode: action.payload.paletteMode || state.paletteMode,
        }
      default:
        throw new Error(`Unrecognized type ${action.type}`)
    }
  }, themeInitialOptions)

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const preferredMode = prefersDarkMode ? 'dark' : 'light'
  const { paletteColors, paletteMode = preferredMode } = themeOptions

  useEffect(() => {
    if (process.browser) {
      const nextPaletteColors = JSON.parse(getCookie('paletteColors') || 'null')
      const nextPaletteMode = getCookie('paletteMode') || preferredMode

      dispatch({
        type: 'CHANGE',
        payload: {
          paletteColors: nextPaletteColors,
          paletteMode: nextPaletteMode,
        },
      })
    }
  }, [preferredMode])

  const theme = useMemo(() => {
    const nextTheme = createTheme(
      {
        nprogress: {
          color: paletteMode === 'light' ? '#000' : '#fff',
        },
        palette: {
          primary: {
            dark: indigo[800],
            level3: indigo[500],
            light: indigo[600],
            main: indigo[700],
          },
          secondary: {
            main: indigo[700],
          },
          text: {
            normal: paletteMode === 'light' ? 'black' : '#dcddde',
            permanentLight: '#dcddde',
            reverse: paletteMode === 'light' ? '#dcddde' : 'black',
          },
          mode: paletteMode,
          ...paletteColors,
        },
        typography: {
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
        },
      },
      {
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: paletteMode === 'dark' ? darkScrollbar() : null,
            },
          },
        },
      },
    )

    return nextTheme
  }, [paletteColors, paletteMode])

  useEffect(() => {
    // Expose the theme as a global variable so people can play with it.
    if (process.browser) {
      window.theme = theme
      window.createTheme = createTheme
    }
  }, [theme])

  return (
    <MuiThemeProvider theme={theme}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </MuiThemeProvider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
}

/**
 * @returns {(nextOptions: Partial<typeof themeInitialOptions>) => void}
 */
export function useChangeTheme() {
  const dispatch = useContext(DispatchContext)
  return useCallback((options) => dispatch({ payload: options, type: 'CHANGE' }), [dispatch])
}
