// Controller functions come here
const { User, Product } = require("../model/casaverdeModel");
const mongoose = require("mongoose");

const allProductControllers = {};

// Add new Product from admin
allProductControllers.addProduct = async (req, res) => {
  console.log("req.body", req.body);
  User.findById(req.id).then((user) => {
    try {
      if (user) {
        const product = new Product({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          category: req.body.category,
          description: req.body.description,
          price: req.body.price,
          image: req.file.path,
          delivery: req.body.delivery,
          quantity: req.body.quantity,
        });
        product.save();
        
        res
          .status(201)
          .json({ message: "New product has been added ✅", product });
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
};
// update a product
allProductControllers.updateProduct = async (req, res) => {
  try {
    const findProduct = await Product.findByIdAndUpdate(req.params.id, {
      $set: {
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        // image: req.file.path,
        delivery: req.body.delivery,
        // image: req.body.image,
        quantity: req.body.quantity,
      },
    });
    console.log("REQQ  BODY IDDD", req.params.id);
    res.status(200).json({ message: "Product has been updated", findProduct });
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
};
// Add new Product to the basket from users
//616ec638b7d4def05aa683c5 bs for product id
//
//adding controllers
allProductControllers.addToBasket = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    const product = await Product.findById(req.body.productId);
    if (user && product) {
      user.basket.push(product);
      user.save();
      res.status(201).json({ message: "Product added to basket ✅" });
    } else {
      res.status(404).json({ message: "User or product not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
allProductControllers.addToWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    const product = await Product.findById(req.body.productId);
    if (user && product) {
      user.wishlist.push(product);
      user.save();
      res.status(201).json({ message: "Product added to wishlist ✅" });
    } else {
      res.status(404).json({ message: "User or product not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// remove controllers
allProductControllers.removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    const product = await Product.findById(req.body.productId);
    if (user && product) {
      user.wishlist.pull(product);
      user.save();
      res.status(201).json({ message: "Product removed from wishlist ✅" });
    } else {
      res.status(404).json({ message: "User or product not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
allProductControllers.removeFromBasket = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    const product = await Product.findById(req.body.productId);
    if (user && product) {
      user.basket.pull(product);
      user.save();

      res.status(201).json({ message: "Product removed from basket ✅" });
    } else {
      res.status(404).json({ message: "User or product not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
allProductControllers.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted ✅" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
allProductControllers.getCheckout = async (req, res) => {
  //console.log(req.id);
  //we will get it from front end as obj  once the payment is done
  //const placedOrder = true;
  try {
    const user = await User.findById(req.id);

    const product = await Product.find({
      _id: {
        $in: user.basket,
      },
    });
    // console.log("product", product);
    // we count the amount of each purcashed product by counting the numbers of the same ids
    const quantityCounter = {};
    user.basket.forEach(function (item) {
      quantityCounter[item._id] = quantityCounter[item._id]
        ? quantityCounter[item._id] - 1
        : 1;
    });
    // we update the quantity in our inventory
    product.forEach((item) => {
      item.quantity = item.quantity - quantityCounter[item._id];
      item.save();
    });
    const updatedProduct = await Product.updateMany(
      {
        _id: {
          $in: user.basket,
        },
      },
      {
        $set: {
          quantity: this.quantity,
          // quantity: 100,
        },
      }
    );
    // keep them for testing
    //616ec6feb7d4def05aa683d0 only 94 left ', - should become 88'
    //616ed198dd2ebe480b74bae7 only 95 left', - should become 90
    //61712743bc5b07cecabd00c9 only 92 left', - should become 84
    //617180bcf69f58df9e12c0c5 only 97 left ', - should become 95'
    //  console.log(quantityCounter);
    //  console.log( product.map(item=>item.quantity))
    //  console.log(product.map((el)=> `${el._id} only ${el.quantity} left`));

    // we empty the basket
    const basketupdater = await User.findByIdAndUpdate(req.id, {
      $set: {
        basket: [],
      },
    });
    // update the db
    res.status(200).json({
      message:
        "inventory updated, thank u for ur purchase we hope to see u again ",
      basketupdater,
    });
  } catch (err) {
    res.status(err.status).json({
      message: err.message,
    });
  }
};
//get all products
allProductControllers.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// get all products from a user upon the id

allProductControllers.getOneByID = async (req, res) => {
  try {
    const user = await User.findById(req.id).populate("basket");
    // res.status(200).json(user);

    await res.status(200).json({
      basket: user.basket.map((item) => item.toObject()),
      wishlist: user.wishlist,
      username: user.username,
    });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

module.exports = allProductControllers;
