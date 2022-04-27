// 判断是否已有用户登录;
// console.log('isSignOut');
var token = localStorage.getItem('token');
var value;
if(token){
	
	
	token = JSON.parse(token);
    value = token.val;
}
// console.log(value);
 $.ajax({

			url:'/api/personnel/isSignin',
			type:'POST',
			data:{
				token:value
			},
			success(result){
				result = JSON.parse(result);
				console.log(result);
				
				var html = ` <p class="app-sidebar__user-name">${result.data.loginUser}</p>
          <p class="app-sidebar__user-designation">${result.data.tel}</p>`
				$("#appenduser").append(html)
				
				
				$("#exampleInputPassword1").val(result.data.tel);
				$("#exampleInputPassword1").attr("readonly" , "readonly")
				if(result.data.loginUser){
					// console.log('已经登录！');
		
				}else{
					// console.log('没有登录！');
					window.location.href='login.html';
					// alert('请先登录!');
				}
				return result;
			}
		})

// 界面点击退出，删除本地token;
 $("#logout").on('click',function(){
	localStorage.removeItem('token');
	// window.location.reload()
	window.location.href='login.html';
	// alert('请先登录！')
})
 $("#quit_log").on('click',function(){
	localStorage.removeItem('token');
	// window.location.reload()
	window.location.href='../login.html';
	// parent.location.href = 'login.html';
	// alert('请先登录！')
})

// 用户名添加