function ready() {

  $(document).ready(function() {
      $.ajax({
        url: "/api/product/find",
        type: "post",
        data: {
          state: "0",
          ret: "1",
          repairname: $(".app-sidebar__user-name").html()
        },
        success: result => {
          var res = {
            data: result
          };
          if (res.data.length == 0) {
            return;
          }
     
          var str = template("untreated", res);
  
          // console.log(str);
  
          $("#repairifo").html(str);
        }
      });
  })
}





$("#sampleTable").on("click", ".seeifo", function(e) {
  var id = $(this).attr("data-id");
  console.log(id);
  $.ajax({
    url: "/api/product/findifo",
    type: "POST",
    data: {
      _id: id
    },
    success: result => {
      var res = {
        data: result
      };

      var str = template("ifo", res);

      // console.log(str);

      $("#ifoall").html(str);
    }
  });
});
$("#sampleTable").on("click", ".button-caution",function(e){
    var id=$(this).attr("data-id");
    $(".button-normal").on("click",function(){
      var content = $("#exampleTextarea").val();
      $.ajax({
        url:"/api/product/giveup",
        type:"post",
        data:{
          _id:id,
          content,
        },
        success:function(res){
         window.location.reload();
         
        }
        
      })
    })
});