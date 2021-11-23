var express = require("express");
var router = express.Router();
const allControllers = require("../controllers/controller");
const middleware = require("../middlewares/middleware");
const allProductControllers = require("../controllers/productsController");
//user route
// get all products
router.get("/products", allProductControllers.getAllProducts);
router.get("/oneproduct/:id", allProductControllers.getOne)
// register http://localhost:5005/user/register
router.post("/register", middleware.validator, allControllers.addUser);
// resent confirmation Email 
router.put("/resentConfirmation", allControllers.confirmationEmail);
// verify account
router.put("/verifyAccount", allControllers.verifyAccount);

// login http://localhost:5005/user/login
router.post("/login", allControllers.login);
//forget password
router.put("/forgotPassword", allControllers.forgotPassword);
router.put("/resetPassword", allControllers.resetPassword);
// update user infos && password && delete
router
  .get("/checkAuth", middleware.checkToken, allControllers.getOneUser)
  .put("/update", middleware.checkToken, allControllers.updateUser)
  .put("/updateAddress", middleware.checkToken, allControllers.updateAddress)
  .put("/updatePassword", middleware.checkToken, allControllers.updatePassword)
  .delete("/deleteUser", middleware.checkToken, allControllers.deleteUser);

router
  .post("/wishlist", middleware.checkToken, allProductControllers.addToWishlist)
  .put(
    "/wishlist",
    middleware.checkToken,
    allProductControllers.removeFromWishlist
  );
router
  .post(
    "/addToBasket",
    middleware.checkToken,
    allProductControllers.addToBasket
  )
  .get("/getTheBasket", middleware.checkToken, allProductControllers.getOneByID)
  .put(
    "/removeFromTheBasket",
    middleware.checkToken,
    allProductControllers.removeFromBasket
  );
router.put("/removeAll", middleware.checkToken, allProductControllers.removeAllfromBasket);
router.put(
  "/checkout",
  middleware.checkToken,
  allProductControllers.getCheckout
);
module.exports = router;
