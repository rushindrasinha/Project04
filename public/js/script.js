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

    $('#order-food').on('click', function(e){
        e.preventDefault();
        $('#order')
            .modal('setting', 'transition', 'horizontal flip')
            .modal('show');
    });

    var restaurants = ['6e55d8e2c73ef1966b05','db7e7c1b6cadcb8b0ca2','40a636d23ea97f4d3745','03a922d427d0c42cc9ce'];

    $.each(restaurants, function(i){
        $.ajax({
            type: 'GET',
            dataType: "jsonp",
            url: "https://api.locu.com/v1_0/venue/" + restaurants[i] + "/?api_key=e24ffeac95907824f1503d2a97cb39d5c9e28e38",
            success: function(result){
                var restaurantSlug = result.objects[0].name.toLowerCase().replace(/[^A-Z0-9]/ig, "");
                var menui = [];
                $('<div class="three wide column"></div>').append
                    ('<div class="ui card"><div class="image"><img src="http://www.mokshaatl.com/image/slider/5.jpg"></div><div class="content"><div class="header">'+result.objects[0].name+'</div><div class="description"><p>'+result.objects[0].phone+'</p><p>'+result.objects[0].street_address+'<br>'+result.objects[0].locality+','+result.objects[0].region+'<p><a class="menu'+[i]+'"><i class="list icon"></i>Menu</a></p></div></div></div>')
                    .appendTo('#food');


                $('.menu'+[i]).on('click', function(e){
                    console.log(restaurantSlug);
                    if($('#menu').hasClass('ui modal')) {
                        $('#menu').attr('class', 'ui modal ' + restaurantSlug);
                        $('#menu').html('');
                        $('#menu').modal('show', function(){
                          $('<div class="content"><h1 class="ui blue header centered">'+result.objects[0].name+'</h1><input id="address" type="hidden" value="'+result.objects[0].street_address+'"><input id="locality" type="hidden" value="'+result.objects[0].locality+'"><input id="region" type="hidden" value="'+result.objects[0].region+'"><input id="postal_code" type="hidden" value="'+result.objects[0].postal_code+'"><input id="phone" type="hidden" value="'+result.objects[0].phone+'"></div>').appendTo('#menu');
                            result.objects[0].menus.forEach(function(menu){
                                menu.sections.forEach(function(section){
                                    var section_name = section.section_name.toLowerCase().replace(/[^A-Z0-9]/ig, "")
                                    $('<ul class="ui list"></ul>').append('<li class="item '+section_name+'"><h2 class="ui red header">'+section.section_name+'</h2><ul></ul></li>').appendTo('#menu .content');
                                    section.subsections[0].contents.forEach(function(item) {
                                        $('<li></li>').append(item.name + ' ' + item.price + '<a data-order-name="'+item.name+'" class="ui button mini add-to-order"><i class="icon plus"></i> add</a>').appendTo('#menu .content ul li.'+section_name+' ul');
                                    });

                                });
                            });
                            //ADD ORDER TO CURRENT USER
                            addToOrder();
                        });

                    } else {
                        $('#menu').attr('class', 'ui modal');
                    }
                });//menu click
            }//success
        });//ajax
    });//each



	//ADD ORDER TO CURRENT USER
	var addToOrder = function(){
		$('.add-to-order').on('click', function(evt){
			evt.preventDefault();
			itemToOrder = ($(this).data());
			restaurantName = $('#menu h1').text();
			restaurantAddress = $('input#address').val();
			restaurantCity = $('input#locality').val();
			restaurantState = $('input#region').val();
			restaurantZip = $('input#postal_code').val();
			restaurantPhone = $('input#phone').val();
			$.ajax({
				url: '/addtoorder',
				method: "POST",
				data: {
					itemToOrder: itemToOrder,
					restaurantName: restaurantName,
					restaurantAddress: restaurantAddress,
					restaurantCity: restaurantCity,
					restaurantState: restaurantState,
					restaurantZip: restaurantZip,
					restaurantPhone: restaurantPhone
				}
			})
		});
	}

  $('.dropdown')
    .dropdown({
      transition: 'drop'
    });

}); //jquery
