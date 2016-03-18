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
			// Text messages references
			// this.textFire = Game.assets.textBox.fireText; 
			// this.deadText = Game.assets.textBox.deadText;
			// this.winText = Game.assets.textBox.winText;		

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

	            // case 'winning':
	            // 	// delete shooting event

	            // 	// Start winning audio
	            // 	Game.assets.sounds.death.play();
	            // 	// Add Dead Alert
	            // 	this.arena.removeChild(this.textFire);
	            // 	setTimeout(function() {	            		
	            // 		_self.arena.appendChild(_self.deadText);
	            // 		}, 100);

	            	
	                     
	            //     break;
	                
	            // case 'dead':
	            // 	// Start audio
	            // 	Game.assets.sounds.win.play();
	            // 	// Add dead animation
	            // 	element.classList.remove("gunman_shooting");
	            //     element.classList.add("gunman_dead");
	            //     element.style.animation = "dead 1s steps(1);";
	            //     setTimeout(function() {
	            //     	_self.arena.removeChild(_self.textFire);
	            //     	_self.arena.appendChild(_self.winText);
	            //     	_self.arena.removeChild(_self.enemyDOMELement);
	            //     }, 2500);
	                
	            //     break;

	            default:
	               
	                break;
        	};

        	// function(newPos)
        };


		return Enemy;
	})();

export default Enemy;
