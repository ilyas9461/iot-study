const express = require("express");

const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();

const cors = require("cors");

app.use(cors());


const httpServer = createServer(app);

const io = new Server(httpServer, {
  /* options */
  cors: {
    origins: ["http://localhost:8080","http://192.168.1.165:8080"], 
    credentials: true,
    handlePreflightRequest: (req,res)=>{
      res.writeHead(200,{
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Methods":"GET,POST",
        "Access-Control-Allow-Headers":"my-custom-header",
        "Access-Control-Allow-Credentials":true
      });
      res.end();
    },
  },
});

const bodyParser = require("body-parser");
const path = require("path");

const dotenv = require("dotenv");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

dotenv.config();

const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require("./public/js/socket_users");

app.get("/", (req, res) => {
  res.send(new Date().toString() + " node server running on port 3000");
});

app.use("/user", require("./routers/users/User.js")); //

/* socket operation */

io.on("connection", async function (socket) {
 
  console.log("A user with ID: " + socket.id + " connected");
  lastSocetId = socket.id;

  let socketById = io.sockets.sockets.get(socket.id); //id si bilinen bağlantı oluşturur.
  socketById.emit("socket-id", socket.id);

  socket.on("disconnect", async function () {
    //reserved word
    console.log("A user with ID: " + socket.id + " disconnected");

    socket.to("room1").emit("device-disconnect"); // Sends to everyone except the sender.
  });

  socket.on("client_disconnect", (data) => {
    let socketById = io.sockets.sockets.get(data.socket_id);
    socketById.leave("room1");

    //console.log("client_disconnect: ", data.socket_id);
   // const clients = io.sockets.adapter.rooms.get("room1");
   // console.log("socket room clients list :", clients); // all users from room `room`
  });

  socket.on("login-user", (data) => {
    console.log("socket login-user :", data);
    const user = userJoin(data.socket_id, data.login_user, data.login_device_id); //id ,username, room

    socket.join("room1");

    const clients = io.sockets.adapter.rooms.get("room1");
    console.log("socket room clients list :", clients); // all users from room `room`
  });

  socket.on("time_stamp", (data) => {
    // data:{ device_id: 62164, user_name: 'NODE-MCU', now: 30003 }
    console.log("node-mcu event_name data:", data.device_id);

    //io.to("room1").emit('time_stamp', data); // io.to(room).emit('event', 'message');
    socket.broadcast.to("room1").emit("time_stamp", data); // Sends to everyone except the sender.
    console.log("rooms:", getRoomUsers("room1"));

    const clients = io.sockets.adapter.rooms.get("room1");
    console.log("socket room clients list :", clients); // all users from room `room`

    //socket.broadcast.emit("time_stamp",  data);
  });

  socket.on("temp-humidity", (data) => {
    console.log("temp-humidity data:", data);
    /* {
       login_user: 'NODE-MCU',
       login_device_id: 62164,
       socket_id: 'aY63NW_XIe0JaQUnAAAB',
       temperature: 17,
      humidity: 33
    }*/
    socket.broadcast.to("room1").emit("temp-humidity", data); // Sends to everyone except the sender.
  });

  socket.on("analogue-value", (data) => {
    console.log("analogue-value data:", data);
    /* {
       login_user: 'NODE-MCU',
       login_device_id: 62164,
       socket_id: 'aY63NW_XIe0JaQUnAAAB',
       temperature: 17,
      humidity: 33
    }*/
    socket.broadcast.to("room1").emit("analogue-value", data); // Sends to everyone except the sender.
  });

  socket.on("infrared-value", (data) => {
    console.log("infrared-value data:", data);
    socket.broadcast.to("room1").emit("infrared-value", data); // Sends to everyone except the sender.
  });

  socket.on("led1-on", (data) => {
    console.log("led1-on:", data);
    socket.broadcast.to("room1").emit("led1-on", data); // Sends to everyone except the sender.
  });
  socket.on("led1-off", (data) => {
    console.log("led1-off:", data);
    socket.broadcast.to("room1").emit("led1-off", data); // Sends to everyone except the sender.
  });

  socket.on("led2-on", (data) => {
    console.log("led2-on:", data);
    socket.broadcast.to("room1").emit("led2-on", data); // Sends to everyone except the sender.
  });

  socket.on("led2-off", (data) => {
    console.log("led2-off:", data);
    socket.broadcast.to("room1").emit("led2-off", data); // Sends to everyone except the sender.
  });

  socket.on("relay1", (data) => {
    console.log("relay1");
    socket.broadcast.to("room1").emit("relay1", data); // Sends to everyone except the sender.
  });
  socket.on("relay2", (data) => {
    console.log("relay2");
    socket.broadcast.to("room1").emit("relay2", data); // Sends to everyone except the sender.
  });
  socket.on("temp-humidty", (data) => {
    console.log("temp-humidty");
    socket.broadcast.to("room1").emit("temp-humidty", data); // Sends to everyone except the sender.
  });
  socket.on("tag-data", (data) => {
    console.log("temp-humidty");
    socket.broadcast.to("room1").emit("tag-data", data); // Sends to everyone except the sender.
  });
}); //io.on

/* server start */

let port = process.env.PORT || 3000;

httpServer.listen(port, () => {
  console.log(new Date().toString() + " Listening on port *: 3000");
});

