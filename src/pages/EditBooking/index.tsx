import { useMutation, useQuery} from 'react-query';
import { editBooking, getBookingById } from '../../api/bookings';
import { Layout, RoomsPaper } from '../../components';
import { QUERY_KEYS } from '../../contrants/query-keys';
import { Booking } from '../../types';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker } from '@mui/lab';
import { useState, useEffect } from 'react';
import moment from "moment";
import { Box } from '@mui/system';


export const EditBooking = () => {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const { data: booking } = useQuery<Booking>(QUERY_KEYS.EDIT_BOOKING, () => getBookingById(Number(id)) );

    const [updatedData, setUpdatedData] = useState<Booking>();  
    const [selectedRoom, setSelectedRoom] = useState<number>(0);
    const mutation = useMutation(editBooking);

    useEffect(()=>{
        setUpdatedData(booking!)
    }, [booking])
    

    useEffect(() =>{
        //Enable the room
        if(updatedData && (updatedData.booking_status === "checked out" || updatedData.booking_status === "cancelled")){ 
            setUpdatedData({
                id: updatedData.id,
                first_name: updatedData.first_name,       
                last_name: updatedData.last_name, 
                price_per_night: updatedData.price_per_night,
                number_of_guests: updatedData.number_of_guests,
                check_in_date: updatedData.check_in_date,
                check_out_date: updatedData.check_out_date,     
                booking_status: updatedData.booking_status  
            })
        }
        //Assing the room
        if(updatedData){
            setUpdatedData({...updatedData, room_id: selectedRoom})
        }
    }, [selectedRoom])    

    //Submit updated booking
    const handleSubmit = () => {
        if(updatedData){
            mutation.mutate([updatedData]);
        }
   }

    return (
        updatedData?
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
                    label="First Name"
                    value={updatedData?.first_name}
                    onChange={(e)=> setUpdatedData({...updatedData, first_name: e.target.value })}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Last name"
                        value={updatedData?.last_name}
                        onChange={(e)=> setUpdatedData({...updatedData, last_name: e.target.value })}
                    />
                </div>
                <div>
                    <FormControl required>
                    <DatePicker
                        disabled
                        label="Check-in date *"
                        value={updatedData?.check_in_date}
                        onChange={(newValue)=> setUpdatedData({...updatedData, check_in_date: moment(newValue)})}
                        renderInput={(params) => <TextField {...params} />}
                        />
                    </FormControl>
                    <FormControl required>
                        <DatePicker
                        disabled
                        label="Check-out date *"
                        value={updatedData?.check_out_date}
                        onChange={(newValue)=> setUpdatedData({...updatedData, check_out_date: moment(newValue) })}
                        renderInput={(params) => <TextField {...params} />}
                        />
                    </FormControl>
                </div>
                <div>
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="numberOfGuests">Number of guests</InputLabel>
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
                    disabled
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
                           { selectedRoom<=0?
                            <MenuItem disabled value={"in house"}>In house</MenuItem>
                            : 
                            <MenuItem value={"in house"}>In house</MenuItem>
                           }
                            <MenuItem value={"cancelled"}>Cancelled</MenuItem>
                            <MenuItem value={"checked out"}>Checked out</MenuItem>
                        </Select>
                    </FormControl> 
                </div>
                <Button onClick={handleSubmit} variant="contained" color="success">Submit</Button>
            </Box>
            <RoomsPaper  selectedRoom={selectedRoom} setRoom={setSelectedRoom} />
        </Layout>
        :
        <Layout />
    );
}

