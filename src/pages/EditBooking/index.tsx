import { useQuery } from 'react-query';
import { getBookingById } from '../../api/bookings';
import { Layout } from '../../components/layout';
import { QUERY_KEYS } from '../../contrants/query-keys';
import { Booking } from '../../types';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker } from '@mui/lab';
import { FC, useState } from 'react';
import moment from "moment";
import { Box } from '@mui/system';


const params = new URLSearchParams(window.location.search);

const EditBooking = () => {

    const id = params.get("id");

    const { data: booking } = useQuery<Booking>(QUERY_KEYS.BOOKINGS, () => getBookingById(Number(id)) );


    // const {first_name, last_name, check_in_date, check_out_date, number_of_guests, price_per_night, booking_status} = booking;
    const [updatedData, setUpdatedData] = useState<Booking>(booking!);  

    console.log(updatedData)
    console.log(booking)
    return (
        <Layout>
            <h2>Booking ID to edit: {updatedData?.id} </h2>
            <Box
            component="form"
            sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }}}
            noValidate
            autoComplete="off"
            >
                <div>
                    <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    value={updatedData?.first_name}
                    onChange={(e)=> setUpdatedData({...updatedData, first_name: e.target.value })}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        value={updatedData?.last_name}
                        onChange={(e)=> setUpdatedData({...updatedData, last_name: e.target.value })}
                        />
                </div>
                <div>
                    <FormControl required>
                    <DatePicker
                        label="Check-in date *"
                        value={updatedData?.check_in_date}
                        onChange={(newValue)=> setUpdatedData({...updatedData, check_in_date: moment(newValue)})}
                        renderInput={(params) => <TextField {...params} />}
                        />
                    </FormControl>
                    <FormControl required>
                        <DatePicker
                        label="Check-out date *"
                        value={updatedData?.check_out_date}
                        onChange={(newValue)=> setUpdatedData({...updatedData, check_out_date: moment(newValue) })}
                        renderInput={(params) => <TextField {...params} />}
                        />
                    </FormControl>
                </div>
                <div>
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                            <InputLabel id="numberOfGuests">{booking?.number_of_guests}</InputLabel>
                            <Select
                            labelId="numberOfGuests"
                            id="number-of-guests"
                            value={updatedData?.number_of_guests}
                            label="Number of guests"
                            onChange={(e)=> setUpdatedData({...updatedData, number_of_guests: Number(e.target.value) })}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                        id="outlined-number"
                        label="Price per night"
                        type="number"
                        value={updatedData?.price_per_night}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e)=> setUpdatedData({...updatedData, price_per_night: Number(e.target.value) })}
                        />
                </div>
                <div>
                        <FormControl sx={{ m: 1, minWidth: 200 }}>
                            <InputLabel id="bookingStatusLbl">Booking status</InputLabel>
                            <Select
                            labelId="bookingStatusLbl"
                            id="bookingStatus"
                            value={updatedData?.booking_status}
                            label="Booking status"
                            onChange={(e)=> setUpdatedData({...updatedData, booking_status: e.target.value })}
                            >
                                <MenuItem value={"confirmed"}>Confirmed</MenuItem>
                                <MenuItem value={"in house"}>In house</MenuItem>
                                <MenuItem value={"cancelled"}>Cancelled</MenuItem>
                                <MenuItem value={"checked out"}>Checked out</MenuItem>
                            </Select>
                        </FormControl> 
                </div>

                <Button variant="contained" color="success">Submit</Button>
                </Box>
        </Layout>
      );
}

export { EditBooking };