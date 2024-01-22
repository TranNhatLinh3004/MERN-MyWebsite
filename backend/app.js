const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./database.config");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bodyParser = require("body-parser");

// const multer = require("multer");

const app = express();
app.use(cors());
require("dotenv").config(); // Tải biến môi trường từ tệp .env

connectDB(); // Kết nối với cơ sở dữ liệu bằng cách sử dụng cấu hình cơ sở dữ liệu của bạn
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json({ limit: "10mb" }));

app.use("/auth", authRoute);
app.use("/users", userRoute);

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// const storage = multer.diskStorage({
//   destination: (req, file, cd) => {
//     cd(null, "uploads/");
//   },

//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage });
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Máy chủ đang chạy trên cổng ${port}`);
});
module.exports = app;