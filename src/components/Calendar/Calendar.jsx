import React, { useState } from 'react'
import {Calendar as ReactCalendar} from 'react-calendar';
//import 'react-calendar/dist/Calendar.css';
import './calendar.css';

//Room: contained the reservations of the selected room
//No reservations in the past
//{date: {id, start,end}}

//30 minutes for each reservation
//create a list, table
/*
start: hour, minute
step: step
end: hour, minute

next: 
tmp = minute + step
hour = hour + tmp // 60
minute = minute % 60
*/

const TimeStatus =  {
    "AM": "am",
    "PM": "pm"
};

function getTimeBlock(time, timeStep)
{
    var tmp = time.minute + timeStep;
    var hour = time.hour + Math.floor(tmp / 60);
    var status = time.status;
    if (status == TimeStatus.AM)
    if (hour > 12) {
        status = (status == TimeStatus.AM) ? TimeStatus.PM : TimeStatus.AM;
        hour = hour - 12;
    }
    var minute = tmp % 60;

    return {"hour": hour,"minute":minute, "status": status};
}

function renderTime(time)
{
    const renderTimeNumber = (t) =>
    {   
        if (isNaN(t)) {
            return "";
        }
        var s = t.toString();
        if (s.length == 1) {
            return "0"+s;
        }
        return s;
    }
    return renderTimeNumber(time.hour) + ":" + renderTimeNumber(time.minute) + time.status;
}

function renderAvailableTime()
{
    const startHour = 7;
    const startMin = 0;
    const endTime = {"hour": 6, "minute": 0, "status": TimeStatus.PM};
    const minuteStep = 30;
    var currentTime = {"hour":startHour, "minute": startMin, "status": TimeStatus.AM};

    var elements = [];
    while (currentTime.hour != endTime.hour || currentTime.minute != endTime.minute ) {
        var nextTime = getTimeBlock(currentTime, minuteStep);
        var status = "Available";
        elements.push(
            <tr>
            <td>{renderTime(currentTime)} - {renderTime(nextTime)}</td>
            <td>{status}</td>
            </tr>
        )
        currentTime = nextTime;
    }
    return elements;
}
function Calendar({room}) {
    const [date, setDate] = useState(new Date());
    return (
        <div className = "calendar">
            <div className = "calWrapper">
                <ReactCalendar onChange={setDate} value={date} />
            </div>
            <div>
                The selected Date
                <table>
                    <thead>
                    <tr>
                        <th>Time</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderAvailableTime()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Calendar

