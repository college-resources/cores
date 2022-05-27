import TextField from '@material-ui/core/TextField'

export default function CourseNameInput(props) {
  const { onChange, value } = props

  return (
    <TextField
      fullWidth
      id="name-input"
      label="Course Name"
      margin="normal"
      onChange={onChange}
      required
      value={value}
      variant="outlined"
    />
  )
}
