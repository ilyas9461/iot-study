const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const pgSqlDB = require("./public/js/db_class");

const app = express();
app.use(cors());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  /* options */
  cors: {
    origins: ["http://localhost:8080", "http://192.168.1.165:8080"],
    credentials: true,
    handlePreflightRequest: (req, res) => {
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST",
        "Access-Control-Allow-Headers": "my-custom-header",
        "Access-Control-Allow-Credentials": true,
      });
      res.end();
    },
    // methods:["GET","POST"]
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

/* client request  operation*/

app.get("/", (req, res) => {
  res.send(new Date().toString() + " node server running on port 3000");
});

app.use("/user", require("./routers/users/User.js"));
app.use("/data", require("./routers/data/Data.js"));

/* socket operation */

io.on("connection", async function (socket) {
  // console.log("A user with ID: " + socket.id + " connected");

  console.log("A user with ID: " + socket.id + " connected");
  lastSocetId = socket.id;

  let socketById = io.sockets.sockets.get(socket.id);
  socketById.emit("socket-id", socket.id);

  socket.on("disconnect", async function () {
    // disconnect : reserved word

    console.log("A user with ID: " + socket.id + " disconnected");

    socket.to("room1").emit("device-disconnect"); // Sends to everyone
  });

  socket.on("client_disconnect", (data) => {
    let socketById = io.sockets.sockets.get(data.socket_id);
    socketById.leave("room1");

    console.log("client_disconnect: ", data.socket_id);

    const clients = io.sockets.adapter.rooms.get("room1");
    console.log("socket room clients list :", clients); // all users from room `room`
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
    //console.log("node-mcu event_name data:", data.device_id);
    socket.broadcast.to("room1").emit("time_stamp", data); // Sends to everyone except the sender.
  });

  socket.on("led1-on", (data) => {
    // console.log("led1-on:", data);
    socket.broadcast.to("room1").emit("led1-on", data); // Sends to everyone except the sender.
  });
  socket.on("led1-off", (data) => {
    // console.log("led1-off:", data);
    socket.broadcast.to("room1").emit("led1-off", data); // Sends to everyone except the sender.
  });

  socket.on("led2-on", (data) => {
    // console.log("led2-on:", data);
    socket.broadcast.to("room1").emit("led2-on", data); // Sends to everyone except the sender.
  });

  socket.on("led2-off", (data) => {
    //console.log("led2-off:", data);
    socket.broadcast.to("room1").emit("led2-off", data); // Sends to everyone except the sender.
  });

  socket.on("relay1", (data) => {
    //console.log("relay1");
    socket.broadcast.to("room1").emit("relay1", data); // Sends to everyone except the sender.
  });
  socket.on("relay2", (data) => {
    //console.log("relay2");
    socket.broadcast.to("room1").emit("relay2", data); // Sends to everyone except the sender.
  });

  socket.on("infrared-value", (data) => {
    console.log("infrared-value data:", data);
    pgSqlDB.testDataLog(data).then(function (res, err) {
      socket.broadcast.to("room1").emit("infrared-value", data); // Sends to everyone except the sender.
    });
  });

  socket.on("analogue-value", (data) => {
    //console.log("analogue-value data:", data);
    socket.broadcast.to("room1").emit("analogue-value", data); // Sends to everyone except the sender.
  });

  socket.on("temp-humidity", (data) => {
    //console.log("temp-humidity data:", data);

    /*
     {
        login_user: 'NODE-MCU',
        login_device_id: 62164,
        socket_id: 'aY63NW_XIe0JaQUnAAAB',
        temperature: 17,
        humidity: 33
      }
    */
    pgSqlDB.tempHumidityDataLog(data).then(function (res, err) {
      socket.to("room1").emit("temp-humidity", data); //send to everyone in room
      //socket.broadcast.to("room1").emit("temp-humidty", data); // Sends to everyone except the sender.
    });
  });

  socket.on("tag-data", (data) => {
    socket.broadcast.to("room1").emit("tag-data", data); // Sends to everyone except the sender.
    // console.log("tag-data : ", data);

    /* data: {
       {
          login_user: 'NODE-MCU',
          login_device_id: 62164,
          socket_id: '5sn4PZ2jvLprcQC-AAAD',
          tag_id: '39 48 D6 E6 EC',
          tag_remain: '161'
       }
      
    */
    pgSqlDB.tagDataLog(data).then((res, er) => {});
  });
}); //io.on

let port = process.env.PORT || 3000;

httpServer.listen(port, () => {
  console.log(new Date().toString() + " Listening on port *: 3000");
});
