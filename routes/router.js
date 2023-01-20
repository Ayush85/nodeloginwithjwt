const express = require("express");
const router = express.Router();
// controller path
const controller = require("../controller/controller");

router.get("/home", controller.home);

// signup routes
router.post("/signup", controller.signup);

// login routes
router.post("/login", controller.login);

//course routes
router.get("/tutorial", requiredtoken, controller.tutorial);

// requiredtoken
function requiredtoken(req, res, next) {
  let headers = req.headers.authorization;
  if (typeof headers !== undefined && headers !== "") {
    hd = headers.split(" ")
    token = hd[1]
    req.token = token;
    next();
  } else {
    res.send({
      status: false,
      msg: "token required ...",
    });
  }
}

module.exports = router;