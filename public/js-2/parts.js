function partsFind(){
	return $.ajax({
			url:'/api/personnel/sparepartFind',
			type:'GET',
			success:(result) => {
				var data = {result}
				if (data.result.length == 0) {
					return;
				}
				var html = template('partsFind',data);
				// console.log(html);
				$('#partsList').html(html);
				}
				
    })
    // window.location.reload();
}
partsFind();
function deleteHint(){
		var ele = $('.alert')
		// console.log(ele.length+'提示！');
		ele.remove();
}
// 添加
$(".addButton").on('click',function(){
	deleteHint();
	$('.parts_name').val(''),
	$('.parts_type').val('')
	$('.close').on('click',function(){
		window.location.reload();
	})
	$('#partsAdd').on('click',function(){
		let data = {
			sparepartName:$('.parts_name').val(),
			sparepartType:$('.parts_type').val()
		}

		addParts(data)
    })
})
function addParts(data){
   $.ajax({
			url:'/api/personnel/sparepartSave',
			type:'POST',
			data,
			success:(result) => {
				result = JSON.parse(result);
				// console.log(result.data.msg);
				if(result.ret){
					$('.parts_name').val(''),
					$('.parts_type').val('')
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
                        title: "确定删除该备件吗？", 
                        text: "你将无法恢复该备件！", 
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
								url:'/api/personnel/spareDelete',
								type:'POST',
								data:{id},
								success:(result) => {
									if(result.ret){
										$('.confirm').on('click',function(){
											window.location.reload();
										})
									}
								 }
							  })
                            // console.log('111');
                            // console.log(id);
                            swal("删除！", "该备件已经被删除。","success"); 
                        } else { 
                            // console.log(2);
                        swal("取消！", "已取消删除该备件:)","error"); 
                        } 
                });

}

	$('.app-content').on("click",".parts_delete",async function(){
	let id = $(this).attr('partsid');
	deleteOne(id);
})
