import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Bookings, Rooms, NewBooking } from './pages';


const App = () => {
  return (
    <QueryClientProvider client={new QueryClient()}>
     
        <BrowserRouter>
          <Switch>
            <Route path="/bookings" component={Bookings} />
            <Route path="/new-booking" component={NewBooking} />
            <Route path="/" component={Rooms} />
          </Switch>
        </BrowserRouter>
    
    </QueryClientProvider>
  );
}

export default App;
