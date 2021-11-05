import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
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
    <Grid container spacing={2}>
        <Grid item xs={4}>
          <ThemeProvider theme={lightTheme}>
            <Box
              sx={{
                p: 2,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { md: '1fr 1fr 1fr 1fr' },
                gap: 10,
              }}
            >
              {rooms?.map((room) => (
                room.occupancy <= Number(0)?
                  <RoomCard room={room} setRoom={setRoom} className="visible-cursor" />
                  :
                  <RoomCard room={room}/>
              ))}
            </Box>
          </ThemeProvider>
        </Grid>
    </Grid>
  );
}