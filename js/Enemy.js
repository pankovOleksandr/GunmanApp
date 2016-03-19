import elements from './ElementsDOM';

let Enemy = (function(){

		var Enemy = function(reactionTime) {
			this.element = elements.cowboy;
			this.element.classList.add("gunman");
			
			// TODO delete consts > use calc reactionTime
			this.walkingTime = 5000;
			this.standingTime = 1000;
			this.shootingTime = 1500;			
			
			this.fireStateFlag = false;
			
		}; 


		Enemy.prototype.action = function(newState) {
			
			let element = this.element;
	        
	        switch(newState){
	            case 'going':	            		            	
	            	// Add go animation
	            	element.classList.add("gunman_go");	            	        		
	        		// Set position for battle
	        		$(element).animate({right : "50%"},  this.walkingTime, "linear");
	        		
	                break;

	            case 'stand':	            	
	            	// Add standing position
	                element.classList.remove("gunman_go");
	                element.classList.add("gunman_stand");	                    
	                break;

	            case 'shooting':
	            	// Add shooting animation
	                element.classList.remove("gunman_stand");
	                element.classList.add("gunman_shooting");
	                element.style.animation = "shooting " + this.shootingTime / 1000 + "s steps(4)";
	                break;

	            case 'winning':
	            	
                                
                
	                break;
	                
	            case 'dead':
	            	$('.gunman_alert').hide();
                this.$gunman.removeClass("gunman_shooting")
                            .addClass("gunman_dead");
                setTimeout(function() {
                    $(".gunman").hide();
                    }, 1000)
                this.$result.text("Congratulations!!! You win!!!")
                            .appendTo(".wrapper");
                    // Start audio
	            	Game.assets.sounds.win.play();
	            	// Add dead animation
	            	this.enemyDOMELement.classList.remove("gunman_shooting");
	                this.enemyDOMELement.classList.add("gunman_dead");
	                this.enemyDOMELement.style.animation = "dead 1s steps(1);";
	                setTimeout(function() {
	                	_self.arena.removeChild(_self.textFire);
	                	_self.arena.appendChild(_self.winText);
	                	_self.arena.removeChild(_self.enemyDOMELement);
	                }, 2500);

	                break;

	            default:
	               
	                break;
        	};

        };


		return Enemy;
	})();

export default Enemy;
