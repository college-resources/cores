import ButtonLink from 'components/button-link'
import ListItem from '@material-ui/core/ListItem'

export default function ListItemLink(props) {
  return <ListItem button component={ButtonLink} {...props} />
}
