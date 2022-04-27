$(document).ready(function () {
    $.ajax({
        url: "/api/personnel/brandFind",
        type:"GET",
        success:function(result){
             var res = {
                 data: result
             };
             if (res.data.length == 0) {
                 return;
             }
             var html= template("brand",res);
              $("#brandtel").html(html);
        }
    })
})

$(document).ready(function(){
    $.ajax({
        url: "/api/personnel/faultFind",
        type:"GET",
        success:function(result){
            var res = {
                data: result
            };
             if (res.data.length == 0) {
                 return;
             }
             var html = template("fault",res);
             $("#faulttel").html(html)
        }
    })
})