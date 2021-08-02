import { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import CoursesModule from 'components/home/CoursesModule'
import FeedingModule from 'components/home/FeedingModule'
import Grid from '@material-ui/core/Grid'

export default function Homepage(props) {
  useEffect(() => {
    props.updateTitle('Home')
  }, [])

  return (
    <Container>
      <Box mt={2}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <FeedingModule />
            </Grid>
            <Grid item md={6} xs={12}>
              <CoursesModule />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
