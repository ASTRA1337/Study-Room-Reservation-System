import React from 'react';
import {useMutation} from 'react-query';
import {makeReservation} from '../API';
import './Reservation.css';

function Reservation({}) {
    const mutation = useMutation(makeReservation, {
        onSuccess: (data) => {
            console.log("Reservation success", data);
        }
    });
    const data = {
        user_id: 1,
        room_id: 2,
        time_blocks:[{
            start: "2021/12/02 10:00",
            end: "2021/12/02 10:30"
        },
        {
            start: "2021/12/02 10:30",
            end: "2021/12/02 11:00"
        },
        {
            start: "2021/12/02 11:00",
            end: "2021/12/02 11:30"
        }
        ],

    };
    return (
        <button onClick={() => mutation.mutate(data)}> Reservation</button>
    )
}

export default Reservation;
