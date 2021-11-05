import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Room } from '../../types';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../contrants/query-keys';
import { getRooms } from '../../api';
import{ FC, Dispatch, SetStateAction } from 'react';
import { RoomCard } from '..';


type Props={
  selectedRoom?: number,
  setRoom: Dispatch<SetStateAction<number>>
}

export const RoomsPaper: FC<Props> = ({selectedRoom, setRoom}) => {

  const { data: rooms } = useQuery<Room[]>(QUERY_KEYS.ROOMS, getRooms);
  const lightTheme = createTheme({ palette: { mode: 'light' } });

  return (
    <>
    <h2>Rooms availability:</h2>
    <h3><em>Select one to enable "in house" booking status</em></h3>
    <Grid container spacing={2} >
      <ThemeProvider theme={lightTheme}>            
          {rooms?.map((room) => (
            room.occupancy <= Number(0)?
            <Grid item sx={{cursor: "pointer"}}>
              <RoomCard room={room} setRoom={setRoom} />
            </Grid>
            :
            <Grid item>
              <RoomCard room={room}/>
            </Grid>
          ))}
      </ThemeProvider>
    </Grid>
    </>
  );
}