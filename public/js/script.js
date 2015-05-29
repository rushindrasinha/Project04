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

