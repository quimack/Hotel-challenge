import { QUERY_KEYS } from '../../contrants/query-keys';
import { useQuery } from 'react-query';
import { getBookingsByDate } from "../../api";
import { Layout } from "../../components/layout";
import { Booking } from '../../types';
import { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import moment, { Moment } from "moment";
import { DATE_FORMATS } from '../../contrants/date-formats';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { DateTimePicker } from '@material-ui/pickers';

import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Input, TextFieldProps } from '@mui/material';


const Bookings = () =>{

    const [date, setDate] = useState<Moment>();
    const [category, setCategory] = useState<string>("All");
    const [checked, setChecked] = useState<boolean>(false);
   
    const renderInput = (props: TextFieldProps): any => (
      <Input
        type="text"
        onClick={props.onClick}
        value={props.value}
        onChange={props.onChange}
      />
    );
  return (
    <Layout>
    <div>
      {/* <FormControl sx={{ m: 1, minWidth: 120 }}> */}
    


    <FormControl sx={{ m: 1, minWidth: 120 }} component="fieldset">
      <FormLabel component="legend">Bookings options</FormLabel>
      <FormGroup aria-label="position" row>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DateTimePicker
         //   TextFieldComponent={renderInput}
            label="Bookings date:"
            value={date}
            onChange={(e)=>setDate(moment(e))}  
        />
      </MuiPickersUtilsProvider>
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
    </div>
    </Layout>
  );
}


// import { filterByCategory, sortAlphabetically } from './helpers';


// const Bookings = () => {

//     const [date, setDate] = useState<Moment>();
//     const [category, setCategory] = useState<string>("All");
//     const [checked, setChecked] = useState<boolean>(false);
    
//     const { data: bookings } = useQuery<Booking[]>(QUERY_KEYS.BOOKINGS, () => getBookingsByDate(date!));
    
//     // if(checked){
//     //     sortAlphabetically(bookings!);
//     // }

//     // useEffect(()=>{
//     //     filterByCategory(bookings!, category);
//     //     }, [category]);

//     return (
//             <Layout>
//                 <form>
//                     <label htmlFor="date">Booking Date:</label>
//                     <input type="date" id="date"
//                     onChange={(e)=>setDate(moment(e.target.value))} />
//                     <label htmlFor="category">Category:</label>
//                     <select value="All" id="category"
//                      onChange={(e)=> setCategory(e.target.value)}>
//                         <option value="1">Confort</option>
//                         <option value="2">Superior</option>
//                         <option value="3">Junior Suite</option>
//                         <option value="4">Senior Suite</option>
//                     </select>
//                     <label htmlFor="alphabeticalOrder">Alphabetical lastname order</label>
//                     <input type="checkbox" id="alphabeticalOrder"
//                     onChange={(e)=> setChecked(e.target.checked)}/>
//                 </form>

//                 <h1>Bookings</h1>
//                 <Table striped bordered hover>
//                     <thead>
//                         <tr>
//                         <th>ID</th>
//                         <th>Status</th>
//                         <th>First name</th>
//                         <th>Last name</th>
//                         <th>Room id</th>
//                         <th>Number of guests</th>
//                         <th>Check-in date</th>
//                         <th>Check-out date</th>
//                         <th>Price per night</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {bookings?.map((booking) =>{
//                             return(
//                                 <tr>
//                                     <td>{booking.id}</td>
//                                     <td>{booking.booking_status}</td>
//                                     <td>{booking.first_name}</td>
//                                     <td>{booking.last_name}</td>
//                                     <td>{booking.room_id}</td>
//                                     <td>{booking.number_of_guests}</td>
//                                     <td>{moment(booking.check_in_date).format(DATE_FORMATS.FRIENDLY)}</td>
//                                     <td>{moment(booking.check_out_date).format(DATE_FORMATS.FRIENDLY)}</td>
//                                     <td>{booking.price_per_night}</td>
//                                 </tr>
//                             )
//                         })}
//                     </tbody>
//                 </Table>
//             </Layout>
//         ) 
// }

export { Bookings };