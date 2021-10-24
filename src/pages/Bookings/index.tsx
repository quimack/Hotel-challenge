import { QUERY_KEYS } from '../../constants/query-keys';
import { useQuery } from 'react-query';
import { getBookingsByDate } from "../../api";
import { Layout } from "../../components/layout";
import { Booking } from '../../types';
import { FormEvent, useState } from 'react';
import Table from 'react-bootstrap/Table';

const Bookings = () => {
    
    const [date, setDate] = useState(Date);
    
    const { data: bookings } = useQuery<Booking[]>(QUERY_KEYS.BOOKINGS, getBookingsByDate(date));

    return (
       <Layout>
           <form>
               <label htmlFor="bookingDate">Booking Date:</label>
               <input type="datetime" name="booking-date" id="bookingDate" 
               onChange={(e)=> setDate(e.target.value)}/>
           </form>
           <h1>Bookings</h1>
            <Table striped bordered hover >
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Status</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Room id</th>
                    <th>Number of guests</th>
                    <th>Check-in date</th>
                    <th>Check-out date</th>
                    <th>Price per night</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings?.map((booking) =>{
                        return(
                            <>
                            <tr>
                                <td>{booking.id}</td>
                                <td>{booking.status}</td>
                                <td>{booking.first_name}</td>
                                <td>{booking.last_name}</td>
                                <td>{booking.room_id}</td>
                                <td>{booking.number_of_guests}</td>
                                <td>{booking.check_in_date}</td>
                                <td>{booking.check_out_date}</td>
                                <td>{booking.price_per_night}</td>
                            </tr>
                            </>
                        )
                    })}            
                </tbody>
            </Table>
       </Layout>
    )
}

export { Bookings };