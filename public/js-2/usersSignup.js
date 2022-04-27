// 用户注册
$(function(){
	$("form").bootstrapValidator({
      message: "This value is not valid",
      feedbackIcons: {
        valid: "glyphicon glyphicon-ok",
        invalid: "glyphicon glyphicon-remove",
        validating: "glyphicon glyphicon-refresh"
      },
      fields: {
        phone: {
          message: "手机号验证失败",
          validators: {
            notEmpty: {
              message: "手机号不能为空"
            },
            regexp: {
              regexp: /^[1][3,4,5,7,8,9][0-9]{9}$/,
              message: "手机号格式错误"
            }
          }
        },
        username: {
          validators: {
            notEmpty: {
              message: "昵称不能为空"
            },
            stringLength: {
              min: 3,
              max: 6,
              message: "昵称长度位3-6位"
            }
          }
        },
        password: {
          validators: {
            notEmpty: {
              message: "密码不能为空"
            },
            stringLength: {
              min: 6,
              max: 16,
              message: "密码长度为6-16位"
            },
            regexp: {
              regexp: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,30}$/,
              message: "密码必须包含数字、字母和字符"
            },
            different: {
              field: "phone",
              message: "不能使用用户名作为密码"
            }
          }
        },
        password1: {
          validators: {
            notEmpty: {
              message: "密码不能为空"
            },
            identical: {
              field: "password",
              message: "两次输入的密码不相符"
            },
            different: {
              field: "phone",
              message: "不能使用用户名作为密码"
            }
          }
        },
        
        email: {
          validators: {
            notEmpty: {
              message: "邮箱不能为空"
            },
            emailAddress: {
              message: "邮箱地址格式有误"
            }
          }
        }
      }
    });
	$('#register').on('click',function(){
      var codeTest = $("#code").val();
		 $('form').data('bootstrapValidator').validate();
         if(!$('form').data('bootstrapValidator').isValid()){  
            $.notifyDefaults({
           type: 'danger',
           allow_dismiss: false,
           delay:1000
          });
          $.notify({
           icon: "fa fa-times-rectangle",
           message: " 请按格式输入信息!"
          });

        } else {
           if(codeTest == code && codeTest != ''){  
               submitUser();    
           }else{
            $.notifyDefaults({
           type: 'danger',
           allow_dismiss: false,
           delay:1000
          });
          $.notify({
           icon: "fa fa-times-rectangle",
           message: " 验证码输入不正确!"
           })
        }
	}
})
var code="";
$("#sendbtn").on("click",function(){
  var phone = $("#teleNumber").val();
  if(!phone){
    return
  }
  var i=60;
settime()
  function settime(){
    if(i==0){
      $("#sendbtn").removeAttr("disabled");
      $("#sendbtn").val("点击发送")
      clearTimeout(timer)
    }else{
      $("#sendbtn").attr("disabled",true);
      $("#sendbtn").val(`${i}秒`);
      i--;
       var timer=setTimeout(() => {
          settime()
        }, 1000);
    }
  }

  $.ajax({
    url:"/api/product/yanzheng",
    type:"post",
    data:{
      phone
    },
    success:(result)=>{
        result=JSON.parse(result)
      code=result.data
    
    }
  })
})


function submitUser(){

		const data = {
			telephoneNumber:$("#teleNumber").val(),
			nickName:$("#nickname").val(),
			password:$("#password").val(),
			passwordAgain:$("#againpassword").val(),
			email:$("#email").val()
	     }
	     $.ajax({
			url:'/api/personnel/usersSave',
			type:'POST',
			data,
			success:(result) => {
				// console.log(result);
				if(result.ret){
					$.notifyDefaults({
						type: 'success',
						allow_dismiss: false,
						delay:1000
					});
					$.notify({
						icon: "fa fa-check-square",
						message: " 注册成功,请登录!"
					});
				}else{
					$.notifyDefaults({
						type: 'danger',
						allow_dismiss: false,
						delay:1000
					});
					$.notify({
						icon: "fa fa-times-rectangle",
						message: " 注册失败,请重新注册!"
					});
				}			
				return result;
			}
		})
		
  }
})