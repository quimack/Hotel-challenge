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
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/lab';
import Grid from '@mui/material/Grid';
import { Item } from '../../styles';
import { sortAlphabetically, filterByCategory } from './helpers';


const Bookings = () =>{

  const queryBookings = useQuery<Booking[]>(QUERY_KEYS.BOOKINGS_BY_DATE, () => getBookingsByDate(date!));
  const queryRooms = useQuery<Room[]>(QUERY_KEYS.ROOMS, getRooms);
  const { data: bookings, isLoading } = queryBookings;
  const { data: rooms } = queryRooms;

  // Filter and order 
  const [date, setDate] = useState<Moment>();
  const [category, setCategory] = useState<string>("All");
  const [checked, setChecked] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<Booking[] | undefined>([]);

  if(checked){
    sortAlphabetically(filterCategory!);
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
          {/* {isLoading?
          Cargando...

          } */}
          {filterCategory?
          <BookingsTable bookings={filterCategory!} />
          :
          <NoBookingsImg width="35%" height="35%" />
          }
      </Item>
      </Grid>
      
      {/* Chart */}
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