const router = require("express").Router();
const user = require("./user");
const authenticate = require("./authenticate");
const room = require("./room");
router.use("", [user,authenticate,room]);

router.get("/", (req, res) => {
    res.json({
        data: "hello world"
    });
});

module.exports = router;