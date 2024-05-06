const Chat = require("../models/chat.model");
const User = require("../models/user.model");

const chatSocket = require("../sockets/chat.socket");

// [GET] /chat/:roomChatId
module.exports.index = async (req, res) => {
  // SocketIO
  chatSocket(req, res);
  // End SocketIO

  const roomChatId = req.params.roomChatId;

  // Lấy data từ database
  const chats = await Chat.find({
    room_chat_id: roomChatId,
    deleted: false,
  });

  for (const chat of chats) {
    const infoUser = await User.findOne({
      _id: chat.user_id,
    }).select("fullName");

    chat.infoUser = infoUser;
  }
  // Hết Lấy data từ database

  res.render("pages/chat", {
    pageTitle: "Chat",
    chats: chats,
  });
};
module.exports.homeChat = async (req, res) => {
  //lấy tất cả tên người dùng 
  const allUsers = await User.find({}, "fullName");

 
  // const userLogin = await User.findOne({email:req.session.userInfo.email});

  // if (!userLogin) {
  //   return res.status(401).send("Bạn chưa đăng nhập.");
  // }

  res.render("pages/chat", {
    pageTitle: "Chat",
    allUsers: allUsers.map((user) => user.fullName),
    // userLogin:userLogin 
  });
};
