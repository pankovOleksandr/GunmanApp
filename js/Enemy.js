import elements from './ElementsDOM';

let Enemy = (function(){

		var Enemy = function(reactionTime) {
			this.element = document.createElement("div");
			this.element.id = "cowboy";
			// this.element = elements.cowboy;
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

	            	elements.arena.appendChild(element);            	        		
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
	            	setTimeout(() =>{
						elements.arena.removeChild(Elements.cowboy);
					}, 2500);               
	                break;
	                
	            case 'dead':
	                element.classList.remove("gunman_shooting");
	                element.classList.add("gunman_dead");
	            	setTimeout(() =>{
						elements.arena.removeChild(Elements.cowboy);
					}, 2500);
	                
	                break;

	            default:
	               
	                break;
        	};

        };


		return Enemy;
	})();

export default Enemy;
