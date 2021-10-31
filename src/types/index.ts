import { Moment } from "moment";

export type Booking = {
    id:	number,
    first_name: string,
    last_name: string, 
    room_id: number, 	
    check_in_date: Moment,
    check_out_date: Moment,
    number_of_guests: number, 
    price_per_night: number, 	
    booking_status: number
}

export type Room = {
    id: number,
    category: string,
    max_occupancy: number,
    occupancy: number
} 