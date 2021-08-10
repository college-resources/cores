import BookIcon from '@material-ui/icons/Book'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core'
import { styled, useTheme } from '@material-ui/core/styles'

const LessonGrid = styled(Grid)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
}))

export default function CoursesModule() {
  const theme = useTheme()

  return (
    <Paper sx={{ padding: theme.spacing(2) }}>
      <Box alignItems="center" display="flex" justifyContent="center" mb={2.5} mt={0.5}>
        <BookIcon />
        <Box mx={1}>
          <Typography variant="h6">COURSES</Typography>
        </Box>
        <BookIcon />
      </Box>
      <Divider />
      <Box mt={2}>
        <Box mb={1}>
          <Paper elevation={2}>
            <LessonGrid alignItems="center" container wrap="nowrap">
              <Grid item>
                <Box p={2}>
                  <Typography>1</Typography>
                </Box>
              </Grid>
              <Divider flexItem orientation="vertical" />
              <Grid item>
                <Box p={2}>
                  <Typography>[PH] Lesson 1</Typography>
                </Box>
              </Grid>
            </LessonGrid>
          </Paper>
        </Box>
        <Box mb={1}>
          <Paper elevation={2}>
            <LessonGrid alignItems="center" container wrap="nowrap">
              <Grid item>
                <Box p={2}>
                  <Typography>2</Typography>
                </Box>
              </Grid>
              <Divider flexItem orientation="vertical" />
              <Grid item>
                <Box p={2}>
                  <Typography>[PH] Lesson 2</Typography>
                </Box>
              </Grid>
            </LessonGrid>
          </Paper>
        </Box>
        <Box mb={0.5}>
          <Paper elevation={2}>
            <LessonGrid alignItems="center" container wrap="nowrap">
              <Grid item>
                <Box p={2}>
                  <Typography>2</Typography>
                </Box>
              </Grid>
              <Divider flexItem orientation="vertical" />
              <Grid item>
                <Box p={2}>
                  <Typography>[PH] Lesson 3</Typography>
                </Box>
              </Grid>
            </LessonGrid>
          </Paper>
        </Box>
      </Box>
    </Paper>
  )
}
