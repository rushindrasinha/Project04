$(document).ready(function(){

	$('#login-button').on('click', function(e){
		e.preventDefault();
		$('#login-form')
			.modal('setting', 'transition', 'horizontal flip')
			.modal('show');
	});

	$('#signup-button').on('click', function(e){
		e.preventDefault();
		$('#signup-form')
			.modal('setting', 'transition', 'horizontal flip')
			.modal('show');
	});

});

// McDonalds
$.ajax({
  type: 'GET',
  dataType: "jsonp",
  url: "https://api.locu.com/v1_0/venue/6e55d8e2c73ef1966b05/?api_key=e24ffeac95907824f1503d2a97cb39d5c9e28e38",
  success: function(result){
//    console.log(result);
//    console.log(result.objects[0].name)
    $('.restaurantsName').append(result.objects[0].name)
    $('.restaurantsNumber').append(result.objects[0].phone)
    $('.restaurants').append("<br>" + result.objects[0].locality)
    $('.restaurants').append("<br>" + result.objects[0].postal_code);

    result.objects[0].menus.forEach(function(menu){
      menu.sections.forEach(function(section){
        console.log(section);
      });
    })
  }
});


// Burger Lounge
$.ajax({
  type: 'GET',
  dataType: "jsonp",
  url: "https://api.locu.com/v1_0/venue/db7e7c1b6cadcb8b0ca2/?api_key=e24ffeac95907824f1503d2a97cb39d5c9e28e38",
  success: function(result){
//    console.log(result);
//    console.log(result.objects[0].name)
    $('.1restaurantsName').append(result.objects[0].name)
    $('.1restaurantsNumber').append(result.objects[0].phone)
    $('.1restaurants').append("<br>" + result.objects[0].locality)
    $('.1restaurants').append("<br>" + result.objects[0].postal_code)
    result.objects[0].menus.forEach(function(menu){
      menu.sections.forEach(function(section){
      //  console.log(section);
      });
    })
  }
});

// Pinches
$.ajax({
  type: 'GET',
  dataType: "jsonp",
  url: "https://api.locu.com/v1_0/venue/40a636d23ea97f4d3745/?api_key=e24ffeac95907824f1503d2a97cb39d5c9e28e38",
  success: function(result){
//    console.log(result);
//    console.log(result.objects[0].name)
    $('.2restaurantsName').append(result.objects[0].name)
    $('.2restaurantsNumber').append(result.objects[0].phone)
    $('.2restaurants').append("<br>" + result.objects[0].locality)
    $('.2restaurants').append("<br>" + result.objects[0].postal_code)
  }
});
