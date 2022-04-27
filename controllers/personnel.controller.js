const personnelModel = require("../models/personnel.model");
const moment = require("moment");
const toolsUtil = require("../utils/user.util");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path");

// 判断是否登录;
const isSignin = (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*",
    "Content-Type",
    "application/json;charset = utf8"
  );
  // 三种用户登录的payload不同;
  let loginUser = req.loginUser;
  let tel = req.tel
  // console.log(loginUser);
  res.render("user", {
    ret: true,
    data: JSON.stringify({ loginUser,tel })
  });
};
const usersSave = async (req, res, next) => {
  //注册
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*",
    "Content-Type",
    "application/json;charset = utf8"
  );
  res.setHeader("Content-Type", "application/json; charset=utf8");
  req.body.createTime = moment().format("YYYY-MM-DD HH:mm");
  let { telephoneNumber, password } = req.body;
  let result = await personnelModel.usersFindOne({ telephoneNumber });
  // console.log(result); //===>null
  if (result) {
    res.render("user", {
      issign: false,
      ret: false,
      data: JSON.stringify("该用户已存在!")
    });
  } else {
    // console.log(password);
    req.body.password = await toolsUtil.crypt(password);
    let result = await personnelModel.usersSave(req.body);
    // console.log(result);
    let data = result
      ? { issign: true, ret: true, data: JSON.stringify("注册成功") }
      : {
          issign: false,
          ret: false,
          data: JSON.stringify("注册失败，请重新注册")
        };
    res.render("user", data);
  }
};
const usersSignin = async (req, res, next) => {
  //登录
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*",
    "Content-Type",
    "application/json;charset = utf8"
  );
  let { telephoneNumber, password } = req.body;
  let result = await personnelModel.usersFindOne({ telephoneNumber });
  // 要对密码解密:
  console.log(result);
  console.log(password);
  if (result) {
    let compareResult = await toolsUtil.compare({
      hash_password: result.password,
      password
    });
    if (result.password == password) {
      let telephoneNumber = result.telephoneNumber;
      let nickName = result.nickName;
      // 进行token操作
      let token = genToken({ telephoneNumber,nickName });
      res.render("user", {
        issign: true,
        ret: true,
        data: JSON.stringify({
          telephoneNumber,
          token
        })
      });
    } else {
      res.render("user", {
        issign: false,
        ret: false,
        data: JSON.stringify("密码错误")
      });
    }
  } else {
    res.render("user", {
      issign: false,
      ret: false,
      data: JSON.stringify("用户名错误")
    });
  }
};

const usersFind = async (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*",
    "Content-Type",
    "application/json;charset = utf8"
  );
  const result = await personnelModel.usersFind();
  res.send(result);
};
const usersFindById = async (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*",
    "Content-Type",
    "application/json;charset = utf8"
  );
  let id = req.body.id;
  const result = await personnelModel.usersFindById(id);
  res.send(result);
};

const usersRemove = async (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*",
    "Content-Type",
    "application/json;charset = utf8"
  );

  const { id } = req.body;
  // console.log(req.body);
  const result = await personnelModel.usersRemove(id);
  res.send({ ret: true, data: result });
};

const usersUpdate = async (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*",
    "Content-Type",
    "application/json;charset = utf8"
  );
  req.body.createTime = moment().format("YYYY-MM-DD HH:mm");
  let { password, id } = req.body;
  let hash_password = await toolsUtil.crypt(password);
  req.body.password = hash_password;
  const result = await personnelModel.usersUpdate(req.body, id);
  if (result) {
    res.render("personnel", {
      ret: true,
      data: JSON.stringify({ msg: "succ" })
    });
  } else {
    res.render("personnel", {
      ret: false,
      data: JSON.stringify({ msg: "fail" })
    });
  }
};
const repairmanSave = async (req, res, next) => {
  //注册
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*",
    "Content-Type",
    "application/json;charset = utf8"
  );
  req.body.createTime = moment().format("YYYY-MM-DD HH:mm");
  let { repairmanTele, password } = req.body;
  let result = await personnelModel.repairmanFindOne({ repairmanTele });
  // console.log(result); //===>null
  if (result) {
    res.render("user", {
      ret: false,
      data: JSON.stringify("该维修人员已存在!")
    });
  } else {
    // console.log(password);
    req.body.password = await toolsUtil.crypt(password);
    let result = await personnelModel.repairmanSave(req.body);
    // console.log(result);
    let data = result
      ? { ret: true, data: JSON.stringify("添加成功") }
      : { ret: false, data: JSON.stringify("添加失败，请重新添加") };
    res.render("user", data);
  }
};

const repairmanSignin = async (req, res, next) => {
  //登录
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*",
    "Content-Type",
    "application/json;charset = utf8"
  );
  let { repairmanTele, password } = req.body;
  let result = await personnelModel.repairmanFindOne({ repairmanTele });
  // 要对密码解密:
  console.log(result);
  console.log(password);
  if (result) {
    let compareResult = await toolsUtil.compare({
      hash_password: result.password,
      password
    });
    if (result.password == password) {
      let repairmanTele = result.repairmanTele;
      let repairmanName = result.repairmanName;
      // 进行token操作
      let token = genToken({ repairmanTele, repairmanName});
      res.render("user", {
        ret: true,
        data: JSON.stringify({
          repairmanTele,
          token
        })
      });
    } else {
      res.render("user", {
        ret: false,
        data: JSON.stringify("密码错误")
      });
    }
  } else {
    res.render("user", {
      ret: false,
      data: JSON.stringify("用户名错误")
    });
  }
};

const repairmanFind = async (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*",
    "Content-Type",
    "application/json;charset = utf8"
  );
  const result = await personnelModel.repairmanFind();
  res.send(result);
};
const repairmanFindById = async (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*",
    "Content-Type",
    "application/json;charset = utf8"
  );
  let id = req.body.id;
  const result = await personnelModel.repairmanFindById(id);
  res.send(result);
};
const repairmanRemove = async (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*",
    "Content-Type",
    "application/json;charset = utf8"
  );

  const { id } = req.body;
  console.log(req.body);
  const result = await personnelModel.repairmanRemove(id);
  res.send({ ret: true, data: result });
};

const repairmanUpdate = async (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*",
    "Content-Type",
    "application/json;charset = utf8"
  );
  req.body.createTime = moment().format("YYYY-MM-DD HH:mm");
  let { password, id } = req.body;
  let hash_password = await toolsUtil.crypt(password);
  req.body.password = hash_password;
  console.log(req.body);
  const result = await personnelModel.repairmanUpdate(req.body, id);
  if (result) {
    res.render("personnel", {
      ret: true,
      data: JSON.stringify({ msg: "succ" })
    });
  } else {
    res.render("personnel", {
      ret: false,
      data: JSON.stringify({ msg: "fail" })
    });
  }
};

// 管理员
const adminSave = async (req, res, next) => {
  //注册
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*",
    "Content-Type",
    "application/json;charset = utf8"
  );
  req.body.createTime = moment().format("YYYY-MM-DD HH:mm");
  let { adminTele, password } = req.body;
  let result = await personnelModel.adminFindOne({ adminTele });
  // let result = await personnelModel.test({ adminName });
  console.log(result); //===>null
  if (result) {
    res.render("user", {
      ret: false,
      data: JSON.stringify("该管理员已存在!")
    });
  } else {
    // console.log(password);
    req.body.password = await toolsUtil.crypt(password);
    let result = await personnelModel.adminSave(req.body);
    console.log(req.body);
    let data = result
      ? { ret: true, data: JSON.stringify("添加成功") }
      : { ret: false, data: JSON.stringify("添加失败，请重新添加") };
    res.render("user", data);
  }
};

const adminFind = async (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*",
    "Content-Type",
    "application/json;charset = utf8"
  );
  const result = await personnelModel.adminFind();
  res.send(result);
};

const adminSignin = async (req, res, next) => {
  //登录
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*",
    "Content-Type",
    "application/json;charset = utf8"
  );
  let { adminTele, password } = req.body;
  let result = await personnelModel.adminFindOne({ adminTele });
  // 要对密码解密:
  console.log(result);
  // console.log(password);
  if (result) {
    let compareResult = await toolsUtil.compare({
      hash_password: result.password,
      password
    });
    if (password == result.password) {
      let adminTele = result.adminTele;
     let adminName = result.adminName;
      // 进行token操作
      let token = genToken({ adminTele,adminName});
      res.render("user", {
        ret: true,
        data: JSON.stringify({
          adminTele,
          token
        })
      });
    } else {
      res.render("user", {
        ret: false,
        data: JSON.stringify("密码错误")
      });
    }
  } else {
    res.render("user", {
      ret: false,
      data: JSON.stringify("用户名错误")
    });
  }
};

// 品牌类型
const brandSave = async (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*",
    "Content-Type",
    "application/json;charset = utf8"
  );
  req.body.createTime = moment().format("YYYY-MM-DD HH:mm");
  const { brandName } = req.body;

  const isExit = await personnelModel.brandFindOne({ brandName });
  console.log(brandName);
  if (isExit) {
    //不为空，表示存在
    // console.log("exit");
    res.render("personnel", {
      ret: false,
      data: JSON.stringify({ msg: "该品牌已存在" })
    });
  } else {
    console.log("bu exit");
    const result = await personnelModel.brandSave(req.body);
    if (result) {
      res.render("personnel", {
        ret: true,
        data: JSON.stringify({ msg: "添加品牌成功" })
      });
    } else {
      res.render("personnel", {
        ret: false,
        data: JSON.stringify({ msg: "添加品牌失败" })
      });
    }
  }
};
const brandFind = async (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*",
    "Content-Type",
    "application/json;charset = utf8"
  );
  const result = await personnelModel.brandFind();
  res.send(result);
};
const brandRemove = async (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*",
    "Content-Type",
    "application/json;charset = utf8"
  );

  const { id } = req.body;
  const result = await personnelModel.brandRemove(id);
  if (result) {
    res.send({ ret: true, data: result });
  } else {
    res.send({ ret: false, data: "fail" });
  }
};
// 故障类型
const faultSave = async (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*",
    "Content-Type",
    "application/json;charset = utf8"
  );
  req.body.createTime = moment().format("YYYY-MM-DD HH:mm");
  const { faultName } = req.body;
  const isExit = await personnelModel.faultFindOne({ faultName });
  if (isExit) {
    //不为空，表示存在
    // console.log("exit");
    res.render("personnel", {
      ret: false,
      data: JSON.stringify({ msg: "该商品类型已存在" })
    });
  } else {
    // console.log("bu exit");
    const result = await personnelModel.faultSave(req.body);
    if (result) {
      res.render("personnel", {
        ret: true,
        data: JSON.stringify({ msg: "添加商品类型成功" })
      });
    } else {
      res.render("personnel", {
        ret: false,
        data: JSON.stringify({ msg: "添加商品类型失败" })
      });
    }
  }
};

const faultFind = async (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*",
    "Content-Type",
    "application/json;charset = utf8"
  );
  const result = await personnelModel.faultFind();
  res.send(result);
};

const faultRemove = async (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*",
    "Content-Type",
    "application/json;charset = utf8"
  );

  const { id } = req.body;
  const result = await personnelModel.faultRemove(id);
  if (result) {
    res.send({ ret: true, data: result });
  } else {
    res.send({ ret: false, data: "fail" });
  }
};

// 备件管理
const sparepartSave = async (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*",
    "Content-Type",
    "application/json;charset = utf8"
  );
  req.body.createTime = moment().format("YYYY-MM-DD HH:mm");
  const { sparepartName } = req.body;
  const isExit = await personnelModel.spareFindOne({ sparepartName });
  if (isExit) {
    //不为空，表示存在
    // console.log("exit");
    res.render("personnel", {
      ret: false,
      data: JSON.stringify({ msg: "该备件已存在" })
    });
  } else {
    // console.log("bu exit");
    const result = await personnelModel.sparepartSave(req.body);
    if (result) {
      res.render("personnel", {
        ret: true,
        data: JSON.stringify({ msg: "添加备件成功" })
      });
    } else {
      res.render("personnel", {
        ret: false,
        data: JSON.stringify({ msg: "添加备件失败" })
      });
    }
  }
};

const sparepartFind = async (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*",
    "Content-Type",
    "application/json;charset = utf8"
  );

  const result = await personnelModel.sparepartFind();
  res.send(result);
};

function genToken(payload) {
  var cert = fs.readFileSync(path.resolve(__dirname, "../keys/private.key"));
  const token = jwt.sign(payload, cert, {
    algorithm: "RS256",
    expiresIn: "24h"
  });
  return token;
}
const spareRemove = async (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*",
    "Content-Type",
    "application/json;charset = utf8"
  );

  const { id } = req.body;
  const result = await personnelModel.spareRemove(id);
  if (result) {
    res.send({ ret: true, data: result });
  } else {
    res.send({ ret: false, data: "fail" });
  }
};

module.exports = {
  isSignin,
  usersSave,
  usersFind,
  usersRemove,
  usersUpdate,
  usersFindById,
  usersSignin,
  repairmanSave,
  repairmanFind,
  repairmanRemove,
  repairmanFindById,
  repairmanUpdate,
  repairmanSignin,
  adminSave,
  adminFind,
  adminSignin,
  brandSave,
  brandFind,
  brandRemove,
  faultSave,
  faultFind,
  faultRemove,
  sparepartSave,
  sparepartFind,
  spareRemove
};
