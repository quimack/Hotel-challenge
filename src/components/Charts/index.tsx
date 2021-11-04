import moment from 'moment';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { getBookings } from '../../api';
import { QUERY_KEYS } from '../../contrants/query-keys';
import { Booking } from '../../types';


export const LastMonthBookingsChart = () => {

  const { data: allBookings } = useQuery<Booking[]>(QUERY_KEYS.ALL_BOOKINGS, () => getBookings());

  //Gettin first and last date from the last month
  const [lastMonthLastDate, setLastMonthLastDate] = useState(moment().date(0));
  const [lastMonthFirstDate, setLastMonthFirstDate] = useState(moment().date(0).date(1));
  //Gettin the last month bookings
  const lastMonth = allBookings?.filter(booking => moment(booking.check_in_date).isBetween(lastMonthFirstDate, lastMonthLastDate));
   
  //Setting data from the chart
  const [data, setData] = useState([
    {
      week: "First week",
      bookings: 0
    },
    {
      week: "Second week",
      bookings: 0
    },
    {
      week: "Third week",
      bookings: 0
    },
    {
      week: "Fourth week",
      bookings: 0
    }
    ])

  //Separatting last month bookings in four weeks, for X axis  
  useEffect(()=>{
    //Resetting to zero the bookings counter
    data[0].bookings = 0
    data[1].bookings = 0
    data[2].bookings = 0
    data[3].bookings = 0

    lastMonth?.map((booking) =>{
      if(moment(booking.check_in_date).isBetween(moment().date(0).date(1), moment().date(0).date(1).date(8))){
        data[0].bookings = data[0].bookings + 1;
        setData(data);
      }
      if(moment(booking.check_in_date).isBetween(moment().date(0).date(1).date(9), moment().date(0).date(1).date(15))){
        data[1].bookings = data[1].bookings + 1;
        setData(data);
      }
      if(moment(booking.check_in_date).isBetween(moment().date(0).date(1).date(15), moment().date(0).date(1).date(22))){
        data[2].bookings = data[2].bookings + 1;
        setData(data);
      }
      if(moment(booking.check_in_date).isBetween(moment().date(0).date(1).date(22), moment().date(0))){
        data[3].bookings = data[3].bookings + 1;
        setData(data);
      }
    })
  }, [allBookings ])

    return(
    <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <Line type="monotone" dataKey="bookings" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="week" />
    <YAxis /> 
  </LineChart>
    )
};