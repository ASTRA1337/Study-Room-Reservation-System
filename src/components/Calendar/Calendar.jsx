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
    return renderTimeNumber(time.hour) + ":" + renderTimeNumber(time.minute) + " " +time.status;
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


function Calendar({roomData, schedule, updateRoom}) {
    //Helpers
    const getSQLDate = (date) => {
        var month = date.getMonth() + 1;
        return date.getFullYear() + "/" +month +"/"+date.getDate();
    }
    //
    var [reservations, setReservations] = useState({user_id: 1, room_id: 1, date: "", times: {}});
    const [date, setDate] = useState(new Date());

    //send reservation request to server
    const mutation = useMutation(makeReservation, {
        onSuccess: (data) => {
            if (data.created) {
                console.log("Reservation success", data);
                setReservations({
                    ...reservations,
                    times: {}
                });
                updateRoom();
            } else {
                console.log("Reservation failed", data);
            }
        }
    });

    //update selected or deselected time block
    const updateReservations = (newReservation) => {
        console.log("new reservation", newReservation);
        var times = reservations.times;
        times = {
            ...times,
            [newReservation]: times[newReservation] === undefined? true : !times[newReservation]
        }
        setReservations({
            ...reservations,
            times: times
        });
    }

    const renderAvailableTime = (dateStatus, today) =>
    {
        //Helper
        const process_date = (data) => {
            if (data === undefined)
                return {};
            var reserved_blocks = {};
            console.log("data flow", data);
            const processTime = (t) =>
            {   
                if (t === undefined) {
                    return "";
                }
                var s = t.split(":");
                var hour = s[0]
                if (hour.length == 1) {
                    hour = "0"+hour;
                }
                return hour + ":" + s[1]+ ":" +s[2];
            }
            for (var t of data) {
                var start = processTime(t.start);
                var end = processTime(t.end);

                var id = start.replace(":00","") + "-" + end.replace(":00","");
                console.log(id);
                reserved_blocks[id] = t.user_id;
            }
            return reserved_blocks;
        }
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
        //End Helper
        const reserved_blocks = process_date(dateStatus);
        
        
        var currentTime = extractTime(today.start);
        const endTime = extractTime(today.end);
        const minuteStep = 30;
        var times = [];
        console.log("my schedule", today);
        while (! isEqualTime(currentTime, endTime)) {
            var nextTime = getTimeBlock(currentTime, minuteStep);
            var timeBlock = renderTime(currentTime) + "-" + renderTime(nextTime);
            console.log("timeBLock", timeBlock, timeBlock);
            var blockStatus = "Available";
            if (reserved_blocks && reserved_blocks[timeBlock]) {
                blockStatus = "Reserved";
                if (reserved_blocks[timeBlock] === roomData.user_id) {
                    blockStatus = "RESERVED FOR ME";
                }
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


    const reserve = (reservations) => {
        var reserve_times = []
        for (var timeString in reservations.times) {
            if (reservations.times[timeString])
                reserve_times.push(timeString);
        }
        if (reserve_times.length === 0) {
            console.log("No time selected");
            return;
        }
        console.log("reserving times", reserve_times);
        //const {user_id, room_id, date, times} = reservations;
        //times should be an array of object with format {start, end}
        var localDate = getSQLDate(date);
        console.log("localDate", localDate, date.toDateString());
        const conformTimes = reserve_times.map((timeString) => {
            var t = timeString.split("-");
            var start = convertTo24HourFormat(t[0]);
            var end = convertTo24HourFormat(t[1]);
            return {start: localDate + " " + start,
                    end: localDate + " " + end}
        });
        const data = {
            user_id: roomData.user_id,
            room_id: roomData.room_id,
            time_blocks:conformTimes,
        };
        mutation.mutate(data);
    }

    var date_reservations = [];
    if (roomData && roomData.reservations) {
        date_reservations = roomData.reservations[getSQLDate(date)];
    }
    console.log("room data- Calendar", roomData);
    console.log("date reservations", date_reservations);
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
                    {renderAvailableTime(date_reservations, schedule[date.getDay()])}
                    </tbody>
                </table>
            </div>
            <button className="reserve-button" onClick={() => reserve(reservations) }>Reserve</button>
        </div>
    )
}

export default Calendar

