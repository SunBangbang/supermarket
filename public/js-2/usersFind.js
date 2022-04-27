// 用户信息的渲染；

 $.ajax({
			url:'/api/personnel/usersFind',
			type:'GET',
			success:(result) => {
				var data = {result}
				var html = template('usersFind',data);
				// console.log(html);
				$('#usersList').html(html);
				}
				
    })

// 点击删除用户;
// console.log(1111);
function deleteOne(id){
	swal({ 
                        title: "确定删除该人员信息吗？", 
                        text: "你将无法恢复该人员！", 
                        type: "warning",
                        showCancelButton: true, 
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确定删除", 
                        cancelButtonText: "取消删除",
                        closeOnConfirm: false, 
                        closeOnCancel: false	
                        },
                        function(isConfirm){ 
                        if (isConfirm) { 
                            // console.log(1);
                            $.ajax({
              								url:'/api/personnel/usersDelete',
              								type:'POST',
              								data:{id},
              								success:(result) => {
                                  $(".confirm").on('click',function(){
                                    window.location.reload();
                                  })
              								 }
              							  })
                            // console.log('111');
                            // console.log(id);
                            swal("删除！", "该人员信息已经被删除。","success")
                            
                        } else { 
                            // console.log(2);
                        swal("取消！", "已取消删除该人员信息:)","error"); 
                        } 
                });

}

	$('.app-content').on("click",".usersDelete",function(){
	let id = $(this).attr('userid');
	deleteOne(id);
         // window.location.reload();
   
})

//批量删除

$(".sorting .animated-checkbox input").click(function(event) {
  event.stopPropagation();
 
  // console.log("11111");
  if (this.checked == true) {
    $(".sorting_1 .animated-checkbox input").each(function() {
      this.checked = true;
    });
  } else {
    $(".sorting_1  .animated-checkbox input").each(function() {
      this.checked = false;
    });
  }
  // window.location.reload();
});
$(".button-dropdown").click(function(){
	var num = 0;
	var users = [];
	 $(".sorting_1  .animated-checkbox input").each(function() {
     if (this.checked == true){
     	var userid = $(this).parent().parent().parent().siblings('.flag').find('.usersDelete').attr('userid');
     	users[num] = userid;
     	num++;
     }

   });
 	if(num == 0)
 		// 
 		{
 			$(".app-content").on("click",".multslice",function(){
                swal({ 
                        title: "请先选择用户", 
                        confirmButtonColor: "#DD6B55",
                        },
                );
            })
 		}
 	else{
 		$(".app-content").on("click",".multslice",function(){
 			// console.log(users);
                swal({ 
                        title: "确定删除所选"+num+"个用户？", 
                        text: "你将无法恢复！", 
                        type: "warning",
                        showCancelButton: true, 
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确定删除", 
                        cancelButtonText: "取消删除",
                        closeOnConfirm: false, 
                        closeOnCancel: false    
                        },
                        function(isConfirm){ 
                        if (isConfirm) { 
                            // console.log(1);
                            for(let i=0;i<users.length;i++){
                              // console.log(i);
                            	 $.ajax({
                    								url:'/api/personnel/usersDelete',
                    								type:'POST',
                    								data:{id:users[i]},
                    								success:(result) => {
                    									if(result.ret){
                                       
                                        if(i == users.length-1){
                                           $('.confirm').on('click',function(){
                                            // console.log('222');
                                            window.location.reload();
                                        })
                                        }
                    									}
                    								 }
                    							  })
                            }
                        swal("删除！", "已删除所选"+num+"个用户","success"); 

                        } else { 
                            // console.log(2);
                        swal("取消！", "已取消删除所选"+num+"个用户)","error");

                        } 
                });
                // window.location.reload()
            })
 	}

    var oInput = $(" .animated-checkbox input");
    oInput.each(function(item){
        // console.log($(this).index);
        this.checked = false;
    })

})

// $(function () {
     var value = 1;
   $("#sampleTable_paginate").on("click",function(ele){
    var oInput = $(" .animated-checkbox input[type='checkbox']");
    // console.log(value);
    value++;
     oInput.each(function(item){
        this.checked = false;
     })
     // window.location.reload()
   })
 // });
 $(".animated-checkbox").click(function(e){
     e.stopPropagation();
 })


// 用户信息的编辑与保存;
$(".app-content").on("click",".edit",function(){
		let id = $(this).attr('userid');
		// console.log(id);
		$.ajax({
								url:'/api/personnel/usersFindById',
								type:'POST',
								data:{id},
								success:(result) => {
									if(result){
										// console.log(result);
										// console.log(result.telephoneNumber);
                    let id = result._id;
										$("#userPhone").html(result.telephoneNumber);
										$('#userName').val(result.nickName);
										$('#userPwd').val('xxxxxxxx');
                                        $('#userEmail').val(result.email);
                                        $('#confirmEdit').on('click',function(){
                                            let data = {
                                                id,
                                                nickName:$('#userName').val(),
                                                password:$('#userPwd').val(),
                                                email:$('#userEmail').val()
                                            }
                                            submitNew(data);
                                            // console.log(data);
                                            // usersFind();
                                        });
                                        
										return result;
									}
								 }
							  })
        // window.location.reload()
})

 function submitNew(data){
    // console.log(data);
    $.ajax({
                                url:'/api/personnel/usersEdit',
                                type:'POST',
                                data,
                                success:(result) => {
                                    if(result){
                                        window.location.reload();
                                    }
                                 }
                              })
 }


