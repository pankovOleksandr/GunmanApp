import elements from './ElementsDOM';

let element = elements.cowboy;

let Enemy = (function(){

		var Enemy = function(reactionTime) {
			// create div for enemy
			// element = document.createElement("div");
			
			element.id = "cowboy";
			element.classList.add("gunman");
			
			// TODO delete consts > use calc reactionTime
			this.walkingTime = 3000;
			this.standingTime = 1000;
			this.shootingTime = 1500;			
			
			this.fireStateFlag = false;
			
		}; 


		Enemy.prototype.action = function(newState) {
			var _self = this;
			this.state = newState;
	        
	        switch(this.state){
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
	            	
	                break;

	            default:
	               
	                break;
        	};

        };


		return Enemy;
	})();

export default Enemy;
