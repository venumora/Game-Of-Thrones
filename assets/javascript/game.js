(function($) {
	'use strict';

	$('.js-player__me').on('click', function() {
		var playerText = $(this).find(".player-text").get(0);

		$('.player').addClass('player__enemy');
		$('.player-text').text("Select your Enemy!!");

		if(playerText) {
			$(playerText).text("You are!!");
		}

		$(this).find(".player")
		.removeClass('player__enemy')
		.removeClass('js-player__enemy')
		.removeClass('is-hidden');

		$('.js-player__me').unbind('click')
		.removeClass('js-player__me')
		.addClass('js-player__enemy');

		$('.js-player__enemy').on('click', function(){
			var playerText = $(this).find(".player-text").get(0);

			if(playerText) {
				$(playerText).text("Your current enemy is!!");
			}

			$(this).find(".player")
			.addClass('player__enemy--current')
			.removeClass('is-hidden');

			$('.js-player__enemy').unbind('click')
			.removeClass('js-player__enemy');
		});
	});

	var gameOfThrones = function() {

		gameOfThrones.prototype.init = () => {
		}
	}


	var game = new gameOfThrones();
	game.init();

})(jQuery);
