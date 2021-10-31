import { api } from '../../utils/index';
import { Booking } from '../../types'
import moment, { Moment } from "moment";
import { DATE_FORMATS } from '../../contrants/date-formats';


//Fetch bookings by date
export const getBookingsByDate = async (date: Moment) => {
    try{
        const response = await api.get<Booking[]>(`/bookings?check_in=${moment(date).format(DATE_FORMATS.FULL_DATE)}`);
        console.log(response);
        return response.data;
    } catch (err) {
        console.log(err);
        throw new Error('There was a server error');
    } 
}


//Post a new booking
type Payload = Omit<Booking, 'id' | 'room_id' | 'booking_status'>[];

export const createNewBooking = async (data: Payload) =>{
    try{
        api.post('/bookings/create', {...data, status: 'confirmed'});
    }catch (err){
        console.log(err);
        throw new Error('There was a server error');
    }
}
