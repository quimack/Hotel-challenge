export type Booking = {
    id:	number,
    first_name: string,
    last_name: string, 
    room_id: number, 	
    check_in_date: Date,
    check_out_date: Date,
    number_of_guests: number, 
    price_per_night: number, 	
    status: number
}

export type Room = {
    id: number,
    category: number,
    max_occupancy: number,
    occupancy: number
} 