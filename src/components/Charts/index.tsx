import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { getBookings } from '../../api';
import { QUERY_KEYS } from '../../contrants/query-keys';
import { Booking, Room } from '../../types';
import { getRooms } from "../../api";
import { PieChart, Pie, Cell } from 'recharts';
import Brightness1Icon from '@mui/icons-material/Brightness1';


//Last month bookings chart
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
      YBookings: 0
    },
    {
      week: "Second week",
      YBookings: 0
    },
    {
      week: "Third week",
      YBookings: 0
    },
    {
      week: "Fourth week",
      YBookings: 0
    }
    ])

  //Separatting last month bookings in four weeks, for X axis  
  useEffect(()=>{
    //Resetting to zero the bookings counter
    data[0].YBookings = 0
    data[1].YBookings = 0
    data[2].YBookings = 0
    data[3].YBookings = 0

    lastMonth?.map((booking) =>{
      if(moment(booking.check_in_date).isBetween(moment().date(0).date(1), moment().date(0).date(1).date(8))){
        data[0].YBookings = data[0].YBookings + 1;
        setData(data);
      }
      if(moment(booking.check_in_date).isBetween(moment().date(0).date(1).date(9), moment().date(0).date(1).date(15))){
        data[1].YBookings = data[1].YBookings + 1;
        setData(data);
      }
      if(moment(booking.check_in_date).isBetween(moment().date(0).date(1).date(15), moment().date(0).date(1).date(22))){
        data[2].YBookings = data[2].YBookings + 1;
        setData(data);
      }
      if(moment(booking.check_in_date).isBetween(moment().date(0).date(1).date(22), moment().date(0))){
        data[3].YBookings = data[3].YBookings + 1;
        setData(data);
      }
    })
  }, [allBookings])


    return(
      <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="YBookings" stroke="#8884d8" />
        <XAxis dataKey="week" />
        <YAxis /> 
        <Tooltip />
      </LineChart>
    )
};


//Rooms occupancy chart
export const RoomsChart = () => {
  
  const COLORS = ['#D32F2F', '#2E7D32'];
  const RADIAN = Math.PI / 180;
  
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  //Chart data
  const { data: rooms } = useQuery<Room[]>(QUERY_KEYS.ROOMS, getRooms);
  const [data, setData] = useState([
      {
          state: "Occupied",
          value: 0
      },
      {
          state: "Available",
          value: 0
      }
  ])

  useEffect(()=>{
    data[0].value = 0;
    data[1].value = 0;

    rooms?.map((room) => {
      if(room.occupancy == 1){
        data[0].value = data[0].value + 1;
      }else{
        data[1].value = data[1].value + 1;
      }
    })
  }, [rooms])

  return(
    <>
    <PieChart width={400} height={400}>
    <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={true}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
    >
        {rooms?.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
    </Pie>
    </PieChart>
    {/* Chart references */}
    <h4>
    <span>Occupied</span><span><Brightness1Icon fontSize="small" color="error"/></span>
    </h4>
    <h4>
    <span>Available</span><span><Brightness1Icon fontSize="small" color="success"/></span>
    </h4>
    </>
  )
}