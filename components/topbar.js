import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  useScrollTrigger,
  Slide,
  Tab,
  Tabs,
} from '@material-ui/core'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import { topbarTabs } from '../constants'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}))

function HideOnScroll(props) {
  const { children } = props
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

function renderTab(label, path) {
  return <Tab key={label} label={label} onClick={() => Router.push(path)} />
}

export default function Topbar(props) {
  const router = useRouter()
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    setValue(topbarTabs.findIndex((tab) => tab.path.includes(router.pathname)))
  }, [router.pathname, topbarTabs])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              <Link href="/dashboard">
                <a style={{ textDecoration: 'none', color: '#fff' }}>QWK Merchant</a>
              </Link>
            </Typography>
          </Toolbar>
          <Tabs variant="fullWidth" value={value} onChange={handleChange}>
            {topbarTabs.map(({ label, path }) => renderTab(label, path))}
          </Tabs>
        </AppBar>
      </HideOnScroll>
    </div>
  )
}
