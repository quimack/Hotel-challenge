import { useQuery } from "react-query";
import { getRooms } from "../../api";
import { QUERY_KEYS } from "../../contrants/query-keys";
import { Booking, Room } from "../../types";



const filterByCategory = (bookings: Booking[], category: string) => {
    
    const rooms = async ()  =>{
        const response: Room[] = await getRooms();
        return response;
    }
    
    return bookings.filter(booking =>{

        rooms?.map((room) => {
            if(booking.room_id === room.id && room.category === category){
                return true;
            }
        })
    } )
}

export { filterByCategory };