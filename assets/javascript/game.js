(function($) {
	'use strict';

	var gameOfThrones = function() {
		this.myHouse = null;
		this.myCurrentEnemy = null;

		gameOfThrones.prototype.init = () => {
			this.myHouse = null;
			this.myCurrentEnemy = null;
			this.initialAttack = 0;
			this.houses = {
				'got-ha': {id: 'got-ha', name: 'House Arryn', healthPoints: 80, attack: 6, counterAttack: 5, defeated: false},
				'got-hm': {id: 'got-hm', name: 'House Mormont', healthPoints: 110, attack: 7, counterAttack: 6, defeated: false},
				'got-hg': {id: 'got-hg', name: 'House Geryjoy', healthPoints: 95, attack: 8, counterAttack: 7, defeated: false},
				'got-hc': {id: 'got-hc', name: 'House Clegane', healthPoints: 90, attack: 6, counterAttack: 8, defeated: false},
				'got-hl': {id: 'got-hl', name: 'House Lannister', healthPoints: 120, attack: 7, counterAttack: 9, defeated: false},
				'got-hs': {id: 'got-hs', name: 'House Stark', healthPoints: 130, attack: 88, counterAttack: 5, defeated: false},
				'got-ht': {id: 'got-ht', name: 'House Tyrell', healthPoints: 100, attack: 6, counterAttack: 6, defeated: false},
				'got-htr': {id: 'got-htr', name: 'House Targaryen', healthPoints: 105, attack: 7, counterAttack: 7, defeated: false},
				'got-hb': {id: 'got-hb', name: 'House Baratheon', healthPoints: 150, attack: 8, counterAttack: 8, defeated: false},
				'got-htu': {id: 'got-htu', name: 'House Tully', healthPoints: 85, attack: 6, counterAttack: 9, defeated: false}
			}

			$('.buttons-container label').empty();
			$('#message').html("Select your House!!");


			$('.got__house-list--item')
			.removeClass('transform-me')
			.removeClass('transform-enemy')
			.removeClass('is-hidden')
			.removeClass('lord');

			$('#restart').addClass('is-hidden')
			.unbind('click')
			.on('click', this.init.bind(this));

			$('.js-player').unbind('click')
			.on('click', this.handleHouseClick.bind(this));

			$('#attack').addClass('is-hidden')
			.unbind('click').
			on('click', this.handleAttack.bind(this));
		}

		gameOfThrones.prototype.handleHouseClick = (event) => {
			let targetElement = $(event.currentTarget),
			houseId = targetElement.attr('data-id'),
			house = this.houses[houseId];
			if (!this.myHouse) {
				this.myHouse = house;
				this.myHouse.defeated = true;
				this.initialAttack = house.attack;
				$('#message').html("Select your Enemy!!");
				$('.got__house-list--item').addClass('transform');
				targetElement.parent('li').addClass('transform-me');
				$('#yourHP').text(`Your house - health: ${house.healthPoints} attack: ${house.attack}`);
				targetElement.removeClass('is-hidden');
			} else if (!this.myCurrentEnemy) {
				this.myCurrentEnemy = house;
				$('#message').html("Fight your Enemy!!");
				$('.got__house-list--item').addClass('transform');
				targetElement.parent('li').addClass('transform-enemy');
				$('#attack').removeClass('is-hidden')
				$('#enemyHP').text(`Your enemy - health: ${house.healthPoints} counter attack: ${house.counterAttack}`);
				targetElement.removeClass('is-hidden');
			}
		}

		gameOfThrones.prototype.handleAttack = (event) => {
			event.stopPropagation();
			if(!this.myCurrentEnemy) {
				$('#message').html("The enemy is NO ONE!!<br/>Select your enemy");
				return;
			}

			if(this.myHouse) {
				this.myCurrentEnemy.healthPoints -= this.myHouse.attack;
				let enemyElement = $(`[data-id="${this.myCurrentEnemy.id}"]`);
				$('#enemyHP').text(`Your enemy - health: ${this.myCurrentEnemy.healthPoints} counter attack: ${this.myCurrentEnemy.counterAttack}`);

				if(this.myCurrentEnemy.healthPoints <= 0) {
					this.myCurrentEnemy.defeated = true;
					this.myCurrentEnemy = null;
					enemyElement.parent('li').addClass('is-hidden');
					$('#message').html("Select another Enemy!!");
				} else {
					this.myHouse.healthPoints -= this.myCurrentEnemy.counterAttack;
				}

				let myElement = $(`[data-id="${this.myHouse.id}"]`);
				$('#yourHP').text(`Your house - health: ${this.myHouse.healthPoints} attack: ${this.myHouse.attack}`);

				if(this.myHouse.healthPoints <= 0) {
					$('#restart').removeClass('is-hidden');
					$('#attack').addClass('is-hidden')
					this.myHouse = null;
					$('#message').html("All men must die!!<br/>Restart Game!!");
				} else {
					this.myHouse.attack += this.initialAttack;
				}


				let result = Object.keys(this.houses).filter(function(key) {
					return !this.houses[key].defeated;
				}.bind(this));

				if(result.length === 0) {
					myElement.parent('li').addClass('lord');
					$('#attack').addClass('is-hidden')
					$('#restart').removeClass('is-hidden');
					$('#message').html("You are the LORD of seven kingdoms!!<br/> Thank you for playing, my Lord!!");
				}
			}
		}
	}


	var game = new gameOfThrones();
	game.init();

})(jQuery);
