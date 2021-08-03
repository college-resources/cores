import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import { styled } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { selectInstituteIndex } from 'redux/instituteSlice'
import { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import {
  getDepartments,
  selectDepartmentIndex,
  selectDepartments,
  updateDepartmentIndex,
} from 'redux/departmentSlice'
import isEmpty from 'lodash/isEmpty'

export default function DepartmentSelect() {
  const dispatch = useDispatch()
  const selectedInstituteIndex = useSelector(selectInstituteIndex)
  const departments = useSelector(selectDepartments)
  const selectedDepartmentIndex = useSelector(selectDepartmentIndex)

  useEffect(() => {
    if (selectedInstituteIndex >= 0) {
      dispatch(getDepartments(selectedInstituteIndex))
    }
  }, [selectedInstituteIndex])

  function handleDepartmentChange(event) {
    dispatch(updateDepartmentIndex(event.target.value))
  }

  const Dropdown = styled(TextField)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
    },
    flexGrow: 1,
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: 'gray',
      },
    },
    '& label.Mui-focused': {
      color: theme.palette.mode === 'dark' && theme.palette.common.white,
    },
  }))

  return (
    <>
      {selectedInstituteIndex >= 0 && (
        <Box display="flex" mb={0}>
          <Dropdown
            id="department"
            label="Department"
            margin="normal"
            onChange={handleDepartmentChange}
            select
            value={selectedDepartmentIndex >= 0 ? selectedDepartmentIndex : ''}
            variant="outlined"
          >
            {isEmpty(departments) ? (
              <MenuItem value={-1}>No departments found</MenuItem>
            ) : (
              departments.map((department, index) => (
                <MenuItem key={department._id} value={index}>
                  {department.name}
                </MenuItem>
              ))
            )}
          </Dropdown>
        </Box>
      )}
    </>
  )
}
