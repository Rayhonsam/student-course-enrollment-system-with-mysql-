const express = require("express")
const app = express()
const mysql = require("mysql")
const bodyparser = require("body-parser")
const cors = require("cors")
const fs = require("fs")
const { request } = require("http")

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root1234",
  database: "dbms",
})
var slot = "";
var wslot = "";
const arr = []
app.use(cors())
app.use(express.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.post("/api/insert", (req, res) => {
  var name = req.body.name;
  var mail = req.body.mail;
  var dept = req.body.dept;
  var reg = req.body.reg;
  console.log(name, reg, dept, mail);

  // Check if email already exists
  var checkEmailQuery = "SELECT * FROM studdet WHERE mail = ?";
  db.query(checkEmailQuery, [mail], (err, rows) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }

    if (rows.length > 0) {
      // Email already exists, handle the error or send a response accordingly
      console.log("Email already exists");
      return res.status(200).send("Email already exists");
    }

    // Email doesn't exist, proceed with the insertion
    var insertQuery = "INSERT INTO studdet(name,mail,dept,reg) VALUES (?, ?, ?, ?)";
    db.query(insertQuery, [name, mail, dept, reg], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
      }
      console.log(result);
      res.status(200).send("successfully regsitered");
    });
  });
});


app.get("/api/login", (req, res) => {
  var name = req.query.name;
  var mail = req.query.mail;
  console.log(name, mail)
  var sql = "select * from studdet where name=? and mail=?";
  db.query(sql, [name, mail], (err, result) => {
    if (!err) {
      res.send(result);
    }
    else {
      console.log(err);
    }
  })
})
app.get("/api/get", (req, res) => {
  var sql = "select * from studdet";
  db.query(sql, (err, result) => {
    if (!err) {
      console.log("get:", result);
      return res.send(result);
    }
    else {
      console.log(err);
    }
  })
})

checkStatus = (slot, mail, sub) => {
  return new Promise(async (resolve, reject) => {
    var sql = `SELECT ${sub} FROM studdet WHERE mail = ?`;
    db.query(sql, [mail], (err, result) => {
      if (err) {
        console.log(err);
        return reject("Internal Server Error");
      }

      console.log("b:", result);
      const obj = result[0];
      let result1 = "";
      if (sub === "info_sec") {
        result1 = obj.info_sec;
      } else {
        result1 = obj.web_tech;
      }
      console.log("sub:", result1, "slot:", slot);
      if (result1 !== "" && slot !== result1) {
        console.log("Already enrolled in slot ", result);
        return resolve("Already enrolled!");
      } else if (result1 === null) {
        console.log("web_tech");
        if (sub === "info_sec") {
          var sql = "SELECT web_tech FROM studdet WHERE mail = ?";
          db.query(sql, [mail], (err, result) => {
            if (err) {
              console.log(err);
              return reject("Internal Server Error");
            }

            console.log("b:", result);
            const obj = result[0];
            const result1 = obj.web_tech;
            if (slot !== result1 && result1 !== null) {
              return resolve(`Time conflict in ${result}`);
            } else {
              var sql = `UPDATE studdet SET ${sub} = ? WHERE mail = ?`;
              db.query(sql, [slot, mail], (err, result) => {
                if (err) {
                  console.log(err);
                  return reject("Internal Server Error");
                }

                return resolve("Successfully enrolled");
              });
            }
          });
        } else if (sub === "web_tech") {
          var sql = "SELECT info_sec FROM studdet WHERE mail = ?";
          db.query(sql, [mail], (err, result) => {
            if (err) {
              console.log(err);
              return reject("Internal Server Error");
            }

            console.log("b:", result);
            const obj = result[0];
            const result1 = obj.info_sec;
            if (slot !== result1 && result1 !== null) {
              return resolve(`Time conflict in ${result}`);
            } else {
              var sql = `UPDATE studdet SET ${sub} = ? WHERE mail = ?`;
              db.query(sql, [slot, mail], (err, result) => {
                if (err) {
                  console.log(err);
                  return reject("Internal Server Error");
                }

                return resolve("Successfully enrolled");
              });
            }
          });
        }
      }
    });
  });
};


app.get("/api/slot", async (req, res) => {
  if (req.query.sub == "info_sec" || req.query.sub == "web_tech" || req.query.sub == "data_mining") {
    console.log(req.query.slot, req.query.mail, req.query.sub);
    await checkStatus(req.query.slot, req.query.mail, req.query.sub).then(output => {
      console.log(output);
      return res.send("already enrolled")
    });
  }

})

app.get("/api/update", (req, res) => {
  console.log("update");
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  // Check if the column already exists
  const checkColumnSql = `SHOW COLUMNS FROM studatt LIKE '${formattedDate}'`;
  db.query(checkColumnSql, [], (checkColumnErr, checkColumnResult) => {
    if (checkColumnErr) {
      console.log(checkColumnErr);
      res.send(checkColumnErr);
    } else {
      console.log("res");
      if (checkColumnResult.length > 0) {
        const list = req.query.list;
        for (let i = 0; i < list.length; i++) {
          const obj = list[i];
          const reg = obj.regno;
          const attendance = obj.attendance;
          console.log(attendance);
          var rest;
          if(attendance===true)
          {
            rest="present";
          }
          else
          {
             rest="absent";
          }
          console.log("name:",reg,"attendance:",rest);
          const updateSql = `UPDATE studatt SET \`${formattedDate}\` = ? WHERE reg = ?`;
          db.query(updateSql, [rest, reg], (updateErr, updateResult) => {
            if (updateErr) {
              console.log(updateErr);
            } else {
              console.log(`Updated ${updateResult}`);
            }
          });
        }
        res.send("Successfully updated");
      } else {
        // Column does not exist, add it
        const addColumnSql = `ALTER TABLE studatt ADD COLUMN \`${formattedDate}\` VARCHAR(20)`;
        db.query(addColumnSql, [], (addColumnErr, addColumnResult) => {
          if (addColumnErr) {
            console.log(addColumnErr);
            res.send(addColumnErr);
          } else {
            const list = req.query.list;
            for (let i = 0; i <= list.length; i++) {
              const obj = list[i];
              const reg = obj.regno;
              const attendance = obj.attendance;
              const rest = attendance ? "present" : "absent";
              const updateSql = `UPDATE studatt SET \`${formattedDate}\` = ? WHERE reg = ?`;
              db.query(updateSql, [rest, reg], (updateErr, updateResult) => {
                if (updateErr) {
                  console.log(updateErr);
                } else {
                  console.log(`Updated1 ${updateResult}`);
                }
              });
            }
            res.send("Successfully updated1");
          }
        });
      }
    }
  });
});

app.get("/api/attendance", (req, res) => {
  var mail = req.query.mail;
  var sql = "select * from studatt where mail=?";
  db.query(sql, [mail], (err, result) => {
    if (err) {
      res.send("error in fetching")
    }
    else {
      console.log("re:");
      console.log(result);
      res.send(result);
    }
  })
})

app.listen(3002, () => {
  console.log("listen on 3002")
})