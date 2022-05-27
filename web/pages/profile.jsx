import { useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import { styled } from '@material-ui/core/styles'
import { selectUser } from 'redux/authSlice'
import { useSelector } from 'react-redux'

export default function ProfilePage(props) {
  const user = useSelector(selectUser)

  useEffect(() => {
    props.updateTitle('Profile')
  }, [])

  const Card = styled(Paper)(({ theme }) => ({ padding: theme.spacing(2), textAlign: 'center' }))

  return (
    <Container>
      <Box mt={2}>
        <Grid container justifyContent="center" spacing={3}>
          <Grid item md={6} xs={12}>
            <Card>
              <Avatar
                alt="account picture"
                src={user.picture}
                sx={{ height: '5rem', margin: 'auto', marginBottom: '1rem', width: '5rem' }}
              />
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                defaultValue={user.given_name}
                fullWidth
                label="First Name"
                margin="normal"
                variant="outlined"
              />
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                defaultValue={user.family_name}
                fullWidth
                label="Last Name"
                margin="normal"
                variant="outlined"
              />
            </Card>
          </Grid>
          <Grid item md={6} xs={12}>
            <Card>
              <Box fontSize="h6.fontSize" fontWeight="fontWeightMedium">
                Email Address
              </Box>
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                defaultValue={user.email}
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box mt={2}>{JSON.stringify(user)}</Box>
    </Container>
  )
}
