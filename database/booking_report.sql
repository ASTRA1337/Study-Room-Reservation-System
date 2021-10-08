select user.uhd_id as "PeopleSoft ID",
user.first_name as "First Name",
user.last_name as "Last Name",
user.email as "Email",
room.room_name as "Study Room",
booking.booking_date as "Date",
schedule.schedule_time as "Time"

from 
user, booking, room, schedule
where
booking.user_id = user.user_id
and
booking.schedule_id = schedule.schedule_id
and
booking.room_id = room.room_id
##user id can be replaced by variable
and user.user_id = 1

order by user.user_id, booking.room_id, booking.booking_date, schedule.schedule_time