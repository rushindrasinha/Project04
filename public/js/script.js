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

	var restaurants = ['6e55d8e2c73ef1966b05','db7e7c1b6cadcb8b0ca2','40a636d23ea97f4d3745'];

	$.each(restaurants, function(i){
		$.ajax({
			type: 'GET',
			dataType: "jsonp",
			url: "https://api.locu.com/v1_0/venue/" + restaurants[i] + "/?api_key=b86b056f3e195b5ef802fa51fccc0e896ca44919",
			success: function(result){
				var restaurantSlug = result.objects[0].name.toLowerCase().replace(/[^A-Z0-9]/ig, "");
				var menui = [];
				$('<div class="three wide column"></div>').append
					('<div class="ui card"><div class="content"><div class="header">'+result.objects[0].name+'</div><div class="description"><p>'+result.objects[0].phone+'</p><p>'+result.objects[0].street_address+'<br>'+result.objects[0].locality+','+result.objects[0].region+'<p><a class="menu'+[i]+'"><i class="newspaper icon"></i>Menu</a></p></div></div></div>')
					.appendTo('#food');

							

				$('.menu'+[i]).on('click', function(e){
					console.log(restaurantSlug);
					if($('#menu').hasClass('ui modal')) {
						$('#menu').attr('class', 'ui modal ' + restaurantSlug);
						$('#menu').html('');
						$('#menu').modal('show', function(){
							$('<div class="content"><h1>'+result.objects[0].name+'</h1></div>').appendTo('#menu');
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
			current_user_email = $('span').data('user-email');
			item_to_order = ($(this).data());
			console.log(item_to_order);
			console.log(current_user_email);
			$.ajax({
				url: '/addtoorder',
				method: "POST",
				data: {item_to_order: item_to_order}
			})
		});	
	} 


	

}); //jquery
