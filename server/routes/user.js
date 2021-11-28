const router = require("express").Router();
const USER_TABLE = "user";

router.post("/user/schedule", (req, res) => {
    console.log(req.body)
    res.json({
        "authenticated": true,
    })
});
router.post("/user/create", (req,res) => {
    console.log("Creating user", req)
    const {first_name,last_name, email, uhd_id,username,password} = req.query;
    const queryString = `INSERT INTO ${USER_TABLE} (first_name,last_name,email, uhd_id,username,password) 
    VALUES("${first_name}","${last_name}", "${email}", "${uhd_id}", "${username}", "${password}");`;
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