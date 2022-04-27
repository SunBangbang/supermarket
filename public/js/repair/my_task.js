$(document).ready(function() {
  var phone = $(".app-sidebar__user-designation").html();
  $.ajax({
    url: "/api/product/find",
    type: "post",
    data: {
      state: 0,
      phone
    },
    success: function(result) {
      console.log(result.length);

      $(".untreated").html(result.length);
    }
  });
});

$(document).ready(function() {
  var phone = $(".app-sidebar__user-designation").html();

  $.ajax({
    url: "/api/product/find",
    type: "post",
    data: {
      state: 1,
      phone
    },
    success: function(result) {
      console.log(result.length);

      $(".continue").html(result.length);
    }
  });
});

$(document).ready(function() {
  var phone = $(".app-sidebar__user-designation").html();

  $.ajax({
    url: "/api/product/find",
    type: "post",
    data: {
      state: 2,
      phone
    },
    success: function(result) {
      console.log(result.length);

      $(".completed").html(result.length);
    }
  });
  $(document).ready(function() {});
});

$(document).ready(function() {
  var phone = $(".app-sidebar__user-designation").html();

  $.ajax({
    url: "/api/product/find",
    type: "post",
    data: {
      phone
    },
    success: function(result) {
      console.log(result.length);

      $(".alllist").html(result.length);
    }
  });
});
