import React, {useState} from 'react'
import Topbar from '../Topbar/Topbar';
import Calendar from '../Calendar/Calendar';
import BookingInfo from '../Forms/BookingInfo';
import "./dashboard.css";
import { red } from '@mui/material/colors';
import { fontSize } from '@mui/system';

//trigger a change in the selected room which will then trigger a change in calendar
//which will then display the availabe time of the current room at the selected date

function Dashboard() {
    const [selectedRoom, setSelectedRoom] = useState("");
    const roomData = {
        "N430": {
            "Sat Jan 01 2022": {
                "07:00am07:30am": "reserved"
            },
            "Sun Nov 28 2021": {
                "07:00am07:30am": "reserved"
            }
        },
        "N443": {},
    }
    const updateRoom = (room) => {
        setSelectedRoom(room);
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
    return (
        <div className = "dashboard">
            <div className = "topbar"><Topbar /></div>
            <div className = "libCard">
            <div className = "calendarCard">
                <span style={{color: "red", fontSize: "20px"}}>{selectedRoom}</span>
                <div className = "calInfo"><Calendar room={roomData[selectedRoom]} schedule={schedule}/></div>
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
                    <BookingInfo updateRoom={(room) => updateRoom(room)}/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
