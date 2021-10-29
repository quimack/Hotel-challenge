import { useQuery } from "react-query";
import { getRooms } from "../../api";
import { QUERY_KEYS } from "../../contrants/query-keys";
import { Booking, Room } from "../../types";



// const filterByCategory = (bookings: Booking[], category: string) => {
    
//     const rooms = async ()  =>{
//         const response: Room[] = await getRooms();
//         return response;
//     }
    
//     return bookings.filter(booking =>{
//         rooms?.map((room) => {
//             return (booking.room_id === room.id && room.category === category);
//         })
//     } )
// }


// const sortAlphabetically = (array: Booking[]) => {
//     return array.sort((a,b) => {
//         if (a.last_name < b.last_name) {
//             return -1;
//           }
//           if (a.last_name > b.last_name) {
//             return 1;
//           }
//           return 0;
//     });
// }

// export { sortAlphabetically };
// export { filterByCategory };