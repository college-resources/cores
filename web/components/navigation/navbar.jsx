import { useState } from 'react'
import { selectStatus, selectUser, status as authStatus } from 'redux/authSlice'
import { useTheme } from '@material-ui/core/styles'
import AccountCircle from '@material-ui/icons/AccountCircle'
import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import ButtonLink from 'components/button-link'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import PermanentBar from './permanent-bar'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { useSelector } from 'react-redux'
import SidebarList from './sidebar-list'

const iOS = process.browser && /iPad|iPhone|iPod/u.test(navigator.userAgent)

const drawerWidth = 240

export default function Navbar(props) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { title } = props
  const user = useSelector(selectUser)
  const currentAuthStatus = useSelector(selectStatus)

  const theme = useTheme()

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
              [theme.breakpoints.up('lg')]: {
                display: 'none',
              },
              mr: 2,
            }}
          >
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            open={drawerOpen}
            onOpen={toggleDrawer(true)}
            onClose={toggleDrawer(false)}
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            sx={{
              [theme.breakpoints.up('lg')]: {
                display: 'none',
              },
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                bgcolor: theme.palette.mode === 'dark' ? theme.palette.common.black : '',
              },
            }}
          >
            <Toolbar />
            <SidebarList />
          </SwipeableDrawer>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
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
            <Button color="inherit" component={ButtonLink} href="/login">
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
