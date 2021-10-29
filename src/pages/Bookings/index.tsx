import { QUERY_KEYS } from '../../contrants/query-keys';
import { useQuery } from 'react-query';
import { getBookingsByDate } from "../../api";
import { Layout } from "../../components/layout";
import { Booking } from '../../types';
import { useState } from 'react';
// Form imports
import moment, { Moment } from "moment";
import { DATE_FORMATS } from '../../contrants/date-formats';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/lab';
// Table imports
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// Helpers imports
import { sortAlphabetically } from './helpers';


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


//Bookings component

const Bookings = () =>{

    const [date, setDate] = useState<Moment>();
    const [category, setCategory] = useState<string>("All");
    const [checked, setChecked] = useState<boolean>(false);

    const { data: bookings } = useQuery<Booking[]>(QUERY_KEYS.BOOKINGS, () => getBookingsByDate(date!));

    if(checked){
        sortAlphabetically(bookings!);
    }

    // useEffect(()=>{
    //     filterByCategory(bookings!, category);
    //     }, [category]);

  return (
    <Layout>
{/* Filter and order options */}
      <FormControl sx={{ m: 1, minWidth: 120 }} component="fieldset">
        <FormLabel component="legend">Bookings options</FormLabel>
        <FormGroup aria-label="position" row>
        <DatePicker
          label="Bookings date"
          value={date}
          onChange={(newValue) => {
            setDate(moment(newValue));
          }}
          renderInput={(params) => <TextField {...params} />}
        />

          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
          labelId="category-select-label"
          id="category-select"
          value={category}
          label="Category"
          onChange={(e)=> setCategory(e.target.value)}
          >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value={"Confort"}>Confort</MenuItem>
              <MenuItem value={"Superior"}>Superior</MenuItem>
              <MenuItem value={"Junior Suite"}>Junior Suite</MenuItem>
              <MenuItem value={"Senior Suite"}>Senior Suite</MenuItem>
          </Select>

          <FormControlLabel
          control={<Checkbox 
              onChange={(e)=> setChecked(e.target.checked)}/>}
          label="Alphabetical lastname order"
          labelPlacement="start"
          />

        </FormGroup>
      </FormControl>

{/* Table render */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={4}>
                <h1>Bookings</h1>
              </TableCell>
            </TableRow>
            <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
                <StyledTableCell align="right">First name</StyledTableCell>
                <StyledTableCell align="right">Last name</StyledTableCell>
                <StyledTableCell align="right">Room id</StyledTableCell>
                <StyledTableCell align="right">Number of guests</StyledTableCell>
                <StyledTableCell align="right">Check-in date</StyledTableCell>
                <StyledTableCell align="right">Check-out date</StyledTableCell>
                <StyledTableCell align="right">Price per night</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings?.map((booking) => ( 
                <StyledTableRow key={booking.id}>
                <StyledTableCell component="th" scope="row">
                    {booking.id}
                </StyledTableCell>
                <StyledTableCell align="right">{booking.booking_status}</StyledTableCell>
                <StyledTableCell align="right">{booking.first_name}</StyledTableCell>
                <StyledTableCell align="right">{booking.last_name}</StyledTableCell>
                <StyledTableCell align="right">{booking.room_id}</StyledTableCell>
                <StyledTableCell align="right">{booking.number_of_guests}</StyledTableCell>
                <StyledTableCell align="right">{moment(booking.check_in_date).format(DATE_FORMATS.FRIENDLY)}</StyledTableCell>
                <StyledTableCell align="right">{moment(booking.check_out_date).format(DATE_FORMATS.FRIENDLY)}</StyledTableCell>
                <StyledTableCell align="right">{booking.price_per_night}</StyledTableCell>
                </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
}

export { Bookings };