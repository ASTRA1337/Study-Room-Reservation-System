const router = require("express").Router();
const user = require("./user");
const authenticate = require("./authenticate");
router.use("", [user,authenticate]);

router.get("/", (req, res) => {
    res.json({
        data: "hello world"
    });
});

module.exports = router;