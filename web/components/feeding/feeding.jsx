import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { Favorite, FavoriteBorder } from '@material-ui/icons'
import Typography from '@material-ui/core/Typography'
import Menu from './menu'
import { useDispatch, useSelector } from 'react-redux'
import { getFeeding, selectFeedingIndex, selectFeedings, updateFeeding } from 'redux/feedingSlice'
import {
  getPreferences,
  PREFERENCE_FEEDING,
  selectPreferences,
  updatePreference,
} from 'redux/preferencesSlice'
import { useEffect, useState } from 'react'
import { pink } from '@material-ui/core/colors'
import { selectInstituteIndex } from 'redux/instituteSlice'
import isEmpty from 'lodash/isEmpty'
import { styled } from '@material-ui/core/styles'

export default function Feeding() {
  const dispatch = useDispatch()
  const feedings = useSelector(selectFeedings)
  const selectedFeedingIndex = useSelector(selectFeedingIndex)
  const selectedInstituteIndex = useSelector(selectInstituteIndex)
  const preferences = useSelector(selectPreferences)
  const [favoriteFeeding, setFavoriteFeeding] = useState(null)
  const [displayAsFavorite, setDisplayAsFavorite] = useState(false)

  useEffect(() => {
    dispatch(getFeeding())
    dispatch(getPreferences())
  }, [])

  useEffect(() => {
    dispatch(getFeeding())
  }, [selectedInstituteIndex])

  useEffect(() => {
    setFavoriteFeeding(preferences ? preferences.feeding : null)
  }, [preferences])

  // Automatically go to favorite feeding on page load
  useEffect(() => {
    if (favoriteFeeding)
      feedings?.map((feed, index) => {
        if (favoriteFeeding._id === feed._id) dispatch(updateFeeding(index))
      })
  }, [favoriteFeeding, feedings])

  // If the user has a favorite feeding and it's the same as the currently
  // selected one, display it to the user as favorite
  useEffect(() => {
    setDisplayAsFavorite(isFavorite())
  }, [favoriteFeeding, feedings, selectedFeedingIndex])

  function handleFavoriteChange() {
    if (selectedFeedingIndex >= 0) {
      dispatch(
        updatePreference({
          preference: PREFERENCE_FEEDING,
          value: isFavorite() ? null : feedings[selectedFeedingIndex],
        }),
      )
    } else {
      alert('Choose a feeding first') // TODO: Beautify - Translate
    }
  }

  function isFavorite() {
    return !!favoriteFeeding && favoriteFeeding._id === feedings[selectedFeedingIndex]?._id
  }

  function handleFeedingChange(event) {
    dispatch(updateFeeding(event.target.value))
  }

  const Dropdown = styled(TextField)(({ theme }) => ({
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
      <Box display="flex">
        <Dropdown
          id="restaurant"
          label="Restaurant"
          margin="normal"
          onChange={handleFeedingChange}
          select
          value={selectedFeedingIndex >= 0 ? selectedFeedingIndex : ''}
          variant="outlined"
        >
          {isEmpty(feedings) ? (
            <MenuItem value={-1}>No restaurants found</MenuItem>
          ) : (
            feedings.map((feed, index) => (
              <MenuItem key={feed._id} value={index}>
                {feed.name}
              </MenuItem>
            ))
          )}
        </Dropdown>
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={displayAsFavorite}
                onChange={handleFavoriteChange}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite sx={{ color: pink['A400'] }} />}
                name="checkedH"
              />
            }
            label=""
            sx={{ ml: 1, mr: 0, mt: 3 }}
          />
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={displayAsFavorite}
                onChange={handleFavoriteChange}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite sx={{ color: pink['A400'] }} />}
                name="checkedH"
              />
            }
            label="Favourite"
            sx={{ ml: 1, mr: 0, mt: 3 }}
          />
        </Box>
      </Box>
      {selectedFeedingIndex < 0 ? (
        <Box mt={5}>
          <Typography align="center">
            Select a restaurant from the dropdown to see its menu.
          </Typography>
        </Box>
      ) : (
        <Menu />
      )}
    </>
  )
}
