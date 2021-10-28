//  population and ref
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  username: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    //match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    index: true,
    unique: true,
  },
  admin: Boolean,
  // the role ADMIN will have always a full basket with all the products
  password: { type: String, required: true },
  email: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    index: true,
  },
  avatar: String,
  phone: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  country: { type: String },
  wishlist: [],
  //              Tareq's basket
  // basket: [
  //   {
  //     product: { type: Schema.Types.ObjectId, ref: "Product" },
  //     purchasedQuantity: Number,
  //   },
  // ],
  basket: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const productSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  category: {
    type: String,
    required: true,
    enum: [
      "Bouquet of flowers",
      "Flower and plants pots",
      "Gift baskets",
      "Italian Products",
    ],
  },

  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  // image: { type: String, required: true },
  quantity: { type: Number, required: false },
});

const Product = mongoose.model("Product", productSchema);

const User = mongoose.model("User", userSchema);

module.exports = { User, Product };
