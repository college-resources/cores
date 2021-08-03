import { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import CourseCodeInput from 'components/courses/create/course-code-input'
import Container from '@material-ui/core/Container'
import CourseCreditInput from 'components/courses/create/course-credit-input'
import CourseDepartmentInput from 'components/courses/create/course-department-input'
import Grid from '@material-ui/core/Grid'
import CourseHoursLabInput from 'components/courses/create/course-hours-lab-input'
import CourseHoursLectureInput from 'components/courses/create/course-hours-lecture-input'
import CourseNameInput from 'components/courses/create/course-name-input'
import CourseSemesterInput from 'components/courses/create/course-semester-input'
import CourseTypeInput from '../../../components/courses/create/course-type-input'
import { dynamicSort } from 'scripts/sorting'
import gql from 'scripts/graphql'
import { makeStyles } from '@material-ui/core/styles'

const departmentHandler = () =>
  Promise.resolve(
    gql(`
  query {
    departments {
      _id
      name
    }
  }
`).then((data) => data.departments.sort(dynamicSort('name'))),
  )

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}))

function formDefaults() {
  return {
    name: '',
    department: '',
    semester: 1,
    code: '',
    lectureHours: 0,
    labHours: 0,
    credit: 0,
    type: '',
  }
}

export default function CreatePage(props) {
  const classes = useStyles()
  const [departments, setDepartments] = useState([])
  const [values, setValues] = useState(formDefaults())

  useEffect(() => {
    props.updateTitle('Create course')
    departmentHandler().then((gqlDepartments) => {
      if (gqlDepartments) {
        setDepartments(gqlDepartments)
      }
    })
  }, [])

  const lessonHandler = () => {
    const query = `
      mutation (
        $name: String!,
        $department: ID!,
        $semester: Int!,
        $code: String!,
        $lectureHours: Int!,
        $labHours: Int!,
        $credit: Int!,
        $type: String!
      ) {
        addLesson(
          lesson: {
            name: $name,
            department: $department,
            semester: $semester,
            lessonCode: $code,
            hoursTheory: $lectureHours,
            hoursLab: $labHours,
            credit: $credit,
            type: $type
          }
        ) {
          _id
        }
      }
    `

    gql(query, values)
  }

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target ? event.target.value : event,
    })
  }

  function handleClear() {
    setValues(formDefaults())
  }

  function handleSave() {
    lessonHandler()
    handleClear()
  }

  return (
    <Container>
      <form autoComplete="off" className={classes.container} noValidate>
        <CourseNameInput onChange={handleChange('name')} value={values.name} />
        <CourseDepartmentInput
          departments={departments}
          onChange={handleChange('department')}
          value={values.department}
        />
        <CourseSemesterInput
          onChange={handleChange('semester')}
          setValues={setValues}
          value={values.semester}
        />
        <CourseCodeInput onChange={handleChange('code')} value={values.code} />
        <CourseHoursLectureInput
          onChange={handleChange('lectureHours')}
          value={values.lectureHours}
        />
        <CourseHoursLabInput onChange={handleChange('labHours')} value={values.labHours} />
        <CourseCreditInput onChange={handleChange('credit')} value={values.credit} />
        <CourseTypeInput onChange={handleChange('type')} value={values.type} />
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Button
              className={classes.dense}
              color="primary"
              fullWidth
              onClick={handleSave}
              type="button"
              variant="contained"
            >
              Save
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              className={classes.dense}
              color="secondary"
              fullWidth
              onClick={handleClear}
              type="button"
              variant="contained"
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}
