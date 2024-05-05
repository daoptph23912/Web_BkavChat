var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var http = require("http");
const dotenv = require("dotenv");
var indexRouter = require("./routes/index.route");
const database = require("./config/database");
const morgan = require("morgan");
const flash = require("express-flash");
const session = require("express-session");
dotenv.config();
database.connect();

var app = express();
const port = process.env.PORT;
const server = http.createServer(app);
// view engine setup

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "98d1614e-2a43-448e-8408-f35a92850432",
    cookie: { maxAge: 60000 },
  })
);
app.use(flash());

indexRouter(app);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
module.exports = app;
