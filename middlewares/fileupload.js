const multer = require("multer")
const path = require("path")

const fileupload = (req,res,next) =>{
    const storage = multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,path.resolve(__dirname,"../public/uploads"))
        },
        filename: function(req,file,cb){
            let fn = file.originalname;
            let dot = fn.lastIndexOf(".");
            let filename = file.fieldname + "-" +Date.now() +fn.substr(dot)
            req.filename = filename
            cb(null,filename)
        }
    })
// console.log(listimg);

    const upload = multer({ storage: storage }).single("faultimg");
    upload(req,res,function(err){
        if(err){
            return
        }else{
            next()
        }
    })
}

module.exports = {
    fileupload
}