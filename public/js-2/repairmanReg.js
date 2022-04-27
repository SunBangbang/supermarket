
$(function () {
    $("#addRepairman").bootstrapValidator({
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
              message: "请输入11位正确手机号"
            }
          }
        },
        repairman_name: {
          validators: {
            notEmpty: {
              message: "用户名不能为空"
            },
            stringLength: {
              min: 3,
              max: 6,
              message: "用户名长度位3-6位"
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
        
        email: {
          validators: {
            notEmpty: {
              message: "邮箱不能为空"
            },
            emailAddress: {
              message: "请输入正确邮箱地址"
            }
          }
        }
      }
    });

});

// 判断是否全部验证通过...


