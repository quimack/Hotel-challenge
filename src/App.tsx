import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Bookings, Rooms, NewBooking, EditBooking } from './pages';
import DateAdapter from '@mui/lab/AdapterMoment';
import { LocalizationProvider } from '@mui/lab';

import './styles/styles.css';



const App = () => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <BrowserRouter>
          <Switch>
            <Route path="/bookings" component={Bookings} />
            <Route path="/new-booking" component={NewBooking} />
            <Route path="/edit-booking" component={EditBooking} />
            <Route path="/" component={Rooms} />
          </Switch>
        </BrowserRouter>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}

export default App;
