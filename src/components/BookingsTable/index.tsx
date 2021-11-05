import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { StyledTableCell, StyledTableRow } from '../../styles';
import { Booking } from '../../types';
import moment from "moment";
import { DATE_FORMATS } from '../../contrants/date-formats';
import { Button } from '@mui/material';
import { FC } from 'react';


type Props = {
    bookings: Booking[]
}

export const BookingsTable: FC<Props> = ({bookings}) => {

    return (
            <TableContainer sx={{borderRadius: "10px"}}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table" >
            <TableHead>
                <TableRow>
                <TableCell align="center" colSpan={4}>
                    <h1>▲ B O O K I N G S ▼</h1>
                </TableCell>
                </TableRow>
                <TableRow>
                    <StyledTableCell>Options</StyledTableCell>
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell align="right">Status</StyledTableCell>
                    <StyledTableCell align="right">First name</StyledTableCell>
                    <StyledTableCell align="right">Last name</StyledTableCell>
                    <StyledTableCell align="right">Room id</StyledTableCell>
                    <StyledTableCell align="right">Number of guests</StyledTableCell>
                    <StyledTableCell align="right">Check-in date</StyledTableCell>
                    <StyledTableCell align="right">Check-out date</StyledTableCell>
                    <StyledTableCell align="right">Price per night</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {bookings?.map((booking) => ( 
                    <StyledTableRow key={booking.id}>
                    <StyledTableCell component="th" scope="row">
                        <Button href={`/edit-booking?id=${booking.id}`} >
                            <EditTwoToneIcon />
                        </Button>
                    </StyledTableCell>
                    <StyledTableCell align="right">{booking.id}</StyledTableCell>
                    <StyledTableCell align="right">{booking.booking_status}</StyledTableCell>
                    <StyledTableCell align="right">{booking.first_name}</StyledTableCell>
                    <StyledTableCell align="right">{booking.last_name}</StyledTableCell>
                    <StyledTableCell align="right">{booking.room_id}</StyledTableCell>
                    <StyledTableCell align="right">{booking.number_of_guests}</StyledTableCell>
                    <StyledTableCell align="right">{moment(booking.check_in_date).format(DATE_FORMATS.FRIENDLY)}</StyledTableCell>
                    <StyledTableCell align="right">{moment(booking.check_out_date).format(DATE_FORMATS.FRIENDLY)}</StyledTableCell>
                    <StyledTableCell align="right">{booking.price_per_night}</StyledTableCell>
                    </StyledTableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    )
}