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

const StyledTableCell = styled(TableCell)(() => ({
  borderBottom: 0,
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey['900'] : lightBlue[50],
  },
  '&:nth-of-type(odd)': {
    bgcolor: theme.palette.mode === 'dark' ? '' : lightBlue[100],
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
        expandIcon={<ExpandMoreIcon />}
        id="panel1d-header"
      >
        <Typography>
          Εξάμηνο&nbsp;
          {semester}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ overflowX: 'auto', overflowY: 'hidden', padding: 0 }}>
        <Table>
          <TableHead component={Paper} elevation={2}>
            <TableRow>
              <StyledTableCell align="center" rowSpan="2" sx={{ minWidth: '16px', width: '32px' }}>
                Κωδ.
              </StyledTableCell>
              <StyledTableCell rowSpan="2" style={{ minWidth: '10rem' }}>
                Τίτλος
              </StyledTableCell>
              <StyledTableCell align="center" rowSpan="2" sx={{ minWidth: '16px', width: '32px' }}>
                Είδος
              </StyledTableCell>
              <StyledTableCell
                align="center"
                colSpan="2"
                sx={{
                  borderBottom: '1px solid rgba(224, 224, 224, 1)',
                  minWidth: '16px',
                  width: '32px',
                }}
              >
                Ώρες
              </StyledTableCell>
              <StyledTableCell
                align="center"
                rowSpan="2"
                style={{ minWidth: '16px', width: '32px' }}
              >
                Π.Μ.
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center">Θ</StyledTableCell>
              <StyledTableCell align="center">Ε</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell align="center">{row.lessonCode}</StyledTableCell>
                <StyledTableCell align="left">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.type}</StyledTableCell>
                <StyledTableCell align="center">{row.hoursTheory}</StyledTableCell>
                <StyledTableCell align="center">{row.hoursLab}</StyledTableCell>
                <StyledTableCell align="center">{row.credit}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </AccordionDetails>
    </Accordion>
  )
}
