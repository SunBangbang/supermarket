// 跳转到该界面后，先清空本地token;再点击登录;
localStorage.removeItem('token');

// 登录页面
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
      password: {
        validators: {
          notEmpty: {
            message: "密码不能为空"
          }
        }
      }
    }
  });
var code;
   function createCode() {
   	code = " "
   	var codeLength = 4; //验证码的长度
   	var checkCode = document.getElementById("checkCode");
   	var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
   		'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
   		'v', 'w', 'x', 'y', 'z',
   		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
   		'V', 'W', 'X', 'Y', 'Z'); //所有候选组成验证码的字符，当然也可以用中文的
   	for (var i = 0; i < codeLength; i++) {
   		var charNum = Math.floor(Math.random() * 52);
   		code += codeChars[charNum];
   	}
   	if (checkCode) {
   		checkCode.className = "code";
   		checkCode.innerHTML = code;
   	}
   }
	$('#sginIn').on('click',function(){
					
		var codeInput = $('#code').val();
		
		 $('form').data('bootstrapValidator').validate();
         if(!$('form').data('bootstrapValidator').isValid()){
         $.notifyDefaults({
						type: 'danger',
						allow_dismiss: false,
						delay:500,

					});
					$.notify({
						icon: 'fa fa-times-rectangle',
						message: '格式不正确,请重新登录！',
					});  
        } else {
           if (codeInput.toUpperCase() != code.toUpperCase()) {
						 	 $.notifyDefaults({
						 	 	type: 'danger',
						 	 	allow_dismiss: false,
						 	 	delay: 500,

						 	 });
						 	 $.notify({
						 	 	icon: 'fa fa-times-rectangle',
						 	 	message: '验证码输入不正确，请重新输入！',
						 	 });
           		 
           }else{
           logIn();
	           }
        }
	})

function logIn(){
		var wsCache = new Storage;
		var roleUrl,data,role;
		var checkIndex=$("#roleChoose ").get(0).selectedIndex;
		switch(checkIndex)
			{
			case 1:
			  roleUrl = 'repairmanSignin';
			  role = 2;
			  data={
			  	repairmanTele:$("#userTele").val(),
			  	password:$("#password").val()
			  }
			  break;
			case 2:
			  roleUrl = 'adminSignin';
			  role =3;
			  data = {
			  	adminTele:$("#userTele").val(),
			  	password:$("#password").val()
			  }
			  break;
			default:
			 roleUrl = 'usersSignin';
			 role = 1;
			 data = {
			 	telephoneNumber:$("#userTele").val(),
			 	password:$("#password").val()
			 }
			}
			url = `/api/personnel/${roleUrl}`;
		$.ajax({
			url,
			type:'POST',
			data,
			success:(result) => {
				result = JSON.parse(result);

				if(result.ret){
					var token=result.data.token;
					// console.log(token);
					wsCache.set('token', token)	
					// 删除wsCache.delete('token');
					// alert('登陆成功');
					switch(role)
							{
							case 1:
							  // 普通会员
							  // console.log('1')
							 window.location.href = 'user.html';
							  break;
							case 2:
							  // 柜台人员
							   // console.log('2')
							  window.location.href = 'repairman.html';
							  break;
							  case 3:
							  // 管理员
							   // console.log('3')
							  window.location.href = 'administrator.html';
							  break;
							default:
							  alert('Error!')
							}
				}else{
					$.notifyDefaults({
						type: 'danger',
						allow_dismiss: false,
						delay:500,

					});
					$.notify({
						icon: 'fa fa-times-rectangle',
						message: result.data,
					});  
				}
				return result;
			}
		})
	
}

 