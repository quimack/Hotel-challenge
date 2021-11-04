import moment from 'moment';
import { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { getBookings } from '../../api';
import { DATE_FORMATS } from '../../contrants/date-formats';
import { QUERY_KEYS } from '../../contrants/query-keys';
import { Booking } from '../../types';



export const LastMonthBookingsChart= () => {

  const { data: allBookings } = useQuery<Booking[]>(QUERY_KEYS.ALL_BOOKINGS, () => getBookings());

  const [lastMonthLastDate, setLastMonthLastDate] = useState(moment().date(0));
  const [lastMonthFirstDate, setLastMonthFirstDate] = useState(moment().date(0).date(1));

  const lastMonth = allBookings?.filter(booking => moment(booking.check_in_date).isBetween(lastMonthFirstDate, lastMonthLastDate));
  console.log(lastMonth)
  
  const data = [1,2,3,4,5];

  const setingData = () => {
    lastMonth?.map((booking) =>{
        if(moment(booking.check_in_date).isBetween(moment().date(0).date(1), moment().date(0).date(1).date(7))){
          console.log("1er semana")
        }
        if(moment(booking.check_in_date).isBetween(moment().date(0).date(1).date(8), moment().date(0).date(1).date(14))){
          console.log("2dasemana")
        }
        if(moment(booking.check_in_date).isBetween(moment().date(0).date(1).date(15), moment().date(0).date(1).date(21))){
          console.log("3dasemana")
        }
        if(moment(booking.check_in_date).isBetween(moment().date(0).date(1).date(22), moment().date(0))){
          console.log("4dasemana")
        }
    })
  }
  setingData();

    return(
    <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <Line type="monotone" dataKey="number_of_guests" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="date" />
    <YAxis />
  </LineChart>
    )
};