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
    let res = await this.doQuery(query);                      // res.rows
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

    let arrInfos=[new_device_id,username, userpass];
    let query = "INSERT INTO users(device_id, user_name, user_pass) VALUES ($1, $2, $3)";
    let insertedQuery = this.doInsert(query, arrInfos);
    return insertedQuery.then((r, e ) => {
        return new_device_id;
    });
  }

  static login(user_id, user_pass) {
    const query = "SELECT * FROM users WHERE user_name='" + user_id + "' AND user_pass='" + user_pass + "'";
    return this.doQuery(query);
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
