import { QUERY_KEYS } from '../../contrants/query-keys';
import { useQuery } from 'react-query';
import { getBookingsByDate } from "../../api";
import { Layout, LastMonthBookingsChart } from "../../components";
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
import { Button, TextField } from '@mui/material';
import { DatePicker } from '@mui/lab';
// Table imports
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { StyledTableCell, StyledTableRow, Item } from '../../styles';
// Helpers imports
import { sortAlphabetically } from './helpers';
// import { Box } from '@mui/system';


//Bookings component
const Bookings = () =>{

    const [date, setDate] = useState<Moment>();
    const [category, setCategory] = useState<string>("All");
    const [checked, setChecked] = useState<boolean>(false);

    const { data: bookings } = useQuery<Booking[]>(QUERY_KEYS.BOOKINGS_BY_DATE, () => getBookingsByDate(date!));

    if(checked){
        sortAlphabetically(bookings!);
    }

    // useEffect(()=>{
    //     filterByCategory(bookings!, category);
    //     }, [category]);

  return (
    <Layout>
      <Grid container>
      <Grid item xs={12}>
        <Item>
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
                <MenuItem value={"All"}>
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
              label="Alphabetical last name order"
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
                <StyledTableCell>Options</StyledTableCell>
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
                
                <Grid container direction="row" justifyContent="flex-start" >
                  <Grid item xs={4}>
                    <Button href={`/edit-booking?id=${booking.id}`} >
                      <EditTwoToneIcon />
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button>
                      <DeleteTwoToneIcon />
                    </Button>
                  </Grid>
                  
                </Grid>
                </StyledTableCell>
                <StyledTableCell align="right">{booking.id}</StyledTableCell>
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

      </Item>
      </Grid>

      <Grid item xs={10}>
        <Item>
          <h3>Last month fluctuations</h3>
          <LastMonthBookingsChart />
        </Item>
      </Grid>

    </Grid>

    </Layout>
  );
}

export { Bookings };