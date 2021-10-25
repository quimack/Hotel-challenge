import { QUERY_KEYS } from '../../contrants/query-keys';
import { useQuery } from 'react-query';
import { getRooms } from '../../api';
import { Room } from '../../types';
import { Layout } from '../../components/layout';
import Table from 'react-bootstrap/Table';


//import { useState, useEffect } from "react";



const Rooms = () => {

    const { data: rooms } = useQuery<Room[]>(QUERY_KEYS.ROOMS, getRooms)

    return (
        <Layout>
            <h1>Rooms</h1>
            <Table striped bordered hover >
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Category</th>
                    <th>Max occupancy</th>
                    <th>Occupancy</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms?.map((room) =>{
                        return(
                            <>
                            <tr>
                                <td>{room.id}</td>
                                <td>{room.category}</td>
                                <td>{room.max_occupancy}</td>
                                <td>{room.occupancy?`Occupied`:`Available`}</td>
                            </tr>
                            </>
                        )
                    })}            
                </tbody>
            </Table>
        </Layout>
    )
}

export { Rooms };