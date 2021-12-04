const router = require("express").Router();
const USER_TABLE = "user";
const BOOKING_TABLE = "booking";

router.get("/user/schedule", (req, res) => {

    const data = {
        user_id: 1,
        room_id: 2,
        start: "2021/12/02 10:00",
        end: "2021/12/02 10:30"
    };
    const {user_id, room_id, start, end} = data;
    const queryString = `SELECT * FROM ${BOOKING_TABLE};`;
    //Query to database server
    connection.query(queryString, (err,rows,fields) => {
        if (err) {
            console.log("ERROR booking new reservation: ", err);
            res.json({"created": false, "error": err.sqlMessage});
            return;
        }
        console.log("Result: ", rows);
        const booking_id = rows.insertId;
        if (rows) {
            res.json({"created": true, "reservation": rows});
        } else {
            res.json({"created": false, "error": "Server error"});
        }
    })
});

//Date format for mysql: "yyyy/mm/dd hh:mm:ss" (24 hours)
router.post("/user/schedule", (req, res) => {
    //Testing data
     // const data = {
    //     user_id: 1,
    //     room_id: 2,
    //     start: "2021/12/02 10:00",
    //     end: "2021/12/02 10:30"
    // };
    console.log("reservation body", req.body);
    const data = req.body;

    const {user_id, room_id, time_blocks} = data;
    var queryString = `INSERT INTO ${BOOKING_TABLE} (user_id, room_id, start, end) VALUES`;
    //concatenate multiple time reservation
    var values = time_blocks.reduce((prev, current,index) => {
        var {start, end} = current;
        var value = `("${user_id}","${room_id}","${start}","${end}")`;
        if (index == 0)
            return value;
        return prev + "," + value;
    },"");
    //finalize query
    queryString = queryString + " " + values +";";
    //Query to database server
    connection.query(queryString, (err,rows,fields) => {
        if (err) {
            console.log("ERROR booking new reservation: ", err);
            res.json({"created": false, "error": err.sqlMessage});
            return;
        }
        console.log("Result: ", rows);
        const booking_id = rows.insertId;
        if (booking_id) {
            res.json({"created": true, "booking_id": booking_id});
        } else {
            res.json({"created": false, "error": "Server error"});
        }
    })
});

router.post("/user/create", (req,res) => {
    console.log("Creating user", req)
    const {first_name,last_name, email, uhd_id,username,password} = req.body;
    const queryString = `INSERT INTO ${USER_TABLE} (first_name,last_name,email, uhd_id,username,password) 
        VALUES("${first_name}","${last_name}", "${email}", "${uhd_id}", "${username}", "${password}");`;
    //Query to database server
    connection.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("ERROR CREATING USER: ", err);
            res.json({"created": false, "error": err.sqlMessage});
            return;
        }
        console.log("Result: ", rows);
        const user_id = rows.insertId;
        if (user_id) {
            res.json({"created": true, "user_id": user_id});
        } else {
            res.json({"created": false, "error": "Server error"});
        }
    });
})
module.exports = router;