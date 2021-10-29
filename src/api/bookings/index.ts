import { api } from '../../utils/index';
import { Booking } from '../../types'
import { FC } from 'react';
import moment, { Moment } from "moment";
import { DATE_FORMATS } from '../../contrants/date-formats';


const getBookingsByDate = async (date: Moment) => {
    try{
        const response = await api.get<Booking[]>(`/bookings?check_in=${moment(date).format(DATE_FORMATS.FULL_DATE)}`);
        console.log(response);
        return response.data;
    } catch (err) {
        console.log(err);
        throw new Error('There was a server error');
    } 
}

export { getBookingsByDate };