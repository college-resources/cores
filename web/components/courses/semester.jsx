import { styled, useTheme } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { lightBlue } from '@material-ui/core/colors'
import { TableContainer } from '@material-ui/core'

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey['900'] : lightBlue[50],
  },
  '&:nth-of-type(odd)': {
    bgcolor: theme.palette.mode === 'dark' ? '' : lightBlue[100],
  },
  '&:last-child td, &:last-child th': {
    borderBottom: 0,
  },
}))

export default function Semester(props) {
  const theme = useTheme()
  const { semester } = props
  const { rows } = props

  return (
    <Accordion
      sx={{
        bgcolor: theme.palette.mode === 'dark' ? '' : theme.palette.primary.light,
        color: theme.palette.mode === 'dark' ? '' : theme.palette.common.white,
      }}
    >
      <AccordionSummary
        aria-controls="panel-content"
        expandIcon={
          <ExpandMoreIcon
            sx={{ color: theme.palette.mode === 'dark' ? '' : theme.palette.common.white }}
          />
        }
        id="panel1d-header"
      >
        <Typography>
          Εξάμηνο&nbsp;
          {semester}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ overflowX: 'auto', overflowY: 'hidden', p: 0 }}>
        <TableContainer component={Paper} elevation={2} sx={{ borderRadius: ' 0 0 4px 4px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" rowSpan="2" sx={{ minWidth: '16px', width: '32px' }}>
                  Κωδ.
                </TableCell>
                <TableCell rowSpan="2" style={{ minWidth: '10rem' }}>
                  Τίτλος
                </TableCell>
                <TableCell align="center" rowSpan="2" sx={{ minWidth: '16px', width: '32px' }}>
                  Είδος
                </TableCell>
                <TableCell
                  align="center"
                  colSpan="2"
                  sx={{
                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                    minWidth: '16px',
                    width: '32px',
                  }}
                >
                  Ώρες
                </TableCell>
                <TableCell align="center" rowSpan="2" style={{ minWidth: '16px', width: '32px' }}>
                  Π.Μ.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">Θ</TableCell>
                <TableCell align="center">Ε</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row._id}>
                  <TableCell align="center">{row.lessonCode}</TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="center">{row.type}</TableCell>
                  <TableCell align="center">{row.hoursTheory}</TableCell>
                  <TableCell align="center">{row.hoursLab}</TableCell>
                  <TableCell align="center">{row.credit}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  )
}
