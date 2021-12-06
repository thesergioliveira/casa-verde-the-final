var express = require("express");
var router = express.Router();
const allControllers = require("../controllers/controller");
const allProductControllers = require("../controllers/productsController");
const middleware = require("../middlewares/middleware");
const path = require("path");
const dirpath = path.join(__dirname, "/uploads");
console.log(dirpath);
const multer = require("multer");
const { dir } = require("console");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 },
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/gif"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only .jpg .gif .png files are OK"), false);
    }
  },
});
/* add new Product. */
router.post(
  "/product/",
  middleware.checkToken,
  upload.single("image"),
  allProductControllers.addProduct
);

// get all users
// getAll http://localhost:5005/admin/users
router.get("/users", middleware.checkToken, allControllers.getAllUsers);
// update Product.
router.put(
  "/product/:id",
  upload.single("image"),

  allProductControllers.updateProduct
);
router.delete(
  "/product/:id",

  allProductControllers.deleteProduct
);
router.put(
  "/product/quantitycheck/:id",
  middleware.checkToken,
  allProductControllers.updateQuantity
);
// delete Product.

module.exports = router;
