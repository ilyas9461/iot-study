const express = require("express");
const app = express();
const dataRoute = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const jwtAuth = require("../../public/js/jwt_token");
const pgSqlDB = require("../../public/js/db_class");

dotenv.config();

dataRoute.post("/temphumidity", async function (req, res) {

  try {
    pgSqlDB.getTempHumidityDataLog().then(function (results, err) {

     // console.log("DB tempHumidity user :", results.rows);

      if (results.length != 0) {
        // console.log("token :", user);
        // res.set('Access-Control-Allow-Origin', '*');
        res.status(200).send(results);
        res.end();
      }
    });


  } catch (error) {
    console.log(error);
  }

}); //route

dataRoute.post("/tagdata", async function (req, res) {

  try {
    pgSqlDB.getTagDataLog().then(function (results, err) {

      console.log("DB tag data :", results.rows);

      if (results.length != 0) {
        // console.log("token :", user);
        // res.set('Access-Control-Allow-Origin', '*');
        res.status(200).send(results);
        res.end();
      }
    });


  } catch (error) {
    console.log(error);
  }

});

module.exports = dataRoute;