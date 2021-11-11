var express = require("express");
var router = express.Router();
const allControllers = require("../controllers/controller");
/* GET home page. */
//the home page will done soon sofar we have something in DB to get its
// http://localhost:5005
router.get("/", allControllers.getDate);

module.exports = router;
