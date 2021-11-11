var express = require("express");
var router = express.Router();

const allProductControllers = require("../controllers/productsController");
/* to view Products to http://localhost:5005/product/ */
router.get("/", allProductControllers.getAllProducts); 


module.exports = router;
