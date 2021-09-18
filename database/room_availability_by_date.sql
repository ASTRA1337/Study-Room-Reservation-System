select room.room_id, room.room_name, schedule.schedule_time
from
room, schedule

where 
room.room_id = 1
and
not exists
(
select *
from booking
#BOOKING DATE CAN BE REPLACED BY VARIABLE
where booking.booking_date = "2021-09-14"
and booking.schedule_id = schedule.schedule_id
and booking.room_id = room.room_id
)

order by room.room_id, schedule.schedule_time