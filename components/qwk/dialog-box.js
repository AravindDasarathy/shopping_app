import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'

export default function DialogBox(props) {
  return (
    <div>
      {props.children}
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle id="alert-dialog-title">{props.title || 'Dialog Box'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.content || 'Dialog content missing!'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onAgree} color="primary" autoFocus>
            Yeah!
          </Button>
          <Button onClick={props.onDisagree} color="primary">
            Nah..
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
