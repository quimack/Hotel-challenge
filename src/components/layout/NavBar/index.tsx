import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hotel Administration
          </Typography>
          <Button color="inherit" href="/">Rooms</Button>
          <Button color="inherit" href="/bookings">Bookings</Button>
          <Button color="inherit" href="/new-booking">+ New booking</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

 export { NavBar };