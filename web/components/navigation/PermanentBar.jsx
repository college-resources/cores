import Drawer from '@material-ui/core/Drawer'
import SideBarList from './SideBarList'
import { styled } from '@material-ui/core/styles';

const NavDrawer = styled(Drawer)(({ theme }) => ({
  backgroundColor: theme.palette.background.tertiary,
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
  width: 240,
}))

const Toolbar = styled('div')(({ theme }) => ({
  // Necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}))

export default function PermanentBar() {
  return (
    <NavDrawer variant="permanent">
      <Toolbar />
      <SideBarList />
    </NavDrawer>
  )
}
