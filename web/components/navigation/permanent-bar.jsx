import { Drawer, Paper, Toolbar } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import SidebarList from './sidebar-list'

const drawerWidth = 240

export default function PermanentBar() {
  const theme = useTheme()

  return (
    <Drawer
      variant="permanent"
      sx={{
        [theme.breakpoints.down('lg')]: {
          display: 'none',
        },
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxShadow: 1,
        },
      }}
    >
      <Paper elevation={1} sx={{ height: '100%' }}>
        <Toolbar />
        <SidebarList />
      </Paper>
    </Drawer>
  )
}
