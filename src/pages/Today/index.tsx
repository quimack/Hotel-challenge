import { BookingsTable, Layout, NoBookingsImg, RoomsChart } from "../../components";
import { QUERY_KEYS } from '../../contrants/query-keys';
import { useQuery } from 'react-query';
import { getBookingsByDate} from "../../api";
import { Booking} from '../../types';
import moment from "moment";



export const Today = () => {

    const { data: bookings } = useQuery<Booking[]>(QUERY_KEYS.TODAY_BOOKINGS, () => getBookingsByDate(moment()));


    return(
        <Layout>    
            <h1> T O D A Y </h1>
            {bookings?
            <BookingsTable bookings={bookings!} />
            :
            <NoBookingsImg width="35%" height="35%" />
            }
            <RoomsChart />
        </Layout>
    )
}