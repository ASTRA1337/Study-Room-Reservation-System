import React, {useState} from 'react'
import Topbar from '../Topbar/Topbar';
import Calendar from '../Calendar/Calendar';
import BookingInfo from '../Forms/BookingInfo';
import "./dashboard.css";
import { red } from '@mui/material/colors';
import { fontSize } from '@mui/system';
import {useMutation} from 'react-query';

import {getRoomReservation} from '../../API';

//trigger a change in the selected room which will then trigger a change in calendar
//which will then display the availabe time of the current room at the selected date

function Dashboard() {
    const [selectedRoom, setSelectedRoom] = useState({roomName: "", roomId: ""});
    // const roomData = {
    //     "N430": {
    //         "Sat Jan 01 2022": {
    //             "07:00am07:30am": "reserved"
    //         },
    //         "Sun Nov 28 2021": {
    //             "07:00am07:30am": "reserved"
    //         }
    //     },
    //     "N443": {},
    // }
    const mutation = useMutation(getRoomReservation, {
        onSuccess: (data) => {
            console.log("schedule mutation success with ", data);
        }
    });
    

    const updateRoom = (room, roomId, mutation) => {
        console.log("update room", room, roomId);
        setSelectedRoom({roomName: room, roomId: roomId});
        mutation.mutate(roomId);
    }
    
    const schedule =[
        {weekdate:"Sunday", start: "1:00PM", end: "6:00PM"},
        {weekdate:"Monday", start: "7:00AM", end: "10:00PM"},
        {weekdate:"Tuesday", start: "7:00AM", end: "10:00PM"},
       { weekdate:"Wednesday", start: "7:00AM", end: "10:00PM"},
       { weekdate:"Thursday", start: "7:00AM", end: "10:00PM"},
       { weekdate:"Friday", start: "7:00AM", end: "6:00PM"},
      { weekdate:"Saturday", start: "9:00AM", end: "6:00PM"}
    ];
    const renderSchedule = (schedule) => {
        return schedule.map((time) => {
            return (
                <tr key={time.weekdate}>
                    <td>{time.weekdate}</td>
                    <td>{time.start} - {time.end}</td>
                </tr>
            )
        })
    }
    var roomData = {room_id: selectedRoom.roomId, user_id: 1, reservations: {}};
    if (mutation.data && mutation.data.reservations)
        roomData.reservations = mutation.data.reservations[selectedRoom.roomId]
    console.log("my room data", roomData);
    return (
        <div className = "dashboard">
            <div className = "topbar"><Topbar /></div>
            <div className = "libCard">
            <div className = "calendarCard">
                <span style={{color: "red", fontSize: "20px"}}>{selectedRoom.roomName}</span>
                <div className = "calInfo"><Calendar roomData={roomData} schedule={schedule} updateRoom={()=>mutation.mutate(selectedRoom.roomId)}/></div>
            </div>
                <div className = "libHours">
                    <h3>Library Hours</h3>
                    <table className = "hoursTable">
                        <thead>
                            <tr>
                                <th>Days</th>
                                <th>Hours</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderSchedule(schedule)}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className = "roomInfoCard">
                <div className = "roomInfo">
                    <h3>Room Information</h3>
                    <p>Group Study Rooms (N430, N443, N445, and N447)
                     have a whiteboard and a monitor that can be used to connect a laptop.</p>
                    <p>Presentation rooms (N449 and N453)​
                     have podiums with built-in computers, projectors, video players, whiteboard, 
                    tracking cameras and document cameras. 
                    They also have recording equipment for Zoom presentations.</p>
                </div>
            </div>
            <div className = "bookingInfoCard">
                <div className = "bookingInfo">
                    <h3>Booking Information</h3>
                    <BookingInfo updateRoom={(room, roomId) => updateRoom(room, roomId, mutation)}/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
