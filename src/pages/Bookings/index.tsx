import { QUERY_KEYS } from '../../contrants/query-keys';
import { useQuery } from 'react-query';
import { getBookingsByDate, getRooms } from "../../api";
import { Layout, LastMonthBookingsChart, BookingsTable, NoBookingsImg } from "../../components";
import { Booking, Room } from '../../types';
import { useState, useEffect } from 'react';
// Form imports
import moment, { Moment } from "moment";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/lab';
import Grid from '@mui/material/Grid';
import { sortAlphabetically, filterByCategory } from './helpers';
import CircularProgress from '@mui/material/CircularProgress';

const Bookings = () =>{

  const queryBookings = useQuery<Booking[]>(QUERY_KEYS.BOOKINGS_BY_DATE, () => getBookingsByDate(date!), {enabled: false});
  const queryRooms = useQuery<Room[]>(QUERY_KEYS.ROOMS, getRooms, {enabled: false});
  const { data: bookings, isLoading, isError } = queryBookings;
  const { data: rooms } = queryRooms;

  // Filter and order 
  const [date, setDate] = useState<Moment>();
  const [category, setCategory] = useState<string>("All");
  const [checked, setChecked] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<Booking[] | undefined>([]);

  if(checked){
    if(filterCategory){
      sortAlphabetically(filterCategory!);
    }
  }

  useEffect(()=>{
    setFilterCategory([])
    queryBookings.refetch();
    if(category === "All"){
      setFilterCategory(bookings!)
    }else{
      filterByCategory(bookings!, rooms!, category, filterCategory!, setFilterCategory!);
    }
  }, [category, bookings, date]);
    

  return (
    <Layout>
      <Grid 
        container
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
      >
        {/* Filter and order options */}
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="flex-start"
          sx={{mb: "5em",}}
        >
          <Grid item>
            <FormControl sx={{ m: 1, minWidth: 120 }} component="fieldset">
              <DatePicker
                label="Bookings date"
                value={date}
                onChange={(newValue) => {
                  setDate(moment(newValue));
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl sx={{ m: 1, minWidth: 120 }} component="fieldset">
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
            </FormControl>
          </Grid>
          <Grid item>
            <FormControlLabel
              control={<Checkbox 
                onChange={(e)=> setChecked(e.target.checked)}/>}
              label="Sort alphabetically"
              labelPlacement="end"
              sx={{mt: "8px",}}
            />
          </Grid>
        </Grid>

        {/* Table render */}
        { isLoading?
        <Grid item sx={{my: "5em",}}>
          <CircularProgress />
        </Grid>
        :
        isError? 
        <Grid item sx={{mb: "5em",}}>
          <NoBookingsImg width="80%" height="80%" /> 
        </Grid>
        :
        <Grid item>
          <BookingsTable bookings={filterCategory!} />
        </Grid>
        }
      </Grid>
      
      {/* Chart */}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{my: "5em", bgcolor: "primary.light", borderRadius: "10px",}}
        >
        <Grid item>
          <LastMonthBookingsChart />
        </Grid>
      </Grid>

    </Layout>
    
  );
}

export { Bookings };