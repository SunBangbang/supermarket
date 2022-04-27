const db = require("../utils/mongo.util");

// 用户集合
const UsersSchema = db.Schema({
  telephoneNumber: { type: String, required: true },
  nickName: { type: String, required: true },
  password: { type: String, required: true },
  hyjf: { type: String, required: true },
  cz: {type: String, required: true},
  email: { type: String, required: false },
  createTime: { type: String, required: false }
});
// 收银员集合
const RepairmanSchema = db.Schema({
  repairmanName: { type: String, required: true },
  password: { type: String, required: true },
  repairmanTele: { type: String, required: true },
  email: { type: String, required: false },
  createTime: { type: String, required: false },
  sex: {type: String, required: true},
  age: {type: String, required: true}
});
// 管理员集合
const AdminSchema = db.Schema({
  adminName: { type: String, required: true },
  adminTele: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: false },
  createTime: { type: String, required: false }
});

// 品牌类型
const BrandtypeSchema = db.Schema({
  brandName: { type: String, required: true },
  createTime: { type: String, required: false }
});

// 故障类型
const FaulttypeSchema = db.Schema({
  faultName: { type: String, required: true },
  createTime: { type: String, required: false }
});

// 备件管理
const SparepartSchema = db.Schema({
  sparepartName: { type: String, required: true },
  sparepartType: { type: String, required: true },
  createTime: { type: String, required: false }
});

// 用户的存储与显示与删除;
const User = db.model("Users", UsersSchema, "Users");
const usersSave = data => {
  let pos_user = new User(data);
  return pos_user
    .save()
    .then(result => {
      return result;
    })
    .catch(err => {
      return false;
    });
};
const usersFind = () => {
  return User.find({}).then(result => result);
};
const usersFindOne = option => {
  return User.findOne(option).then(result => result);
};
const usersFindById = id => {
  return User.findById(id).then(result => result);
};
const usersRemove = id => {
  return User.findByIdAndRemove(id) //返回为promise形式
    .then(result => {
      console.log(result);
      return result;
    });
};
const usersUpdate = (data, id) => {
  return User.findByIdAndUpdate(id, data)
    .then(result => result)
    .catch(err => err.msg);
};

// 维修人员的存储与显示
const Repairman = db.model("Repairmen", RepairmanSchema, "Repairmen");
const repairmanSave = data => {
  let pos_repair = new Repairman(data);
  return pos_repair
    .save()
    .then(result => {
      return result;
    })
    .catch(err => {
      return false;
    });
};
const repairmanFind = () => {
  return Repairman.find({}).then(result => result);
};
const repairmanFindOne = option => {
  return Repairman.findOne(option).then(result => result);
};
const repairmanRemove = id => {
  return Repairman.findByIdAndRemove(id) //返回为promise形式
    .then(result => {
      console.log(result);
      return result;
    });
};
const repairmanFindById = id => {
  return Repairman.findById(id).then(result => result);
};

const repairmanUpdate = (data, id) => {
  return Repairman.findByIdAndUpdate(id, data)
    .then(result => result)
    .catch(err => err.msg);
};

// 管理人员的存储
const Admin = db.model("Admins", AdminSchema, "Admins");
const adminSave = data => {
  let pos_admin = new Admin(data);
  return pos_admin
    .save()
    .then(result => {
      return result;
    })
    .catch(err => {
      return false;
    });
};
const adminFindOne = option => {
  return Admin.findOne(option).then(result => result);
};
const adminFind = () => {
  return Admin.find().then(result => result);
};

// 品牌类型存储与显示
const Brandtype = db.model("Brandtypes", BrandtypeSchema);
const brandSave = data => {
  let pos_brand = new Brandtype(data);
  return pos_brand
    .save()
    .then(result => {
      return result;
    })
    .catch(err => {
      return false;
    });
};
const brandFind = () => {
  return Brandtype.find({}).then(result => result);
};
const brandFindOne = option => {
  return Brandtype.findOne(option).then(result => result);
};
const brandRemove = id => {
  return Brandtype.findByIdAndRemove(id) //返回为promise形式
    .then(result => {
      console.log(result);
      return result;
    });
};

// 产品类型存储与显示
const Faulttype = db.model("Faulttypes", FaulttypeSchema);
const faultSave = data => {
  let pos_fault = new Faulttype(data);
  return pos_fault
    .save()
    .then(result => {
      return result;
    })
    .catch(err => {
      return false;
    });
};
const faultFind = () => {
  return Faulttype.find({}).then(result => result);
};
const faultFindOne = option => {
  return Faulttype.findOne(option).then(result => result);
};
const faultRemove = id => {
  return Faulttype.findByIdAndRemove(id) //返回为promise形式
    .then(result => {
      console.log(result);
      return result;
    });
};

// 备件管理存储与显示
const Sparepart = db.model("Spareparts", SparepartSchema);
const sparepartSave = data => {
  let pos_spare = new Sparepart(data);
  return pos_spare
    .save()
    .then(result => {
      return result;
    })
    .catch(err => {
      return false;
    });
};
const sparepartFind = () => {
  return Sparepart.find({}).then(result => result);
};
const spareFindOne = option => {
  return Sparepart.findOne(option).then(result => result);
};
const spareRemove = id => {
  return Sparepart.findByIdAndRemove(id) //返回为promise形式
    .then(result => {
      console.log(result);
      return result;
    });
};

module.exports = {
  usersSave,
  usersFind,
  usersRemove,
  usersUpdate,
  usersFindOne,
  usersFindById,
  repairmanSave,
  repairmanFind,
  repairmanRemove,
  repairmanFindById,
  repairmanUpdate,
  repairmanFindOne,
  adminFindOne,
  adminSave,
  adminFind,
  brandSave,
  brandRemove,
  brandFind,
  brandFindOne,
  faultSave,
  faultFind,
  faultRemove,
  faultFindOne,
  sparepartSave,
  sparepartFind,
  spareFindOne,
  spareRemove
};
