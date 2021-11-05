import { Booking, Room } from "../../types";
import { Dispatch, SetStateAction } from 'react';


//Filter by category
export const filterByCategory = (bookings: Booking[], rooms: Room[], category: string, filterCategory: Booking[], setFilterCategory: Dispatch<SetStateAction<Booking[] | undefined>>) => {
  bookings?.map((booking) =>{
    rooms?.map((room) =>{
      if(booking.room_id === room.id && room.category === category){
        setFilterCategory(filterCategory => [...filterCategory!, booking])
      }
    })
  })
}

//Sort bookings alphabetically
export const sortAlphabetically = (array: Booking[]) => {
    return array.sort((a,b) => {
        if (a.last_name < b.last_name) {
            return -1;
          }
          if (a.last_name > b.last_name) {
            return 1;
          }
          return 0;
    });
}
