import { QUERY_KEYS } from '../../contrants/query-keys';
import { useQuery } from 'react-query';
import { getRooms } from '../../api';
import { Room } from '../../types';
import { Layout } from '../../components';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { StyledTableCell, StyledTableRow } from '../../styles';

//Rooms component
const Rooms = () => {
    const { data: rooms } = useQuery<Room[]>(QUERY_KEYS.ROOMS, getRooms)
  return (
      <Layout>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <h1>A L L • R O O M S</h1>
          </Grid>
          <Grid item>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 300 }} aria-label="customized table">
                <TableHead>
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
          </Grid>
        </Grid>
    </Layout>
  );
}

 export { Rooms };