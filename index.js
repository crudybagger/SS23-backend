require("dotenv").config();

let express = require('express');
let app = express();
const path = require('path')
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressJWT = require('express-jwt');
const authRoutes = require("./routes/auth");
const offlineUserRoutes = require("./routes/offlineUser");
const eventRoutes = require("./routes/event");
const paymentRoutes = require("./routes/payment");
const contactUSRoutes = require("./routes/contactUs");
const promoCodeRoutes = require("./routes/promoCode");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(cors());

  app.use('/static',express.static('media'));
  app.use(bodyParser.urlencoded({ extended: false }))
  
app.get("/addEvent", (req, res)=>{
    res.render("addEvent",{});
})
app.get("/addPromoCode", (req, res)=>{
  res.render("addPromoCode",{});
})
// app.use(expressJWT({ secret: process.env.SECRET ,algorithms: ['sha1', 'RS256', 'HS256'],}).unless({ path: ['/', '/login', '/wutangclan'] }));
app.use("/", authRoutes);
app.use("/", eventRoutes);
app.use("/", contactUSRoutes);
app.use("/", promoCodeRoutes);
app.use("/payment", paymentRoutes);
app.use("/", offlineUserRoutes);

app.listen(process.env.PORT || 3000,()=> {
    console.log("Started");
})