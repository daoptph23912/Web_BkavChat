const md5 = require("md5");
const User = require("../models/user.model");

const generateHelper = require("../helpers/generate.helper");

// [GET] /user/register
module.exports.register = async (req, res) => {
  res.render("pages/register", {
    pageTitle: "Đăng ký tài khoản",
  });
};

// [POST] /user/register
module.exports.registerPost = async (req, res) => {
  const existUser = await User.findOne({
    email: req.body.email,
  });

  if (existUser) {
    req.flash("error", "Email đã tồn tại!");
    res.redirect("back");
    return;
  }

  const infoUser = {
    fullName: req.body.fullName,
    email: req.body.email,
    password: md5(req.body.password),
    tokenUser: generateHelper.generateRandomString(30),
  };

  const user = new User(infoUser);
  await user.save();

  res.cookie("tokenUser", user.tokenUser);

  res.redirect("/");
};

// [GET] /user/login
module.exports.login = async (req, res) => {
  res.render("pages/login", {
    pageTitle: "Đăng nhập",
  });
};

// [POST] /user/login
// module.exports.loginPost = async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   const user = await User.findOne({
//     email: email,
//     deleted: false,
//   });

//   if (!user) {
//     req.flash("error", "Email không tồn tại!");
//     console.log("lỗi email");
//     res.redirect("back");
//     return;
//   }

//   if (md5(password) !== user.password) {
//     req.flash("error", "Sai mật khẩu!");
//     res.redirect("back");
//     return;
//   }

//   if (user.status !== "active") {
//     req.flash("error", "Tài khoản đang bị khóa!");
//     res.redirect("back");
//     return;
//   }

//   res.cookie("tokenUser", user.tokenUser);

//   await User.updateOne(
//     {
//       _id: user.id,
//     },
//     {
//       statusOnline: "online",
//     }
//   );

//   _io.once("connection", (socket) => {
//     socket.broadcast.emit("SERVER_RETURN_USER_STATUS", {
//       userId: user.id,
//       status: "online",
//     });
//   });

//   res.redirect("/chat");
// };

module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({
    email: email,
    deleted: false,
  });

  if (!user) {
    req.flash("error", "Email không tồn tại!");
    console.log("lỗi email");
    res.redirect("back");
    return;
  }

  if (md5(password) !== user.password) {
    req.flash("error", "Sai mật khẩu!");
    res.redirect("back");
    return;
  }

  if (user.status !== "active") {
    req.flash("error", "Tài khoản đang bị khóa!");
    res.redirect("back");
    return;
  }

  _io.once("connection", (socket) => {
    socket.broadcast.emit("SERVER_RETURN_USER_STATUS", {
      userId: user.id,
      status: "online",
    });
  });

  res.redirect("/chat");
};

module.exports.info = async (req, res) => {
  res.render("pages/info", {
    pageTitle: "Thông tin tài khoản",
  });
};
