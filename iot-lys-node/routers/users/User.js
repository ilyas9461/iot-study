const express = require("express");
const app = express();
const userRoute = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const jwtAuth = require("../../public/js/jwt_token");
const pgSqlDB = require("../../public/js/db_class");


let token;

let user = {
  login: false,
  userId: null,
  deviceId: null,
  token: null,
};

dotenv.config();

userRoute.post("/login", async function (req, res) {
  // user route ait kök route   client "/user" istekleri için...
  let user_id =req.body.id;
  let user_pass = req.body.pass;

  //console.log("login :", user_id, user_pass);

  if (user_id && user_pass) {
    try {
      pgSqlDB.login(user_id, user_pass).then(function(results,err){
       // console.log("DB login user :", results);

        if (results.length != 0) {
          let device_id = results.rows[0].device_id;
  
          user.login = true;
          user.userId = user_id;
          user.deviceId = device_id;
  
          token = jwtAuth.generateAccessToken(user);
  
          user.token = token;
         // console.log("token :", user);
          res.status(200).send(user);
          res.end();
        }
      });

      
    } catch (error) {
      console.log(error);
    }

  } //if
});  //route

userRoute.post("/register", async function (req, res) {
  console.log("register:", req.body.id, req.body.pass);

  pgSqlDB.addUser(req.body.id, req.body.pass).then(function (result, err) {
    console.log("resDB:", result);

    if (err) {
      res.status(500).json(err);
    } else if (!result) {
      res.status(404).json(); // This runs.
    }

    user.login = true;
    user.userId = req.body.id;
    user.deviceId = result;

    token = jwtAuth.generateAccessToken(user);

    user.token = token;

    console.log("token :", user);

    res.status(200).send(user);
    res.end();
  });
});

module.exports = userRoute;
