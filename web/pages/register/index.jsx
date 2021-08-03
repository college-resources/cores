import { useEffect, useState } from 'react'
import { Avatar, Box, Button, Container, Grid, TextField, Typography } from '@material-ui/core'
import { styled, useTheme } from '@material-ui/core/styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { register } from 'redux/authSlice'
import { useDispatch } from 'react-redux'
import StyledLink from 'components/styled-link'

export default function RegisterPage(props) {
  const theme = useTheme()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [familyName, setFamilyName] = useState('')
  const [givenName, setGivenName] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    props.updateTitle('Register')
  }, [])

  function handleEmailOnChange(event) {
    setEmail(event.target.value)
  }

  function handleFamilyNameOnChange(event) {
    setFamilyName(event.target.value)
  }

  function handleGivenNameOnChange(event) {
    setGivenName(event.target.value)
  }

  function handlePasswordOnChange(event) {
    setPassword(event.target.value)
  }

  function handleRegister() {
    dispatch(register(email, givenName, familyName, password))
  }

  const Form = styled('form')(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.text.permanentLight,
      },
    },
    '& label.Mui-focused': {
      color: theme.palette.mode === 'dark' && theme.palette.common.white,
    },
    marginTop: theme.spacing(3),
  }))

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <Avatar
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.mode === 'dark' && theme.palette.text.permanentLight,
            margin: theme.spacing(2),
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Form noValidate>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <TextField
                autoComplete="given-name"
                autoFocus
                fullWidth
                id="firstName"
                label="First Name"
                name="fname"
                onChange={handleGivenNameOnChange}
                required
                value={givenName}
                variant="outlined"
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                autoComplete="family-name"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lname"
                onChange={handleFamilyNameOnChange}
                required
                value={familyName}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={handleEmailOnChange}
                required
                value={email}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="new-password"
                fullWidth
                id="password"
                label="Password"
                name="password"
                onChange={handlePasswordOnChange}
                required
                type="password"
                value={password}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Button
            color="primary"
            fullWidth
            onClick={handleRegister}
            type="button"
            variant="contained"
            sx={{
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
              backgroundColor: theme.palette.primary.light,
              margin: theme.spacing(3, 0, 2),
            }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <StyledLink href="/login">Already have an account? Sign in</StyledLink>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </Container>
  )
}
