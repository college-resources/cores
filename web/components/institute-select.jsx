import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import { useDispatch, useSelector } from 'react-redux'
import {
  getInstitutes,
  selectInstituteIndex,
  selectInstitutes,
  updateInstituteIndex,
} from 'redux/instituteSlice'
import { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { styled } from '@material-ui/core/styles'

export default function InstituteSelect() {
  const dispatch = useDispatch()
  const institutes = useSelector(selectInstitutes)
  const selectedInstituteIndex = useSelector(selectInstituteIndex)

  useEffect(() => {
    dispatch(getInstitutes())
  }, [])

  function handleInstituteChange(event) {
    dispatch(updateInstituteIndex(event.target.value))
  }

  const Dropdown = styled(TextField)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      marginBottom: 0,
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
    <Box display="flex">
      <Dropdown
        id="institute"
        label="Institute"
        margin="normal"
        onChange={handleInstituteChange}
        select
        value={selectedInstituteIndex >= 0 ? selectedInstituteIndex : ''}
        variant="outlined"
      >
        {institutes.map((institute, index) => (
          <MenuItem key={institute._id} value={index}>
            <Box xsDown sx={{ display: { xs: 'none', sm: 'block' } }}>
              <b>{institute.acronym}</b>&nbsp;-&nbsp;{institute.name}
            </Box>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <b>{institute.acronym}</b>
              &nbsp;
              <span style={{ fontSize: '0.8rem' }}>{institute.name}</span>
            </Box>
          </MenuItem>
        ))}
      </Dropdown>
    </Box>
  )
}
