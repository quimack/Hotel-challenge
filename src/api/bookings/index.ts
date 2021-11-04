import { api } from '../../utils/index';
import { Booking } from '../../types'
import moment, { Moment } from "moment";
import { DATE_FORMATS } from '../../contrants/date-formats';


//Fetch all bookings
export const getBookings = async () => {
    try{
        const response = await api.get<Booking[]>('/bookings');
        return response.data;
    } catch (err) {
        console.log(err);
        throw new Error('There was a server error');
    } 
}

//Fetch bookings by date
export const getBookingsByDate = async (date: Moment) => {
    try{
        const response = await api.get<Booking[]>(`/bookings?check_in=${moment(date).format(DATE_FORMATS.FULL_DATE)}`);
        return response.data;
    } catch (err) {
        console.log(err);
        throw new Error('There was a server error');
    } 
}

//Fetch booking by ID
export const getBookingById = async (id: number) => {
    try{
        const response = await api.get<Booking>(`/bookings/${id}`);
        return response.data;
    } catch (err) {
        console.log(err);
        throw new Error('There was a server error');
    } 
}

//Post a new booking
type Payload = Omit<Booking, 'id' | 'room_id' | 'booking_status'>[];

export const createNewBooking = async (data: Payload) => {
    try{
        api.post('/bookings/create', {...data, booking_status: 'confirmed'});
    }catch (err){
        console.log(err);
        throw new Error('There was a server error');
    }
}

//Edit a booking
type payload = [{
    id:	number,
    first_name: string,
    last_name: string, 
    room_id?: number, 	
    check_in_date: Moment,
    check_out_date: Moment,
    number_of_guests: number, 
    price_per_night: number, 	
    booking_status: string
}]

export const editBooking = async (data: payload) => {
    try{
        api.put(`/bookings/update/${data[0].id}`, data);
    }catch (err){
        console.log(err);
        throw new Error('There was a server error');
    }
}

