import React, { useState } from 'react'
import {Calendar as ReactCalendar} from 'react-calendar';
//import 'react-calendar/dist/Calendar.css';
import TimeBlock from './TimeBlock';
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
    var status = time.status.toLowerCase();
    if (hour > 12) {
        status = (status === TimeStatus.AM) ? TimeStatus.PM : TimeStatus.AM;
        hour = hour - 12;
    }
    var minute = tmp % 60;

    return {"hour": hour,"minute":minute, "status": status.toUpperCase()};
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

/*
am-pm
convert to 24 hours
receiving time from the server at 24hours

an API retrieved by date?

I want to take in the reservations of the current date

--render all the timeblocks with approriate status "Available" or "Reserved"

Time message from server
{
            "booking_id": 10,
            "user_id": 1,
            "room_id": 2,
            "start": "2021-12-02T16:00:00.000Z",
            "schedule_id": null,
            "end": "2021-12-02T16:30:00.000Z"
}

*/
function renderAvailableTime(dateStatus, today)
{
    console.log("my date", dateStatus);
    const extractTime = (timeString) => {
        var time = timeString.replace(/[AM|PM|am|pm|\s]/g,"");
        time = time.split(":");
        var hour = parseInt(time[0]);
        var minute = parseInt(time[1]);
        var status = timeString.replace(/[^AM|PM|am|pm]/g,"");
        return {"hour": hour, "minute":minute, "status": status};
    }
    const isEqualTime = (t1, t2) => {
        return t1.hour === t2.hour && t1.minute === t2.minute && 
            t1.status.toLowerCase() === t2.status.toLowerCase();
    }
    var currentTime = extractTime(today.start);
    const endTime = extractTime(today.end);
    const minuteStep = 30;
    var times = [];
    console.log("my schedule", today);
    while (! isEqualTime(currentTime, endTime)) {
        var nextTime = getTimeBlock(currentTime, minuteStep);
        var timeId = renderTime(currentTime)+renderTime(nextTime);
        
        var blockStatus = "Available";
        if (dateStatus && dateStatus[timeId]) {
            blockStatus = dateStatus[timeId];
        }
        //timeblock
        var timeBlock = renderTime(currentTime) + "-" + renderTime(nextTime);
        times.push({timeBlock, blockStatus});
        currentTime = nextTime;
    }

    return times.map((current) => 
        <TimeBlock key={current.timeBlock} timeBlock={current.timeBlock} blockStatus={current.blockStatus} />
    );
}

//TimeBlock


function Calendar({room, schedule}) {
    // const room = {
    //     "Sat Jan 01 2022": {
    //         "07:00am07:30am": "reserved"
    //     },
    //     "Sun Nov 28 2021": {
    //         "07:00am07:30am": "reserved"
    //     }
    // }
    

    const [date, setDate] = useState(new Date());
    if (!room)
        return (<div></div>);
    console.log("my date", date.getDate());
    return (
        <div className = "calendar">
            <div className = "calWrapper">
                <ReactCalendar onChange={setDate} value={date} />
            </div>
            <div>
                <p>{date.toDateString()}</p>
                <p>{date.toString()}</p>
                <p>{date.toLocaleTimeString()}</p>
                <table>
                    <thead>
                    <tr style={{display: "block", margin: "20px"}}>
                        <th>Time</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderAvailableTime(room[date.toDateString()], schedule[date.getDay()])}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Calendar

