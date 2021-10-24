import { api } from '../../utils/index';
import { Room } from '../../types'

const getRooms = async () => {
    try{
        const response = await api.get<Room[]>('/rooms');
        console.log(response);
        return response.data;
    } catch (err) {
        console.log(err);
        throw new Error('There was a server error');
    } 
}

export { getRooms };