Select 
#room_name as "Room",
feature_name as "Feature"
From room_feature 
join feature
join room
where room_feature.room_id = room.room_id
and room_feature.feature_id = feature.feature_id
# ROOM ID can be replaced by variable
 and room.room_id = 5