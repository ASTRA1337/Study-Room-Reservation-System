import React, { useState } from 'react'
import Calendar from 'react-calendar';
//import 'react-calendar/dist/Calendar.css';
import './calendar.css';

function CalendarX() {
    const [date, setDate] = useState(new Date());
    return (
        <div className = "calendar">
            <div className = "calWrapper">
                <Calendar onChange={setDate} value={date} />
            </div>
        </div>
    )
}

export default Calendar

