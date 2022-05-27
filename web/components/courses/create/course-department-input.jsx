import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

export default function CourseDepartmentInput(props) {
  const { departments, onChange, value } = props

  return (
    <TextField
      fullWidth
      id="department-input"
      label="Department"
      margin="normal"
      onChange={onChange}
      required
      select
      value={value}
      variant="outlined"
    >
      {departments.map((department) => (
        <MenuItem key={department._id} value={department._id} sx={{ width: 200 }}>
          {department.name}
        </MenuItem>
      ))}
    </TextField>
  )
}
