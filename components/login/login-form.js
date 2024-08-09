import { Container, Avatar, Typography, Button, makeStyles } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { TextField, Loader } from '../qwk'
import { useCredentials } from '../../hooks'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    justifyContent: 'center',
  },
  text: {
    color: theme.palette.secondary,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.dark,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  // purple: #8356DE
  // green: #86F3C7
}))

const LOGIN_MUTATION = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(credentials: { email: $email, password: $password }) {
      access_token
    }
  }
`

export default function LoginForm({ onSubmit }) {
  const classes = useStyles()
  const [email, password, setCredentials] = useCredentials()
  const [loginUser, { loading, error }] = useMutation(LOGIN_MUTATION, {
    errorPolicy: 'all',
  })

  const handleInputFor = (key) => (event) =>
    setCredentials({
      [key]: event.target.value,
    })

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await loginUser({
        variables: {
          email,
          password,
        },
      })

      setCredentials({ email: '', password: '' })
      onSubmit(data.login.access_token)
    } catch (e) {
      console.error(e)
    }
  }
  if (error) {
    return (
      <Typography variant="h5" component="p" color="error">
        Something went wrong. Please try again later.
      </Typography>
    )
  }

  return (
    <>
      <Loader loading={!!loading} />
      <Container component="paper" maxWidth="xs" className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Log in
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            autoFocus
            required
            fullWidth
            value={email}
            variant="outlined"
            margin="normal"
            id="email"
            type="email"
            label="Email"
            autoComplete="email"
            onChange={handleInputFor('email')}
            color="secondary"
          />
          <TextField
            value={password}
            required
            fullWidth
            variant="outlined"
            margin="normal"
            id="password"
            type="password"
            label="Password"
            autoComplete="current-password"
            onChange={handleInputFor('password')}
            color="secondary"
          />
          <Button
            fullWidth
            color="primary"
            type="submit"
            variant="contained"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </Container>
    </>
  )
}
