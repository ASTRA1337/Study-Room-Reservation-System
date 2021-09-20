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
    //Check information
    var authenticated = false;
    for (var a of data) {
        if (a.email == email && a.password == password) {
            authenticated = true;
            break;
        }
    }
    //response
    res.json({
        "authenticated": authenticated,
    })
});
module.exports = router;