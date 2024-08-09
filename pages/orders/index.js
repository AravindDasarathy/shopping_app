import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { OrdersList } from '../../components'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5, 0),
  },
  vSpace: {
    margin: theme.spacing(2, 0),
  },
}))

export default function Dashboard() {
  const classes = useStyles()

  return (
    <Container component="main" maxWidth="lg" className={classes.root}>
      <Typography variant="h4" component="h2" gutterBottom>
        Orders List
      </Typography>

      <OrdersList orders={[]} />
    </Container>
  )
}
