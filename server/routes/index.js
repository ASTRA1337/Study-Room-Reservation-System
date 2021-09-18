const router = require("express").Router();
const user = require("./user");
router.use("", [user]);

router.get("/", (req, res) => {
    res.json({
        data: "hello world"
    });
});

module.exports = router;