// Initializing Dependencies
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var morgan = require("morgan");
var bodyParser = require("body-parser");
const session = require("express-session");
var app = express();
// Initialize && Use Cors
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// session

app.use(
  session({
    key: "token",
    secret: process.env.TOKEN_TEXT,
    resave: false,
    saveUninitialized: false,
  })
);
// Setting up Dependencies
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// mongoDB

const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("DB is connected 😎"))
  .catch((error) => {
    console.log(`There was a problem ${error.message}`);
  });


// Initializing Routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/user");
var adminRouter = require("./routes/admin");
var ProductRouter = require("./routes/product");

// use routes

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/admin", adminRouter);
app.use("/product", ProductRouter);

app.all("*", (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} on this server`, 404));
});
// Exporting App
module.exports = app;
