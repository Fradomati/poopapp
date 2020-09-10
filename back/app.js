require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const secure = require("express-force-https");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();
app.set("trust proxy", 1)
app.use(secure)

// Cross Domain CORS whitlist
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(express.static(path.join(__dirname, "public")));
// Middleware Setup
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    name: "Session_ID",
    secret: process.env.SESSION_PASSWORD,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

require("./passport/")(app);

// Express View engine setup

// app.use(
//   require("node-sass-middleware")({
//     src: path.join(__dirname, "public"),
//     dest: path.join(__dirname, "public"),
//     sourceMap: true,
//   })
// );

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "hbs");


// app.use(express.static(path.resolve(__dirname, "public/index.html")))

// app.get('*', function (req, res) {
//   res.sendFile(path.resolve(__dirname, 'public/index.html'))
// })

const index = require('./routes/index');
app.use('/', index);

// Login and Signup Route
const auth = require("./routes/auth");
app.use("/auth", auth);

// Data Timer 

const dataTime = require("./routes/dataTime");
app.use("/dataTime", dataTime);

// Online User

const OnlineUser = require("./routes/onlineUser");
app.use("/onlinesUser", OnlineUser);

module.exports = app;
