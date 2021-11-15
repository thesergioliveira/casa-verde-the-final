var express = require("express");
var router = express.Router();
const allControllers = require("../controllers/controller");
const allProductControllers = require("../controllers/productsController");
const middleware = require("../middlewares/middleware");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
/* add new Product. */
router.post("/product/",middleware.checkToken, 
 upload.single('avatar'), 
allProductControllers.addProduct);

// get all users
// getAll http://localhost:5005/admin/users
router.get("/users",middleware.checkToken, allControllers.getAllUsers);
// update Product.
router.put("/product/:id", allProductControllers.updateProduct);
router.delete("/product/:id", allProductControllers.deleteProduct);

// delete Product.




module.exports = router;
