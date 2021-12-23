import axios from "axios";

//const URL = "http://localhost:3000";
const URL = "http://192.168.1.165:3000";

export default class DataService {
  authHeader() {
    let token = localStorage.getItem("user_iot_lys");

    //console.log("authHeader() :", token);
    let header = {
      "Access-Control-Allow-Origin": ["http://localhost:3000", "http://192.168.1.165:3000"], //"*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Access-Control-Allow-Credentials": true,

      Accept: "application/json",
      "Content-Type": "application/json",
      token: token,
    };

    return header;
  }

  async getTempHumidityData(user) {
    console.log("getTempHumidityData:", user);

    const jsonData = JSON.stringify(user);

    const res = await axios
      .post(URL + "/data/temphumidity", jsonData, {
        headers: this.authHeader(),
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.headers);
        }

      });
    

    return res.data; 
  }
  async getTagData(user) {
    console.log("getTagData:", user);

    const jsonData = JSON.stringify(user);

    const res = await axios
      .post(URL + "/data/tagdata", jsonData, {
        headers: this.authHeader(),
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.headers);
        }
       
      });
    

    return res.data; 
  }
}
