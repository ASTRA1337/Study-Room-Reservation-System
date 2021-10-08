const router = require("express").Router();

//DUMMY DATABASE
const data = [
    {"email": "admin", "password": "admin"},
    {"email": "tom", "password": "tom"}
];
const USER_TABLE = "user";

router.post("/authenticate", (req, res) => {
    console.log(req.body)
    const email = req.body.email;
    const password = req.body.password;
    const queryString = `SELECT * FROM ${USER_TABLE} 
        WHERE email="${email}" AND password="${password}";`;
    connection.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("ERROR AUTHENTICATING: ", err);
            res.json({"authenticated": false, "error": "Querying error"});
            return;
        }
        console.log("Result: ", rows);
        if (rows.length == 0) {
            res.json({"authenticated": false, "error": "Invalid login credentials or user does not exist"});
        } else if (rows.length == 1){
            var data = rows[0]
            console.log("row data: ",data);
            
            res.json({"authenticated": true, user: rows[0]});
        } else {
            res.json({"authenticated": false, "error": "Server error"});
        }
    });
});
module.exports = router;