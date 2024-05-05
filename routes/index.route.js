const useRouter = require("./user.route");
const chatRouter = require("./chat.route");

const authMiddleware = require("../middlewares/auth.middleware");

module.exports = (app) => {
  app.use("/", useRouter);
  app.use("/chat", authMiddleware.requireAuth, chatRouter);
};
