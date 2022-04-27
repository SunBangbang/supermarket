function ready(){

    $(document).ready(function() {
      $.ajax({
      url: "/api/product/find",
      type: "POST",
      data: {
        phone: $(".app-sidebar__user-designation").html(),
        state: "3",
    
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
    })
}
  


$("#sampleTable").on("click", ".seeifo", function(e) {
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
});
