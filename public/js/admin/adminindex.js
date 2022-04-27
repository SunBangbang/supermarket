$.ajax({
    url:"/api/product/find",
    type:"post",
    data:{
        state:0
    },
    success:function(result){
        console.log(result.length);
        
     $(".untreated").html(result.length)
        
    }
})

$.ajax({
  url: "/api/product/find",
  type: "post",
  data: {
    state: 1
  },
  success: function(result) {
        console.log(result.length);
      
    $(".continue").html(result.length);
  }
});
$.ajax({
  url: "/api/product/find",
  type: "post",
  data: {
    state: 2
  },
  success: function(result) {
        console.log(result.length);
      
    $(".completed").html(result.length);
  }
});
$.ajax({
  url: "/api/product/find",
  type: "post",
  
  success: function(result) {
        console.log(result.length);
      
    $(".alllist").html(result.length);
  }
});