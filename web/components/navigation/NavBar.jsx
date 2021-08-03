import { useState } from 'react'
import { status as authStatus, selectStatus, selectUser } from 'redux/authSlice'
import { useTheme } from '@material-ui/core/styles'
import AccountCircle from '@material-ui/icons/AccountCircle'
import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Button from '@material-ui/core/Button'
import ButtonLink from 'components/ButtonLink'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import PermanentBar from './PermanentBar'
import SwipeableBar from './SwipeableBar'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { useChangeTheme } from 'components/ThemeContext'
import { useSelector } from 'react-redux'

const iOS = process.browser && /iPad|iPhone|iPod/u.test(navigator.userAgent)

export default function NavBar(props) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { title } = props
  const user = useSelector(selectUser)
  const currentAuthStatus = useSelector(selectStatus)

  const theme = useTheme()
  const changeTheme = useChangeTheme()
  function handleTogglePaletteMode() {
    const paletteMode = theme.palette.mode === 'light' ? 'dark' : 'light'
    changeTheme({ paletteMode })
  }

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setDrawerOpen(open)
  }

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: theme.palette.primary.dark,
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="menu"
            color="inherit"
            edge="start"
            onClick={toggleDrawer(true)}
            sx={{
              [theme.breakpoints.up('xl')]: {
                display: 'none',
              },
              color: theme.palette.common.white,
              marginRight: theme.spacing(2),
            }}
          >
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            open={drawerOpen}
            sx={{
              [theme.breakpoints.up('xl')]: {
                display: 'none',
              },
            }}
          >
            <SwipeableBar setDrawerOpen={setDrawerOpen} />
          </SwipeableDrawer>
          <Typography variant="h6" sx={{ color: theme.palette.common.white, flexGrow: 1 }}>
            {title}
          </Typography>
          <IconButton color="inherit" onClick={handleTogglePaletteMode}>
            {theme.palette.mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
          {currentAuthStatus === authStatus.AUTHENTICATED ? (
            <IconButton
              aria-controls="menu-appbar"
              aria-haspopup="true"
              aria-label="account of current user"
              color="inherit"
              component={ButtonLink}
              href="/profile"
            >
              {user.picture ? (
                <Avatar
                  alt="account picture"
                  src={user.picture}
                  sx={{ height: '32px', width: '32px' }}
                />
              ) : (
                <AccountCircle sx={{ height: '32px', width: '32px' }} />
              )}
            </IconButton>
          ) : (
            <Button
              color="inherit"
              component={ButtonLink}
              href="/login"
              sx={{ color: theme.palette.common.white }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <PermanentBar />
      <Toolbar />
    </>
  )
}
