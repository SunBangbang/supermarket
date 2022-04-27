const proModel = require("../models/product.model")
const moment = require("moment")
const SMSClient = require('./../index')

// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = 'LTAI5SVPGZYdO06a'
const secretAccessKey = 'zyoi8BChVZZr41aQI7m2OSDrfkhQ7L'

//在云通信页面开通相应业务消息后，就能在页面上获得对应的queueName,不用填最后面一段
const queueName = 'Alicom-Queue-1092397003988387-'

//初始化sms_client
let smsClient = new SMSClient({
    accessKeyId,
    secretAccessKey
})
const save = async(req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*", "Content-Type", "application/json;charset = utf8");
    req.body.createTime = moment().format("YYYY-MM-DD HH:mm");

    req.body.faultimg = req.filename;
    console.log(req.body);
    const result = await proModel.save(req.body)

    if(result){
       
        res.render("product",{ret:true,data:JSON.stringify({msg:"succ"})})

    }else{
        res.render("product",{ret:false,data:JSON.stringify({msg:"fail"})})
    }
}


//单个用户查看自己所有订单
const find = async(req,res,next) =>{

    let condition = req.body;
    
    // res.setHeader("Content-Type","application/json;charset=utf8")
    res.setHeader("Access-Control-Allow-Origin", "*", "Content-Type", "application/json;charset=utf8");
    const result = await proModel.find(condition)
    
   
    res.send(result)
}


//单个用户查看某一订单信息
const findifo = async (req, res, next) => {

  let id = req.body;

  // res.setHeader("Content-Type","application/json;charset=utf8")
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*",
    "Content-Type",
    "application/json;charset=utf8"
  );
  const result = await proModel.find(id);

  res.send(result);
};


// 查看全部订单
const findAll = async(req,res,next) =>{

    
    // res.setHeader("Content-Type","application/json;charset=utf8")
    res.setHeader("Access-Control-Allow-Origin", "*", "Content-Type", "application/json;charset=utf8");
    const result = await proModel.find()
    
   
    res.send(result)
}


//维修人员接受任务。在信息上添加维修人名字
const taskupdate = async(req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*", "Content-Type", "application/json;charset=utf8");
    let condition = req.body._id
    let name = req.body.repairname

    
    const result = await proModel.taskupdate(condition,name)    
    res.send(result);
}
const stateupdate = async(req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*", "Content-Type", "application/json;charset=utf8");
    let condition = req.body._id

    const result = await proModel.stateupdate(condition)   
    res.send(result); 
}
const endstateupdate = async(req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*", "Content-Type", "application/json;charset=utf8");
    let condition = req.body._id

    const result = await proModel.endstateupdate(condition)  
    res.send(result);  
}

//用户端删除任务   更改state为3
const userstateupdate = async (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*",
    "Content-Type",
    "application/json;charset=utf8"
  );
  let condition = req.body._id;

  const result = await proModel.userstateupdate(condition);
  res.send(result);
};
//批量删除  修改状态
const tasksremove = async(req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*", "Content-Type", "application/json;charset=utf8");
    const result = await proModel.tasksremove(req.body)
    res.send(result)
}
// const delate = async(req,res,next)=>{
//     res.setHeader("Content-Type", "application/json;charset = utf8");
//     req.body.listimg = req.filename
//     const res = await proModel.delate(req.body)
// }



//挂单！！！

const giveup = async(req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*", "Content-Type", "application/json;charset=utf8");
    let id = req.body._id
    let content = req.body.content
    const result = await proModel.giveup(id,content)
    res.send(result)
}

const yanzheng = async(req,res,next) =>{
    res.setHeader("Access-Control-Allow-Origin", "*", "Content-Type", "application/json;charset=utf8");
    let phone = req.body.phone;
    let num = Math.random().toFixed(4) * 40000 + 10000;
    let flag = false;
    await smsClient.sendSMS({
        PhoneNumbers: `${phone}`,
        SignName: '朱如意',
        TemplateCode: 'SMS_139231806',
        TemplateParam: `{"code":"${num}"}`
    }).then(function (res) {
        let {
            Code
        } = res
        if (Code === 'OK') {
            //处理返回参数
            flag=true
        }
    }, function (err) {
        console.log(err)
    })
    if(flag){
        res.render("product",{ret:true,data:JSON.stringify(`${num}`)})
    }
}

module.exports = {
  save,
  find,
  findAll,
  findifo,
  taskupdate,
  stateupdate,
  endstateupdate,
  userstateupdate,
  tasksremove,
  giveup,
  yanzheng

};