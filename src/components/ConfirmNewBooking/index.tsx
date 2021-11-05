//Modal content imports
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Dispatch, FC, SetStateAction } from 'react';
import { Moment } from "moment";
import { Stack, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DATE_FORMATS } from '../../contrants/date-formats';


//Modal Component
type Props = {
  isOpen: boolean,
  closeModal: Dispatch<SetStateAction<boolean>>,
  formData:{
    first_name: string,
    last_name: string,
    check_in_date: Moment,
    check_out_date: Moment,
    number_of_guests: string,
    price_per_night: string,
    status?: string
  },
  handleAction: () => void
}


export const ConfirmNewBooking: FC<Props> = ({
isOpen, closeModal, handleAction, formData:
{first_name, last_name, check_in_date, check_out_date, number_of_guests, price_per_night}
}) => {

// Booking data style 
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body1,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary
  }));

  return (
      
    <div>
      <Dialog
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Booking data:"}
        </DialogTitle>
        <DialogContent>
          <Stack direction="column">
            <Item>First name: {first_name}</Item>
            <Item>Last name: {last_name}</Item>
            <Item>Number of guests: {number_of_guests}</Item>
            <Item>Check-in date: {check_in_date.format(DATE_FORMATS.FRIENDLY)}</Item>
            <Item>Check-out date: {check_out_date.format(DATE_FORMATS.FRIENDLY)}</Item>
            <Item>Price per night: ${price_per_night}</Item>
            <Item>Total: ${Number(price_per_night)*Number(check_out_date.diff(check_in_date, 'days'))}</Item>
          </Stack>
          <DialogTitle id="alert-dialog-title">
            Do you want to confirm the booking?
          </DialogTitle>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> closeModal(false)}>Cancel</Button>
          <Button variant="contained" color="success" onClick={handleAction} autoFocus>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
