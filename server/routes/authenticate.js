const router = require("express").Router();

//DUMMY DATABASE
const data = [
    {"email": "admin", "password": "admin"},
    {"email": "tom", "password": "tom"}
];

router.post("/authenticate", (req, res) => {
    console.log(req.body)
    const email = req.body.email;
    const password = req.body.password;
    const queryString = `SELECT * FROM user;
    `;
    connection.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("ERROR QUERYING: ", err);
            return;
        }
        console.log("Result: ", rows);
        var authenticated = true;
        res.json({"authenticated": authenticated});
    });
    //Check information
    // var authenticated = false;
    // for (var a of data) {
    //     if (a.email == email && a.password == password) {
    //         authenticated = true;
    //         break;
    //     }
    // }
    // //response
    // res.json({
    //     "authenticated": authenticated,
    // })
});
module.exports = router;