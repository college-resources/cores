import { useEffect } from 'react'
import { getPreferences, selectPreferences } from 'redux/preferencesSlice'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import RestaurantIcon from '@material-ui/icons/Restaurant'
import { Typography } from '@material-ui/core'
import formatMsTo24h from 'scripts/formatMsTo24h'
import { green } from '@material-ui/core/colors'
import { styled } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ButtonLink from 'components/ButtonLink'

const findLastAndNextMeal = (feeding) => {
  const currentDayInWeeks = feeding.weeks.map(
    (week) => week.days[(new Date().getDay() + 6) % 7],
  )
  return currentDayInWeeks.map((day) => {
    let isLastOpen = false
    let lastMeal = ''
    let nextMeal = ''

    const currentTimeMs =
      (Date.now() - new Date().getTimezoneOffset() * 60 * 1000) %
      (24 * 3600 * 1000)

    day.meals.forEach((meal) => {
      if (meal.timeStart < currentTimeMs) {
        lastMeal = meal
        if (meal.timeEnd > currentTimeMs) {
          isLastOpen = true
        }
      }

      if (meal.timeStart > currentTimeMs && !nextMeal) {
        nextMeal = meal
      }
    })

    if (!nextMeal) {
      ;[nextMeal] = day.meals
    }

    return { isLastOpen, lastMeal, nextMeal }
  })
}

const findCurrentWeek = (feeding) => {
  const weeksLength = feeding.weeks.length
  if (weeksLength < 2) return 0

  const msInADay = 1000 * 60 * 60 * 24

  const startsFrom = new Date(feeding.startsFrom)
  const differenceBetweenStartDateAndNowInMs = Date.now() - startsFrom.getTime()
  const daysFromStart = Math.floor(
    differenceBetweenStartDateAndNowInMs / msInADay,
  )
  const daysFromReset = daysFromStart % (weeksLength * 7)

  return Math.floor(daysFromReset / 7)
}

function FavoriteFeeding({ favoriteFeeding }) {
  const meals = findLastAndNextMeal(favoriteFeeding)
  const currentWeekIndex = findCurrentWeek(favoriteFeeding)
  const timeOfNextMeal = meals[currentWeekIndex].nextMeal.timeStart

  const IsOpen = styled(Box)(({ theme }) => ({
    color: meals[currentWeekIndex].isLastOpen
      ? green['600']
      : theme.palette.error.main,
  }))

  return (
    <Grid
      alignItems="flex-start"
      container
      direction="row"
      justifyContent="space-between"
      key={favoriteFeeding._id}
    >
      <Box mr={2}>
        <p>
          <b>{favoriteFeeding.name}</b>
          {` (Week ${currentWeekIndex + 1})`}
        </p>
      </Box>
      <p>
        <IsOpen component="span">
          <b>
            {meals[currentWeekIndex].isLastOpen
              ? `Open until ${formatMsTo24h(
                  meals[currentWeekIndex].lastMeal.timeEnd,
                )}`
              : 'Closed'}
          </b>
        </IsOpen>
        {' - Next meal '}
        <b>{formatMsTo24h(timeOfNextMeal)}</b>
      </p>
    </Grid>
  )
}

export default function FeedingModule() {
  const dispatch = useDispatch()
  const { feeding: favoriteFeeding } = useSelector(selectPreferences)

  useEffect(() => {
    dispatch(getPreferences())
  }, [])

  const Module = styled(Paper)(({ theme }) => ({
    color: theme.palette.text.secondary,
    padding: theme.spacing(2),
  }))

  return (
    <Module elevation={3}>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="center"
        mb={2.5}
        mt={0.5}
      >
        <RestaurantIcon />
        <Box mx={1}>
          <Typography variant="h6">FEEDING</Typography>
        </Box>
        <RestaurantIcon />
      </Box>
      <Divider />
      {favoriteFeeding ? (
        <Box pt={1} px={2}>
          <FavoriteFeeding favoriteFeeding={favoriteFeeding} />
        </Box>
      ) : (
        <Box pt={2}>
          <Grid
            alignItems="center"
            container
            direction="row"
            justifyContent="center"
          >
            <Button
              href="/feeding"
              component={ButtonLink}
              variant="outlined"
              color="inherit"
            >
              CHOOSE A FAVOURITE FEEDING TO APPEAR HERE
            </Button>
          </Grid>
        </Box>
      )}
    </Module>
  )
}
