import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { FC, Dispatch, SetStateAction } from 'react';
import { Room } from '../../types';

type Props = {
    room: Room,
    onClick?: Dispatch<SetStateAction<number>>,
    className?: string
}

export const RoomCard: FC<Props> = ({room, onClick, className}) => {
    // room.id === selectedRoom?
    return(
        <Card sx={{ minWidth: 200 }} className={className}>
        <CardContent>
            <Typography variant="h6" component="div">
                {`Room ID: ${room.id}`}
            </Typography>
            <Typography variant="h6" component="div" color={room.occupancy <= Number(0)?"success":"error"}>
                <em>{room.occupancy <= Number(0)?"Available":"Occupied"}</em>
            </Typography>
            <Typography component="div" color="text.secondary">
                {`Category: ${room.category}`}
            </Typography>
            <Typography component="div" color="text.secondary">
                {`Max occupancy: ${room.max_occupancy}`}
            </Typography>
        </CardContent>
        </Card>
    )
}