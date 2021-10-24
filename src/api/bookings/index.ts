import { api } from '../../utils/index';
import { Booking } from '../../types'


const getBookingsByDate = async (date: Date) => {
    try{
        const response = await api.get<Booking[]>(`/bookings?check_in=${date}`);
        console.log(response);
        return response.data;
    } catch (err) {
        console.log(err);
        throw new Error('There was a server error');
    } 
}

export { getBookingsByDate };