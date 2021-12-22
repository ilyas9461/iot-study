import axios from "axios";

//const URL = "http://localhost:3000";
const URL ="http://192.168.1.165:3000";

let token = localStorage.getItem("user_iot_lys");

export default class LoginService {
  authHeader() {
     let token = localStorage.getItem("user_iot_lys");
    let header = {
      "Access-Control-Allow-Origin": ["http://localhost:3000","http://192.168.1.165:3000"] ,//"*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Access-Control-Allow-Credentials":true,

      Accept: "application/json",
      "Content-Type": "application/json",
      token: token, 
    };

    return header;
  }

  async userRegister(user) {
    console.log("user register:", user);

    const jsonData = JSON.stringify(user);

    const res = await axios
      .post(URL + "/user/register", jsonData, {
        headers: this.authHeader(),
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.headers);
        }
      });

    localStorage.setItem("user_iot_lys", JSON.stringify(res.data));
    return res.data;
  }

  async userLogin(user) {
    console.log("user login:", user);

    const jsonData = JSON.stringify(user);

    const res = await axios
      .post(URL + "/user/login", jsonData, {
        headers: this.authHeader(),
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.headers);
        }
      });

    localStorage.setItem("user_iot_lys", JSON.stringify(res.data));
    return res.data; 
  }

} //class

