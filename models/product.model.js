const db = require("../utils/mongo.util");
const moment = require("moment");
const ProductSchema = new db.Schema({
  brand: { type: String, required: false },
  faulttype: { type: String, required: false },
  describle: { type: String, required: false },
  repairman: { type: String, required: false },
  address: { type: String, required: false },
  phone: { type: String, required: false },
  faultimg: { type: String, required: false },
  state: { type: String, required: false },
  createTime: { type: String, require: false },
  repairname: { type: String, require: false },
  ret: { type: String, require: false },
  createTime: { type: String, require: false },
  endTime: { type: String, require: false },
  remark: { type: String, require: false }
});


const Product = db.model("tasks",ProductSchema)

const save=(data) =>{
    console.log(1,data);
    //let pro = new Product(data)
    return Product(data).save().then((result) =>{
        console.log(result)
        return result
    }).catch((err)=>{
        return false
    })
}



const find = condition => {
  return Product.find(condition).then(result => result);
};
const findifo = id=> {
  return Product.find(id).then(result => result);
};

const findAll= repairman => {
  return Product.find({}).then(result => result);
};

//修改任务状态{根据id查询指定数据，并修改}
const  taskupdate = (condition,name) =>{
    return Product.update({_id:condition}, { state: 0,ret:1,repairname:name }, { multi: false ,overwrite:false},(err,docs)=>{
        if(err){
            console.log(err);
            
        }else{
             console.log("更改成功：" + docs);
        }
    });
}


//修改状态为进行中
const  stateupdate = (condition) =>{
    return Product.update({_id:condition}, { state: 1,ret:1}, { multi: false ,overwrite:false},(err,docs)=>{
        if(err){
            console.log(err);
            
        }else{
             console.log("更改成功：" + docs);
        }
    });
}


//修改状态为已完成
const  endstateupdate = (condition) =>{
    return Product.update({_id:condition}, { state: 2,ret:1,endTime:moment().format("YYYY-MM-DD HH:mm")}, { multi: false ,overwrite:false},(err,docs)=>{
        if(err){
            console.log(err);
            
        }else{
             console.log("更改成功：" + docs);
        }
    });
}


//用户端删除任务   更改state为3
const  userstateupdate = (condition) =>{
    return Product.update({_id:condition}, { state: 3}, { multi: false ,overwrite:false},(err,docs)=>{
        if(err){
            console.log(err);
            
        }else{
             console.log("更改成功：" + docs);
        }
    });
}
//批量删除修改状态
const tasksremove = (res)=>{
    return Product.updateMany({_id:{$in:res.id}},{state:3},{multi:false,overwrite:false},(err,docs)=>{
        if(err){
            console.log(err);
            
        }else{
            console.log("更改成功："+docs);
            
        }
    })
}

//挂单  state改为2（已完成），切加备注

const giveup = (id,content) =>{
    return Product.update({_id:id},{state:2,remark:content,endTime:moment().format("YYYY-MM-DD HH:mm")},{multi:false,overwrite:false},(err,docs)=>{
        if(err){
            console.log(err);
            
        }else{
            console.log("挂单成功："+docs);
            
        }
    })
}


module.exports = {
    save,
    find,
    findAll,
    findifo,
    taskupdate,
    stateupdate,
    tasksremove,
    endstateupdate,
    userstateupdate,
    giveup
}