import { useState } from 'react'
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
import { lightBlue } from '@material-ui/core/colors'
import { Box } from '@material-ui/core'

const StyledTableCell = styled(TableCell)(() => ({
  borderBottom: 0,
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.mode === 'light' ? lightBlue[50] : theme.palette.primary.light,
  },
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.mode === 'light' ? lightBlue[100] : theme.palette.primary.level3,
  },
}))

export default function Semester(props) {
  const theme = useTheme()
  const { semester } = props
  const { rows } = props
  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Accordion
        expanded={expanded === `panel${semester}`}
        onChange={handleChange(`panel${semester}`)}
        sx={{ backgroundColor: theme.palette.primary.dark, color: theme.palette.common.white }}
      >
        <AccordionSummary
          aria-controls="panel-content"
          expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.common.white }} />}
          id="panel1d-header"
        >
          <Typography>
            Εξάμηνο&nbsp;
            {semester}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ overflowX: 'auto', overflowY: 'hidden', padding: 0 }}>
          <Table>
            <TableHead
              sx={{
                backgroundColor: theme.palette.secondary.main,
              }}
            >
              <TableRow>
                <StyledTableCell
                  align="center"
                  rowSpan="2"
                  sx={{ minWidth: '16px', width: '32px', color: theme.palette.common.white }}
                >
                  Κωδ.
                </StyledTableCell>
                <StyledTableCell
                  rowSpan="2"
                  style={{ minWidth: '10rem', color: theme.palette.common.white }}
                >
                  Τίτλος
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  rowSpan="2"
                  sx={{ minWidth: '16px', width: '32px', color: theme.palette.common.white }}
                >
                  Είδος
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  colSpan="2"
                  sx={{
                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                    minWidth: '16px',
                    width: '32px',
                    color: theme.palette.common.white,
                  }}
                >
                  Ώρες
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  rowSpan="2"
                  style={{ minWidth: '16px', width: '32px', color: theme.palette.common.white }}
                >
                  Π.Μ.
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell align="center" sx={{ color: theme.palette.common.white }}>
                  Θ
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ color: theme.palette.common.white }}>
                  Ε
                </StyledTableCell>
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
    </Box>
  )
}
