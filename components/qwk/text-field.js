import TextField from '@material-ui/core/TextField'

export default function QwkTextField(props) {
  const { required = true } = props
  return (
    <TextField
      autoFocus
      required={required}
      fullWidth
      variant="outlined"
      margin="normal"
      color="secondary"
      {...props}
    />
  )
}
