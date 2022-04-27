// 柜台人员页面数据 
$.ajax({
			url:'/api/personnel/repairmanFind',
			type:'GET',
			success:(result) => {
				var data = {result}
				if (data.result.length == 0) {
					return;
				}
				var html = template('repairmanFind',data);
				// console.log(html);
				$('#repairmanList').html(html);
				}
				
    })

// 柜台人员的添加:
$("#addButton").on('click',function(){
	$('.close').on('click',function(){
		window.location.reload();
	})
	// console.log('add');
			// $('#repairmanName').val(''),
			// $('#repairmanPwd').val(''),
			// $('#repairmanTele').val(''),
			// $('#repairmanEmail').val(''),
		$('#addRepair').on('click',function(){
			// console.log('1111');
		// 验证是否通过:
		$('#addRepairman').data('bootstrapValidator').validate();
         if($('#addRepairman').data('bootstrapValidator').isValid()){
         	let data = {
			repairmanAccount:$('#repairmanAccount').val(),
			repairmanName:$('#repairmanName').val(),
			password:$('#repairmanPwd').val(),
			repairmanTele:$('#repairmanTele').val(),
			email:$('#repairmanEmail').val(),
			sex:$('#repairmansex').val(),
			age:$('#repairmanage').val(),
		}

		addRepairman(data);
			// $('#repairmanName').val('');
			// $('#repairmanPwd').val('');
			// $('#repairmanTele').val('');
			// $('#repairmanEmail').val('');
         }else{
     //     	$.notifyDefaults({
					// 	type: 'danger',
					// 	allow_dismiss: false,
					// 	delay:2000,
					// 	animate: {
					// 		enter: 'animated fadeInRight',
					// 		exit: 'animated fadeOutRight'
					// 	},

					// });
					// $.notify({
					// 	icon: 'fa fa-times-rectangle',
					// 	title: '<strong>添加状态：</strong>',
					// 	message: '',
					// });
         	
         }
		
    })
})
function deleteHint(){
		var ele = $('.alert')
		// console.log(ele.length+'提示！');
		ele.remove();
}

function addRepairman(data){
   $.ajax({
			url:'/api/personnel/repairmanSave',
			type:'POST',
			data,
			success:(result) => {
				// console.log(111);
				result = JSON.parse(result);
				console.log(result.ret);
				if(result.ret){
					$('#repairmanName').val('');
					$('#repairmanPwd').val('');
					$('#repairmanTele').val('');
					$('#repairmanEmail').val('');
					$('#repairmansex').val('');
					$('#repairmanage').val('');
					console.log('succ');
					// window.location.reload();
				}else{
					deleteHint()
					$.notifyDefaults({
						type: 'danger',
						allow_dismiss: false,
						delay:2000,
						animate: {
							enter: 'animated fadeInRight',
							exit: 'animated fadeOutRight'
						},

					});
					$.notify({
						icon: 'fa fa-times-rectangle',
						title: '<strong>添加状态：</strong>',
						message: result.data,
					});
				}
				return result;
			}
		})
}


// 柜台人员删除
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
								url:'/api/personnel/repairmanDelete',
								type:'POST',
								data:{id},
								success:(result) => {
									if(result.ret){
										// console.log(result);
										$('.confirm').on('click',function(){
											window.location.reload();
										})
										
										return result;
									}
								 }
							  })
                            // console.log('111');
                            // console.log(id);
                            swal("删除！", "该人员信息已经被删除。","success"); 
                        } else { 
                            // console.log(2);
                        swal("取消！", "已取消删除该人员信息:)","error"); 
                        } 
                });

}

	$('.app-content').on("click",".repairmandelete",async function(){
	let id = $(this).attr('repairmanid');
	deleteOne(id);
})


// 用户信息的编辑与保存;
$(".app-content").on("click",".edit",function(){
	
		let id = $(this).attr('repairmanid');
		// console.log(id);
		$.ajax({
								url:'/api/personnel/repairmanFindById',
								type:'POST',
								data:{id},
								success:(result) => {
									if(result){
										// console.log(result);
										// console.log(result.repairmanName);
                                        let id = result._id;
										$("#repairman_name").html(result.repairmanName);
										$('#repairmanPhone').val(result.repairmanTele);
										$('#password').val('xxxxxxxx');
                                        $('#email').val(result.email);
										$('#repairmansex').val(result.sex);
										$('#repairmanage').val(result.age);
                                        $('#confirmEdit').on('click',function(){
                                            let data = {
                                                id,
                                                repairmanTele:$('#repairmanPhone').val(),
                                                password:$('#password').val(),
                                                email:$('#email').val(),
												sex:$('#sex').val(),
												age:$('#age').val()
                                            }
                                            submitNew(data);
                                           
                                        });
										return result;
									}
								 }
							  })
})

 function submitNew(data){
    // console.log(data);
    $.ajax({
                                url:'/api/personnel/repairmanEdit',
                                type:'POST',
                                data,
                                success:(result) => {
                                    window.location.reload();
                                 }
                              })
 }



