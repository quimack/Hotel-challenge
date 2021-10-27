import { QUERY_KEYS } from '../../contrants/query-keys';
import { useQuery } from 'react-query';
import { getBookingsByDate } from "../../api";
import { Layout } from "../../components/layout";
import { Booking } from '../../types';
import { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import moment, { Moment } from "moment";
import { DATE_FORMATS } from '../../contrants/date-formats';
import { Col, FloatingLabel, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { filterByCategory, sortAlphabetically } from '../../hooks';




const Bookings = () => {

    const [date, setDate] = useState<Moment>();
    const [category, setCategory] = useState<string>("All");
    const [checked, setChecked] = useState<boolean>(false);
    
    const { data: bookings } = useQuery<Booking[]>(QUERY_KEYS.BOOKINGS, () => getBookingsByDate(date!));
    
    if(checked){
        sortAlphabetically(bookings!);
    }

    useEffect(()=>{
        filterByCategory(bookings!, category);
        }, [category]);

    return (
            <Layout>
                <form>
                    <label htmlFor="date">Booking Date:</label>
                    <input type="date" id="date"
                    onChange={(e)=>setDate(moment(e.target.value))} />
                    <label htmlFor="category">Category:</label>
                    <select value="All" id="category"
                     onChange={(e)=> setCategory(e.target.value)}>
                        <option value="1">Confort</option>
                        <option value="2">Superior</option>
                        <option value="3">Junior Suite</option>
                        <option value="4">Senior Suite</option>
                    </select>
                    <label htmlFor="alphabeticalOrder">Alphabetical lastname order</label>
                    <input type="checkbox" id="alphabeticalOrder"
                    onChange={(e)=> setChecked(e.target.checked)}/>
                </form>

                <h1>Bookings</h1>
                <Table striped bordered hover>
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
                                <tr>
                                    <td>{booking.id}</td>
                                    <td>{booking.booking_status}</td>
                                    <td>{booking.first_name}</td>
                                    <td>{booking.last_name}</td>
                                    <td>{booking.room_id}</td>
                                    <td>{booking.number_of_guests}</td>
                                    <td>{moment(booking.check_in_date).format(DATE_FORMATS.FRIENDLY)}</td>
                                    <td>{moment(booking.check_out_date).format(DATE_FORMATS.FRIENDLY)}</td>
                                    <td>{booking.price_per_night}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Layout>
        ) 
}

export { Bookings };