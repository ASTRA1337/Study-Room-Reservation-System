const router = require("express").Router();
const BOOKING_TABLE = "booking";


// const test_data =  [
//     {
//         "booking_id": 22,
//         "user_id": 1,
//         "room_id": 1,
//         "start": "2021-12-02T16:30:00.000Z",
//         "schedule_id": null,
//         "end": "2021-12-02T17:00:00.000Z"
//     },
//     {
//         "booking_id": 23,
//         "user_id": 1,
//         "room_id": 1,
//         "start": "2021-12-02T16:30:00.000Z",
//         "schedule_id": null,
//         "end": "2021-12-02T17:00:00.000Z"
//     },
//     {
//         "booking_id": 24,
//         "user_id": 1,
//         "room_id": 1,
//         "start": "2021-12-02T16:30:00.000Z",
//         "schedule_id": null,
//         "end": "2021-12-02T17:00:00.000Z"
//     }
// ];
function process(reservations) {
    //room_id, date
    // {
    //     room_id: {
    //         date: [{start: end: user_id}]
    //     }
    // }
    var res = {};
    for (var booking of reservations) {
        var {room_id, user_id,start,end} = booking;
        if (res[room_id] === undefined) {
            res[room_id] = [];
        }
        res[room_id].push ({user_id: user_id, start: start.toString(), end: end.toString()});
    }
    return res;
}

router.get("/room/reservation/:id", (req, res) => {

    console.log("retrieving room schedule", req.params);
    const room_id = req.params.id;
    const queryString = `SELECT * FROM ${BOOKING_TABLE} WHERE room_id=${room_id};`;
    //Query to database server
    connection.query(queryString, (err,rows,fields) => {
        if (err) {
            console.log("ERROR booking new reservation: ", err);
            res.json({"created": false, "error": err.sqlMessage});
            return;
        }
        console.log("Result: ", rows);
        var processed_reservations = process(rows);
        //const booking_id = rows.insertId;
        if (rows) {
            res.json({"status": true, "reservations": processed_reservations});
        } else {
            res.json({"status": false, "error": "Server error"});
        }
    })
    //group reservation by date
});



module.exports = router;