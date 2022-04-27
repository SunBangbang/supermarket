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
});
var nval;
var arr=[];
$(".button-dropdown").click(function(){
	var num = 0;
	 $(".sorting_1  .animated-checkbox input").each(function() {
     if (this.checked == true){
      num++;
      nval=$(this).attr("data-id")
      arr.push(nval)
     }
   });
 	if(num == 0)
 		// 
 		{
 			$(".app-content").on("click",".multslice",function(){
                swal({ 
                        title: "请先选择任务", 
                        confirmButtonColor: "#DD6B55",
                        }
                )
            })

            $(".app-content").on("click",".multhandle",function(){
                swal({ 
                        title: "请先选择任务", 
                        confirmButtonColor: "#DD6B55",
                        }
                )
            })
 		}
 	else{
 		$(".app-content").on("click",".multslice",function(){
                swal({ 
                        title: "确定删除所选"+num+"个维修任务？", 
                        // text: "你将无法恢复该人员！", 
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

                            
                            $.ajax({
                              url:
                                "/api/product/allremove",
                              type: "post",
                              data: {
                                id: arr
                              },
                              traditional:true,
                              success: function(result){
                                $(".confirm").on(
                                  "click",
                                  function() {
                                    window.location.reload();
                                  }
                                )
                              }
                            })
                        swal("删除！", "已删除所选"+num+"个维修任务,您可在历史任务中查询","success"); 
                        } else { 

                        swal("取消！", "已取消删除所选"+num+"个维修任务:)","error"); 
                        } 
                })
            })


         $(".app-content").on("click",".multhandle",function(){
                swal({ 
                        title: "确定处理所选"+num+"个维修任务？", 
                        // text: "你将无法恢复该人员！", 
                        type: "warning",
                        showCancelButton: true, 
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确定", 
                        cancelButtonText: "取消",
                        closeOnConfirm: false, 
                        closeOnCancel: false    
                        },
                        function(isConfirm){ 
                        if (isConfirm) { 

                        swal("已选定！", "已选择处理所选"+num+"个维修任务,您可在进行中中查询","success"); 
                        } else { 

                        swal("已取消！", "已取消处理所选"+num+"个维修任务:)","error"); 
                        } 
                });
            })
 	}










    // $(".sorting_1 input").each(function() {
    //   this.checked = false;
    // });
    var oInput = $(" .animated-checkbox input");
    oInput.each(function(item){
        // console.log($(this).index);
        this.checked = false;
    })

})

// console.log("11e33");
// window.onload = function(){
//     var oInput = $("input[type='checkbox']");
//     // console.log(oInput.length);
//     $("#sampleTable_paginate").on("click",function(ele){
//         console.log("111");
//     $(".sorting_asc input[type='checkbox']").attr("checked",false);
//     oInput.each(function(item){
//         // console.log($(this).index);
//         this.checked = false;
//     })
// })

// }


$(function () {
     var value = 1;
   $("#sampleTable_paginate").on("click",function(ele){
    var oInput = $(" .animated-checkbox input[type='checkbox']");
    console.log(value);
    value++;
     oInput.each(function(item){
        this.checked = false;
     })
   })
 });
 $(".animated-checkbox").click(function(e){
     e.stopPropagation();
 })

