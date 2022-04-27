// 添加信息提示
$('#btn').on('click',function(){
		$.notifyDefaults({
			type: 'success',
			allow_dismiss: false,
			delay:2000,
			animate: {
				enter: 'animated fadeInRight',
				exit: 'animated fadeOutRight'
			},

		});
		$.notify({
			icon: 'fa fa-check-square',
			title: '<strong>添加状态：</strong>',
			message: '添加成功',
		});
})

// 注册成功信息提示:


$('#btn').on('click',function(){
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
})

