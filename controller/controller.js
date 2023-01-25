const db = require("../dbconn");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.home = (req, res) => {
  res.send("api working here ...");
};

// signup
module.exports.signup = async (req, res) => {
  console.log(req.body, "data##");
  const name = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  // first check email id already exit
  let emailcheckqry = `select email from users where email = '${email}' `;
  db.query(emailcheckqry, async (err, result) => {
    if (err) throw err;
    // check email id already exits
    if (result.length > 0) {
      res.send({
        status: false,
        msg: "email id already exits",
      });
    } else {
      // password decrypt
      decryptpwd = await bcrypt.hash(password, 10);
      // insert data
      let insertqry = `insert into users(username,email,password) values('${name}','${email}','${decryptpwd}') `;
      db.query(insertqry, (err, result) => {
        if (err) throw err;
        res.send({
          status: true,
          msg: "user register successful",
        });
      });
    }
  });
};

// login

module.exports.login = (req, res) => {
  console.log(req.body, "login");
  let email = req.body.email;
  let password = req.body.password;

  // checkemailid
  let checkemailid = `select * from users where email = '${email}'`;
  db.query(checkemailid, async (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      let data = {
        name: result[0].name,
        email: result[0].email,
      };
      //    check password
      let checkpwd = await bcrypt.compare(password, result[0].password);
      console.log(checkpwd, "checkpwd##");
      if (checkpwd === true) {
        const token = jwt.sign({ data }, "privatkey");
        console.log(token, "token##");
        res.send({
          status: true,
          token: token,
          result: data,
          msg: "user login successful",
        });
      } else {
        res.send({
          status: false,
          msg: "invalid user",
        });
      }
    } else {
      res.send({
        status: false,
        msg: "invalid email id",
      });
    }
  });
};
module.exports.loging = (req, res) => {
  const email = req.user.email;
  const name = req.user.displayName;
  let data = {
    name: name,
    email: email,
  };
      let emailcheckqry = `select email from users where email = '${email}' `;
      db.query(emailcheckqry, async (err, result) => {
        if (err) throw err;
        // check email id already exits
        if (result.length == 0) {
          // // password decrypt
          // decryptpwd = await bcrypt.hash(password, 10);
          // // insert data
          let insertqry = `insert into users(username,email,password) values('${name}','${email}','') `;
          db.query(insertqry, (err, result) => {
            if (err) throw err;
            console.log("user register successful")
          });
        }
      });
        const token = jwt.sign({ data }, "privatkey");
        console.log(token, "token##", data);
        res.send({
          status: true,
          token: token,
          result: data,
          msg: "user login successful",
        });
      
};
 module.exports.test = (req,res) => {
  let data = {
    name: req.name,
    email: req.email,
  };
  console.log(dats)
 }


// course

module.exports.tutorial = (req, res) => {
  // check verifyToken
  let checkToken = verifyToken(req.token);

  if (checkToken.status == true) {
        res.send({
          status: true,
          data: "result"});

  } else {
    res.send({
      status: false,
      msg: "token invalid",
    });
  }
};

//verifytokens
function verifyToken(token) {
  return jwt.verify(token, "privatkey", (err, result) => {
    if (err) {
      return ({ status: false });
    } else {
     return ({ status: true });
    }
  });
}