import { Box } from '@material-ui/core'
import SideBarList from './SideBarList'

export default function SwipeableBar(props) {
  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    props.setDrawerOpen(open)
  }

  return (
    <Box
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      role="presentation"
      sx={{
        width: 240,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginTop: '64px',
      }}
    >
      <SideBarList />
    </Box>
  )
}
