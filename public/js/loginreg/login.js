
$(function () {
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
            regexp: /^[1][3,4,5,7,8][0-9]{9}$/,
            message: "手机号格式错误"
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
          }
        }
      }
    }
  });

  $.ajax({
    // type:"GET",
    url: "/api/product/find",
    type: "GET",
    // dataType: "jsonp",
    success: result => {
      console.log(result);
    },
    err:err=>{
      console.log(err);
      
    }
  });
});
