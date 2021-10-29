import { QUERY_KEYS } from '../../contrants/query-keys';
import { useQuery } from 'react-query';
import { getRooms } from '../../api';
import { Room } from '../../types';
import { Layout } from '../../components/layout';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


// Table customization 
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


//Rooms component

const Rooms = () => {
    const { data: rooms } = useQuery<Room[]>(QUERY_KEYS.ROOMS, getRooms)
  return (
      <Layout>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={4}>
                <h1>Rooms</h1>
              </TableCell>
            </TableRow>
            <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="right">Category</StyledTableCell>
                <StyledTableCell align="right">Max occupancy</StyledTableCell>
                <StyledTableCell align="right">Occupancy</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rooms?.map((room) => ( 
                <StyledTableRow key={room.id}>
                <StyledTableCell component="th" scope="row">
                    {room.id}
                </StyledTableCell>
                <StyledTableCell align="right">{room.category}</StyledTableCell>
                <StyledTableCell align="right">{room.max_occupancy}</StyledTableCell>
                <StyledTableCell align="right">{room.occupancy?`Occupied`:`Available`}</StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </Layout>
  );
}

 export { Rooms };