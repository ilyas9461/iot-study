const { pool } = require("./pg_config");

class pgSqlDBClass {
  // ==== CORE FUNCTION
  static doQuery(queryToDo) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = queryToDo;
        pool.query(query, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  static doInsert(queryToDo, array) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = queryToDo;
        pool.query(query, array, function (err, result) {
          if (err) console.log(err);
          else resolve(result);
        });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }
  //  ===== core =====

  static getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

  static async controlDbDeviceId() {
    let query = "SELECT * FROM users";
    let res = await this.doQuery(query);          // res.rows  array object 
    let rndId = this.getRandomIntInclusive(1000, 0xffff);
    let flag_id_find = 0;

    //console.log(res.rows, res.rows.length);

    while (flag_id_find != res.rows.length) {
      for (const element of res.rows) {
        if (parseInt(element.device_id) === rndId) {
          flag_id_find = 0;
          rndId = this.getRandomIntInclusive(1000, 0xffff);
          break;
        }

        flag_id_find++;
        //console.log(element.device_id, rndId, flag_id_find);
      }

      if (flag_id_find >= res.rows.length) break;
    }

    return rndId;
  }

  static async addUser(username, userpass) {
    let new_device_id = await this.controlDbDeviceId();
    // console.log("NEW ID :", new_device_id);

    let arrInfos = [new_device_id, username, userpass];
    let query = "INSERT INTO users(device_id, user_name, user_pass) VALUES ($1, $2, $3)"; // id not uses
    let insertedQuery = this.doInsert(query, arrInfos);
    return insertedQuery.then((r, e) => {
      return new_device_id;
    });
  }

  static login(user_id, user_pass) {
    const query = "SELECT * FROM users WHERE user_name='" + user_id + "' AND user_pass='" + user_pass + "'";
    return this.doQuery(query);
  }

  static tempHumidityDataLog(data) {
    /* data: {
        login_user: 'NODE-MCU',
        login_device_id: 62164,
        socket_id: 'AjFbf0SwcRo3ixfTAAAD',
        temperature: 12,
        humidity: 36
      }
    */

    let today = new Date();
    let todayStr = today.toLocaleString();

    let arrData = [data.login_device_id, data.socket_id, data.login_user, data.temperature, data.humidity, todayStr];

    // console.log("DB data :", arrData);

    let query =
      "INSERT INTO temp_humidity_log (device_id, socket_id, user_name, temperature, humidity, date_time)" + "  VALUES ($1, $2, $3, $4, $5, $6)";

    let insertedQuery = this.doInsert(query, arrData);
    return insertedQuery.then((r, e) => {
      if (e) console.log("error :", e);
      else return r;
    });
  }

  static getTempHumidityDataLog() {
    //TO_DATE('2014-01-26 10:00:00', 'YYYY-MM-DD HH24:MI:SS')
    let query = "Select id, temperature, humidity, date_time from temp_humidity_log order by id desc limit 40";
    /*rows: [
      {
        id: 595,
        temperature: '13',
        humidity: '35',
        date_time: 2021-12-23T09:35:17.000Z
      },
    ]*/

    // (id, temperature, humidity, date_time) => (584,13,35,"2021-12-23 12:34:11")
    //let query ="Select * from temp_humidity_log order by id desc limit 100";
    const retValue = this.doQuery(query);
    return retValue;
  }

  static tagDataLog(data) {
    /* data: {
       {
          login_user: 'NODE-MCU',
          login_device_id: 62164,
          socket_id: '5sn4PZ2jvLprcQC-AAAD',
          tag_id: '39 48 D6 E6 EC',
          tag_remain: '161'
       }
      
    */

    let today = new Date();
    let todayStr = today.toLocaleString("tr-TR");

    let arrData = [data.login_device_id, data.socket_id, data.login_user, data.tag_id, data.tag_remain, todayStr];

    //console.log("DB data :", arrData);

    let query = "INSERT INTO tag_data_log (device_id, socket_id, user_name, tag_id, tag_remain, date_time)" + "  VALUES ($1, $2, $3, $4, $5, $6)";

    let insertedQuery = this.doInsert(query, arrData);
    return insertedQuery.then((res, err) => {
      if (err) console.log("error :", err);
      else return res;
    });
  }

  static getTagDataLog() {
    let query = "Select id, user_name, tag_id, tag_remain, date_time from tag_data_log order by id desc limit 10";
    /*rows: [
      {
      },
    ]*/

    // (id, temperature, humidity, date_time) => (584,13,35,"2021-12-23 12:34:11")
    //let query ="Select * from temp_humidity_log order by id desc limit 100";
    const retValue = this.doQuery(query);
    return retValue;
  }

  static testDataLog(data) {
    //must be array,

    /*data: {
      login_user: 'NODE-MCU',
      login_device_id: 62164,
      socket_id: 'I0Pn0_qzwE3bS4m6AAAB',
      sensor_value: 'ON-Object Detected',
      time_stamp: 34833,
      sample_count: 267
    }
  */

    let today = new Date();
    let todayStr = today.toLocaleString("tr-TR");

    let arrData = [data.login_device_id, data.socket_id, data.login_user, data.sensor_value, todayStr, data.time_stamp, data.sample_count];

    let query =
      "INSERT INTO digital_sensor_log(device_id, socket_id, user_name, data_value, date_time, time_stamp, sample_count)" +
      "  VALUES ($1, $2, $3, $4, $5, $6, $7)";

    let insertedQuery = this.doInsert(query, arrData);
    return insertedQuery.then((r, e) => {
      if (e) console.log("error :", e);
      else return r;
    });

    //console.log("DB data :",arrData);
  }

  /**** */
  static addNewList(listInfos) {
    let query = "INSERT INTO listeler(id, kul_id, liste_adi, kategori, tarih, oncelik, aciklama) VALUES (NULL, ?, ?, ?, ?, ?, ?)";
    let insertedQuery = this.doInsert(query, listInfos);
    return insertedQuery.then((r, e) => {
      let idlist = r.insertId;
      return idlist;
    });
  }
}

module.exports = pgSqlDBClass;

