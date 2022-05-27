import { useChangeTheme } from '../theme-context'
import { useState } from 'react'
import { getCookie } from '../../scripts/helpers'
import { Box, ToggleButton, ToggleButtonGroup, useMediaQuery } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import SettingsBrightnessIcon from '@material-ui/icons/SettingsBrightness'

const IconToggleButton = styled(ToggleButton)({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
})

export default function ChangeThemeMode() {
  const changeTheme = useChangeTheme()
  const [mode, setMode] = useState(getCookie('paletteMode') || 'system')
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const preferredMode = prefersDarkMode ? 'dark' : 'light'

  const handleChangeThemeMode = (event, paletteMode) => {
    if (paletteMode === null) {
      return
    }

    setMode(paletteMode)

    if (paletteMode === 'system') {
      document.cookie = `paletteMode=;path=/;max-age=31536000`
      changeTheme({ paletteMode: preferredMode })
    } else {
      document.cookie = `paletteMode=${paletteMode};path=/;max-age=31536000`
      changeTheme({ paletteMode })
    }
  }

  return (
    <Box sx={{ pl: 2, pr: 2, mt: 2 }}>
      <ToggleButtonGroup
        exclusive
        value={mode}
        color="primary"
        onChange={handleChangeThemeMode}
        aria-labelledby="settings-mode"
        fullWidth
      >
        <IconToggleButton
          value="light"
          aria-label="light"
          data-ga-event-category="settings"
          data-ga-event-action="light"
        >
          <Brightness7Icon />
        </IconToggleButton>
        <IconToggleButton
          value="system"
          aria-label="system"
          data-ga-event-category="settings"
          data-ga-event-action="system"
        >
          <SettingsBrightnessIcon />
        </IconToggleButton>
        <IconToggleButton
          value="dark"
          aria-label="dark"
          data-ga-event-category="settings"
          data-ga-event-action="dark"
        >
          <Brightness4Icon />
        </IconToggleButton>
      </ToggleButtonGroup>
    </Box>
  )
}
