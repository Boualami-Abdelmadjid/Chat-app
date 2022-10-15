const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoute = require("./routes/messagesRoutes");
const socket = require("socket.io");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/static", express.static(__dirname + "/build/static"));

app.use("/api/auth", userRoutes);
app.use("/api/message", messageRoute);
app.get("/", function (req, res) {
  res.sendFile("/build/index.html", { root: __dirname });
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => console.log(err.message));

const server = app.listen(5000, "0.0.0.0", () => {
  console.log("Server listenning on port 5000");
});
const io = socket(server, {
  cors: {
    origin: "*",
  },
});
global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket
        .to(sendUserSocket)
        .emit("msg-receive", { message: data.message, from: data.from });
    }
  });
});
