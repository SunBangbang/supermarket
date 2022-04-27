function faultFind(){
	return $.ajax({
			url:'/api/personnel/faultFind',
			type:'GET',
			success:(result) => {
				var data = {result}
				if (data.result.length == 0) {
				return;
				}
				var html = template('faultFind',data);
				// console.log(html);
				$('#faultList').html(html);
				}
				
    })
    // window.location.reload();
}
faultFind();
function deleteHint(){
		var ele = $('.alert')
		// console.log(ele.length+'提示！');
		ele.remove();
}

// 添加
$("#addButton").on('click',function(){
	deleteHint();
	$('.faultty_name').val('')
	$('.close').on('click',function(){
		window.location.reload();
	})
	$('#faultAdd').on('click',function(){
		let data = {
			faultName:$('.faultty_name').val()
		}
		addfault(data)
    })
	let ele = $('#faultAdd');
	// console.log(ele.length + '弹出层！');
})
function addfault(data){
   $.ajax({
			url:'/api/personnel/faultSave',
			type:'POST',
			data,
			success:(result) => {
				result = JSON.parse(result);
				if(result.ret){
					$('.faultty_name').val('')
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
						message: result.data.msg,
					});
				}
				return result;
			}
		})
}

function deleteOne(id){
	swal({ 
                        title: "确定删除该商品类型吗？", 
                        text: "你将无法恢复该商品类型！", 
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
								url:'/api/personnel/faultDelete',
								type:'POST',
								data:{id},
								success:(result) => {
									if(result.ret){
										$('.confirm').on('click',function(){
											window.location.reload();
										})
										
										return result;
									}
								 }
							  })
                            // console.log('111');
                            // console.log(id);
                            swal("删除！", "该商品类型已经被删除。","success"); 
                        } else { 
                            // console.log(2);
                        swal("取消！", "已取消删除该商品类型:)","error"); 
                        } 
                });

}

	$('.app-content').on("click",".fault_remove",async function(){
	let id = $(this).attr('faultid');
	deleteOne(id);
})
