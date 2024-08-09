import { Container, Typography, Button, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { InventoryList } from '../../components'
import Link from 'next/link'

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
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" component="h2" gutterBottom>
          Your Inventory
        </Typography>
        <Link href="/inventory/new">
          <Button variant="contained" color="primary">
            Create Item
          </Button>
        </Link>
      </Box>

      <InventoryList inventoryItems={[]} />
    </Container>
  )
}
