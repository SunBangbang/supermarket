
function brandFind(){
	return $.ajax({
			url:'/api/personnel/brandFind',
			type:'GET',
			success:(result) => {
				var data = {result}
				if (data.result.length == 0) {
					return;
				}
				var html = template('brandFind',data);
				// console.log(html);
				$('#brandList').html(html);
				}
				
    })
    // window.location.reload();
}
brandFind();
function deleteHint(){
		var ele = $('.alert')
		// console.log(ele.length+'提示！');
		ele.remove();
}
// 添加
$("#addButton").on('click',function(){
	$('.brand_name').val('');
	$('.close').on('click',function(){
		window.location.reload();
	})
	$('.close_2').on('click',function(){
		window.location.reload();
	})
	deleteHint()
	$('#brandAdd').on('click',function(){
		let data = {
			brandName:$('.brand_name').val()
		}
		
		addBrand(data);
    })
})
function addBrand(data){
   $.ajax({
			url:'/api/personnel/brandSave',
			type:'POST',
			data,
			success:(result) => {
				// deleteHint();
				result = JSON.parse(result);
				// console.log(result.ret);
				if(result.ret){
					// console.log('succ');
					$('.brand_name').val('');
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
                        title: "确定删除该品牌类型吗？", 
                        text: "你将无法恢复该品牌类型！", 
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
								url:'/api/personnel/brandDelete',
								type:'POST',
								data:{id},
								success:(result) => {
									if(result.ret){
										// console.log(result);
										// console.log('succ');
										$('.confirm').on('click',function(){
											window.location.reload();
										})
										return result;
									}
								 }
							  })
                            // console.log('111');
                            // console.log(id);
                            swal("删除！", "该品牌类型已经被删除。","success"); 
                        } else { 
                            // console.log(2);
                        swal("取消！", "已取消删除该品牌类型:)","error"); 
                        } 
                });

}

	$('.app-content').on("click",".demoslice-shebei",async function(){
	let id = $(this).attr('brandid');
	deleteOne(id);
})
