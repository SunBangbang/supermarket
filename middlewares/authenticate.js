const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");

module.exports = (req, res, next) => {
  // 指定允许其他域名访问
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*",
    "Content-Type",
    "application/json;charset = utf8"
  );

  let token = req.body.token;
  let cert = fs.readFileSync(path.resolve(__dirname, "../keys/public.key")); // get public key
  jwt.verify(token, cert, function(err, decoded) {
    if (err) {
      res.render("signOut", {
        signOut: true,
        ret: false,
        data: JSON.stringify("用户认证失败！")
      });
    } else {
      // console.log(decoded);
      // if()
      req.loginUser =
        decoded.nickName || decoded.repairmanName || decoded.adminName;
      req.tel =
        decoded.telephoneNumber || decoded.repairmanTele || decoded.adminTele;
      
      next();
    }
  });
};
