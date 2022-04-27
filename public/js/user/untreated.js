function ready(){

    $(document).ready(function() {
      var phone = $(".app-sidebar__user-designation").html();

  $.ajax({
  url: "/api/product/find",
  type: "POST",
  data: {
    phone,
    state: "0"
  },
  success: result => {
    var res = {
      data: result
    };
    if (res.data.length == 0) {
      return;
    }
    var html = template("test", res);

    $("#content1").html(html);
  }
  });
 });    
}





$("#sampleTable").on("click",".seeifo",function(e){
 
    var id = $(this).attr("data-id");

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
        $("#ifoall").html(str);
      }
    });
  
})
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

