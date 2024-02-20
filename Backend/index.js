const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

app.use(cors());
app.use(express.json());

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
  console.log("socket is : ", socket);
  console.log("socket is active to be connected");

  // custom socket listener
  socket.on("chat", (payload) => {
    console.log("what is payload : ", payload);
    io.emit("chat", payload);
  });
});

app.get("/", (req, res) => {
  res.json({ msg: "Hey there!" });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
