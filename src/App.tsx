import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Bookings, Rooms, NewBooking } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/bookings" component={Bookings} />
        <Route path="/new-booking" component={NewBooking} />
        <Route path="/" component={Rooms} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;
