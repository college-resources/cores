import { useEffect, useState } from 'react'
import { status as authStatus, login, selectStatus } from 'redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import StyledLink from 'components/styled-link'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import Box from '@material-ui/core/Box'
import { CircularProgress } from '@material-ui/core'
import { styled, useTheme } from '@material-ui/core/styles'

export default function LoginPage(props) {
  const theme = useTheme()
  const dispatch = useDispatch()
  const currentAuthStatus = useSelector(selectStatus)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    props.updateTitle('Login')
  }, [])

  function handleEmailOnChange(event) {
    setEmail(event.target.value)
  }

  function handleLoginWithAuth0(e) {
    e.preventDefault()
    setLoading(true)
    dispatch(login(email, password))
  }

  function handleLoginWithGoogle() {
    window.location.replace('/auth/login/google-oauth2')
  }

  function handlePasswordOnChange(event) {
    setPassword(event.target.value)
  }

  const Form = styled('form')(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.grey['300'],
      },
    },
    '& label.Mui-focused': {
      color: theme.palette.mode === 'dark' && theme.palette.grey['300'],
    },
    mt: 1,
  }))

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <Avatar
          sx={{
            bgcolor: theme.palette.primary.main,
            color: theme.palette.mode === 'dark' && theme.palette.grey['300'],
            m: 2,
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Form onSubmit={handleLoginWithAuth0}>
          <TextField
            autoComplete="email"
            autoFocus
            error={currentAuthStatus === authStatus.FAILURE}
            fullWidth
            id="email"
            label="Email Address"
            margin="normal"
            name="email"
            onChange={handleEmailOnChange}
            required
            type="email"
            value={email}
            variant="outlined"
          />
          <TextField
            autoComplete="current-password"
            error={currentAuthStatus === authStatus.FAILURE}
            fullWidth
            id="password"
            label="Password"
            margin="normal"
            name="password"
            onChange={handlePasswordOnChange}
            required
            type="password"
            value={password}
            variant="outlined"
          />
          <Box
            display={currentAuthStatus === authStatus.FAILURE ? 'block' : 'none'}
            sx={{
              color: theme.palette.mode === 'light' ? red[600] : red[700],
            }}
          >
            <strong>Wrong email or password.</strong>
          </Box>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              m: theme.spacing(2, 0),
            }}
          >
            Sign In
            {loading && currentAuthStatus !== authStatus.FAILURE && (
              <CircularProgress
                sx={{
                  color: 'white',
                  maxWidth: '1rem',
                  maxHeight: '1rem',
                  marginLeft: '0.5rem',
                }}
              />
            )}
          </Button>
          <Grid container>
            <Grid item sm>
              <StyledLink href="/register">Don&apos;t have an account? Sign Up</StyledLink>
            </Grid>
          </Grid>
          <Button
            fullWidth
            onClick={handleLoginWithGoogle}
            variant="contained"
            sx={{
              m: theme.spacing(2, 0),
              bgcolor: theme.palette.mode === 'light' ? red[600] : red[700],
              '&:hover': {
                bgcolor: theme.palette.mode === 'light' ? red[800] : red[900],
              },
            }}
          >
            Sign In with Google
          </Button>
        </Form>
      </Box>
    </Container>
  )
}
