var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var positionRouter = require("./routes/personnel");
var productRouter = require("./routes/product")
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
// 获取表单信息
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 提供对外访问的文件夹；
app.use(express.static(path.join(__dirname, "public")));

// 一级路由:
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/product", productRouter)
// 所有人员信息接口
app.use("/api/personnel", positionRouter);
// positionRouter为路由中间件；

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
