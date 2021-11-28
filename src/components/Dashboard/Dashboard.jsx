import React from 'react'
import Topbar from '../Topbar/Topbar';
import Calendar from '../Calendar/Calendar';
import BookingInfo from '../Forms/BookingInfo';
import "./dashboard.css";

function Dashboard() {
    return (
        <div className = "dashboard">
            <div className = "topbar"><Topbar /></div>
            <div className = "libCard">
            <div className = "calendarCard">
                <div className = "calInfo"><Calendar /></div>
            </div>
                <div className = "libHours">
                    <h3>Library Hours</h3>
                    <table className = "hoursTable">
                        <tr>
                            <th>Days</th>
                            <th>Hours</th>
                        </tr>
                        <tr>
                            <td>Monday</td>
                            <td>7:00 AM - 10:00 PM</td>
                        </tr>
                        <tr>
                            <td>Tuesday</td>
                            <td>7:00 AM - 10:00 PM</td>
                        </tr>
                        <tr>
                            <td>Wednesday</td>
                            <td>7:00 AM - 10:00 PM</td>
                        </tr>
                        <tr>
                            <td>Thursday</td>
                            <td>7:00 AM - 10:00 PM</td>
                        </tr>
                        <tr>
                            <td>Friday</td>
                            <td>7:00 AM - 6:00 PM</td>
                        </tr>
                        <tr>
                            <td>Saturday</td>
                            <td>9:00 AM - 6:00 PM</td>
                        </tr>
                        <tr>
                            <td>Sunday</td>
                            <td>1:00 PM - 6:00 PM</td>
                        </tr>
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
                    <BookingInfo />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
