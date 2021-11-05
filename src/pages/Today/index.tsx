import { BookingsTable, Layout, NoBookingsImg, RoomsChart } from "../../components";
import { QUERY_KEYS } from '../../contrants/query-keys';
import { useQuery } from 'react-query';
import { getBookingsByDate} from "../../api";
import { Booking} from '../../types';
import moment from "moment";
import { Grid } from "@mui/material";



export const Today = () => {

    const { data: bookings } = useQuery<Booking[]>(QUERY_KEYS.TODAY_BOOKINGS, () => getBookingsByDate(moment()));


    return(
        <Layout>    
            <Grid 
            container
            direction="column"
            justifyContent="center"
            alignItems="center">
                <Grid item>
                    <h1>B O O K I N G S ▲ F O R  ▼  T O D A Y</h1>
                </Grid>
                <Grid item>
                    {bookings?
                    <BookingsTable bookings={bookings!} />
                    :
                    <NoBookingsImg width="60%" height="60%" />
                    }
                    <RoomsChart />
                </Grid>
            </Grid>
        </Layout>
    )
}