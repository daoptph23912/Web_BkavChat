const User = require("../models/user.model");

module.exports.requireAuth = async (req, res, next) => {
  if (!req.cookies.tokenUser) {
    res.redirect("login");
  } else {
    const user = await User.findOne({
      tokenUser: req.cookies.tokenUser,
      deleted: false,
    }).select("-password");

    if (!user) {
      res.redirect("login");
    } else {
      res.locals.infoUser = user;

      next();
    }
  }
};
