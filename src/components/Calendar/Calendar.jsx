import React, { useState } from 'react'
import {Calendar as ReactCalendar} from 'react-calendar';
import {useMutation} from 'react-query';
import {makeReservation} from '../../API';
import TimeBlock from './TimeBlock';

import './calendar.css';

//Room: contained the reservations of the selected room
//No reservations in the past
//{date: {id, start,end}}

//30 minutes for each reservation

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

function convertTo24HourFormat(time) {
    var addHour = 0;
    if (time.includes("PM"))
        addHour = 12;
    var t = time.replace(/[AM|PM|am|pm|\s]/g,""); //remove all space, AM, PM from time
    var tmp = t.split(":");
    var hour = parseInt(tmp[0]) % 12 + addHour;

    return hour + ":" + tmp[1];
}
/*
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
    
    //Helpers
    const getSQLDate = (date) => {
        return date.getFullYear() + "/" +date.getMonth()+"/"+date.getDate();
    }
    //
    var [reservations, setReservations] = useState({user_id: 1, room_id: 1, date: ""});
    var times = {};
    var [dateStatus, setDateStatus] = useState({});
    const [date, setDate] = useState(new Date());

    //send reservation request to server
    const mutation = useMutation(makeReservation, {
        onSuccess: (data) => {
            if (data.created) {
                console.log("Reservation success", data);
                var reserved = {};
                for (var timeString in times) {
                    if (times[timeString])
                        reserved[timeString] = true;
                }
                console.log("new status", {...dateStatus, ...reserved});
                var d = getSQLDate(date);
                setDateStatus({
                    ...dateStatus,
                    [d]: {
                        ...dateStatus[d],
                        ...reserved
                    }
                });
            } else {
                console.log("Reservation failed", data);
            }
        }
    });

    //update selected or deselected time block
    const updateReservations = (newReservation) => {
        times ={
            ...times,
            [newReservation]: times[newReservation] === undefined? true : !times[newReservation]
        }
        // setReservations({
        //     ...reservations,
        //     times: times
        // });
    }

    const renderAvailableTime = (dateStatus, today) =>
    {
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
            var timeBlock = renderTime(currentTime) + "-" + renderTime(nextTime);
            var blockStatus = "Available";
            if (dateStatus && dateStatus[timeBlock]) {
                blockStatus = "Reserved";
            }
            times.push({timeBlock, blockStatus});
            currentTime = nextTime;
        }

        return times.map((current) => 
            <TimeBlock key={current.timeBlock} 
                timeBlock={current.timeBlock} 
                blockStatus={current.blockStatus}
                reserve={(newReservation) => updateReservations(newReservation)}
                />
        );
    }


    const reserve = (times) => {
        console.log("reserve times", times);
        var reserve_times = []
        for (var timeString in times) {
            if (times[timeString])
                reserve_times.push(timeString);
        }
        if (reserve_times.length === 0) {
            console.log("No time selected");
            return;
        }
        console.log("reserve times", reserve_times);
        //const {user_id, room_id, date, times} = reservations;
        //times should be an array of object with format {start, end}
        var localDate = getSQLDate(date);
        const conformTimes = reserve_times.map((timeString) => {
            var t = timeString.split("-");
            var start = convertTo24HourFormat(t[0]);
            var end = convertTo24HourFormat(t[1]);
            return {start: localDate + " " + start,
                    end: localDate + " " + end}
        });
        const data = {
            user_id: 1,
            room_id: 2,
            time_blocks:conformTimes,
        };
        mutation.mutate(data);
    }

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
                    {renderAvailableTime(dateStatus[getSQLDate(date)], schedule[date.getDay()])}
                    </tbody>
                </table>
            </div>
            <button className="reserve-button" onClick={() => reserve(times) }>Reserve</button>
        </div>
    )
}

export default Calendar

