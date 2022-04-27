$(document).ready(function() {
  $.ajax({
  url: "/api/product/find",
  type: "post",
  data: {
    state: "0",
    ret: "0",
    
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

$("#sampleTable").on("click", ".seeifo", function(e) {
  // var id = $(e.target).attr("data-id");
  var id=$(this).attr("data-id")
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
console.log(res);

      var str = template("ifo", res);

      // console.log(str);

      $("#ifoall").html(str);
    }
  });
});