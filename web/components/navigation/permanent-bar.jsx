import Drawer from '@material-ui/core/Drawer'
import SidebarList from './sidebar-list'
import { styled, useTheme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

const Toolbar = styled('div')(({ theme }) => ({
  // Necessary for content to be below app bar
  // TODO: Fix
  toolbar: theme.mixins.toolbar,
}))

export default function PermanentBar() {
  const theme = useTheme()

  return (
    <Drawer
      variant="permanent"
      sx={{
        backgroundColor: theme.palette.background.tertiary,
        [theme.breakpoints.down('xl')]: {
          display: 'none',
        },
      }}
    >
      <Box
        sx={{
          width: 240,
          marginTop: '64px',
        }}
      >
        <Toolbar />
        <SidebarList />
      </Box>
    </Drawer>
  )
}
