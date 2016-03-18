(function(){



	var Game =  {};

	Game.assets = {};
	Game.entity = {};
	Game.assets.sounds = {};

	const DOMEntities = {
		arena : document.getElementById('wrapper'),
		enemy : document.createElement("div")		
	};		



	Game.start = function() {

		var cowboy = new Game.entity.Enemy();
		// var player = new Game.User();
		cowboy.changeState("going");

		cowboy.standing = setTimeout(function() { cowboy.changeState("standing")} , cowboy.walkingTime);
		cowboy.shooting = setTimeout(function() { cowboy.changeState("shooting")} , cowboy.walkingTime + cowboy.standingTime);
		cowboy.winning = setTimeout(function() { cowboy.changeState("winning")} , cowboy.walkingTime + cowboy.standingTime + cowboy.shootingTime);

		document.addEventListener("click", function(event) {

			// player.shoot();

			Game.assets.sounds.shot.play();

			if (!event.target.classList.contains("gunman")) {
				console.log('You missed');
				return;
			}

			if (!cowboy.fireStateFlag) {
				console.log('You are very fast');
			} else {
				clearInterval(cowboy.winning);
				cowboy.changeState("dead");
			}
			
		})

	}


	// Create Enemy Constructor

	Game.entity.Enemy = (function(){

		var Enemy = function(reactionTime) {
			// create div for enemy
			this.enemyDOMELement = document.createElement("div");
			this.enemyDOMELement.classList.add("gunman");
			
			// TODO delete consts > use calc reactionTime
			this.walkingTime = 3000;
			this.standingTime = 1000;
			this.shootingTime = 1800;

			this.fireStateFlag = false;
			// Text messages references
			this.textFire = Game.assets.textBox.fireText; 
			this.deadText = Game.assets.textBox.deadText;
			this.winText = Game.assets.textBox.winText;
			
			

		}; 


		Enemy.prototype.changeState = function(newState) {
			var _self = this;
			this.arena = DOMEntities.arena;
			this.state = newState;


	        
	        switch(this.state){
	            case 'going':
	            	// Start audio
	            	Game.assets.sounds.intro.loop = true;
	            	Game.assets.sounds.intro.play();
	            	// Add go animation
	            	this.enemyDOMELement.classList.add("gunman_go");
	        		this.arena.appendChild(this.enemyDOMELement);
	        		
	        		// Set position for battle
	        		$(this.enemyDOMELement).animate({right : "45%"},  this.walkingTime, "linear");
	        		this.enemyDOMELement.style.right = "45%";
	                break;

	            case 'standing':
	            	// Stop audio
	            	Game.assets.sounds.intro.pause();
	            	// Add standing position
	                this.enemyDOMELement.classList.remove("gunman_go");
	                this.enemyDOMELement.classList.add("gunman_stand");	                    
	                break;

	            case 'shooting':
	            	this.fireStateFlag = true;
	            	// Start fire audio
	            	Game.assets.sounds.fire.play();
	            	// Add shooting animation
	                this.enemyDOMELement.classList.remove("gunman_stand");
	                this.enemyDOMELement.classList.add("gunman_shooting");
	                // this.enemyDOMELement.style.animation = "shooting " + this.shootingTime / 1000 + "s steps(4)";
	                // Add Fire alert
	                this.arena.appendChild(this.textFire);

	                break;

	            case 'winning':
	            	// delete shooting event

	            	// Start winning audio
	            	Game.assets.sounds.death.play();
	            	// Add Dead Alert
	            	this.arena.removeChild(this.textFire);
	            	setTimeout(function() {	            		
	            		_self.arena.appendChild(_self.deadText);
	            		}, 100);

	            	
	                     
	                break;
	                
	            case 'dead':
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

        	// function(newPos)
        };


		return Enemy;
	})();

	// Create text messages

	Game.assets.textBox = {
		"fireText" : createTextBoxtContainer("FIRE!!!"),
		"deadText" : createTextBoxtContainer("You are dead!!!"),
		"winText" : createTextBoxtContainer("You win!!!")
	}

	// Create animations

	Game.assets.animations = {
		"animationWalking" : setClass("gunman_go")
	}

	// Create sounds effects

	Game.assets.sounds = {
		"fire" : new Audio("./sfx/fire.m4a"),
		"wait" : new Audio("./sfx/wait.m4a"),
		"death" : new Audio("./sfx/death.m4a"),
		"foul" : new Audio("./sfx/foul.m4a"),
		"intro" : new Audio("./sfx/intro.m4a"),
		"wait" : new Audio("./sfx/wait.m4a"),
		"shot" : new Audio("./sfx/shot.m4a"),
		"win" : new Audio("./sfx/win.m4a")
	}

	// Create timer object for calculate passed time after battle starts

	Game.timer = {
		init: function(battleTime) {
				Game.timer.initialTime = (new Date()).valueOf();

			  	Game.timer.inervalId = setInterval(function(){
		  		  Game.timer.currentTime = (new Date()).valueOf();
			 	}, 100);    
	    
			    // setTimeout(function(){
			    //   clearInterval(timer.inervalId);	      
			    // }, battleTime);
			},

	  	initialTime : null,
	  	currentTime : (new Date()).valueOf(),
	  	inervalId   : null,
	}


	function createTextBoxtContainer (textOutput) {
		var container = document.createElement("div");
		var content = document.createTextNode(textOutput);

		container.appendChild(content);
		container.classList.add("alert_message");

		return container;
	}

	function setClass (newClass) {
		var div = document.createElement(div)

		div.classList.add("gunman");
		div.classList.add(newClass);
		return div;
	} 



	// Create observer for game.timer object

	Object.observe(Game.timer, function(changes){    	
    	if (changes[0].name == "initialTime") return;
    	if (changes[0].name == "timerIsFinished") {
    		// game.state = "loose";    		
    	}

  		var interval = new MyInterval(Game.timer.currentTime - Game.timer.initialTime);
  		$('.time_gunman span, .time_user span').text(
  			interval.s + ' : ' + interval.ms);     
	});

	function MyInterval( interval ) {
	  var ret = {};
	  ret.interval = interval;
	  ret.s = Math.floor(interval/1000);
	  ret.ms = (function(){
	    var result = (ret.s) ? (interval-1000*ret.s)/10 : (interval/10);
	    return Math.floor(result);
	  })();	  
	  return ret;
	}
 

	$(document).on('click', '#start', function(event) {
    	Game.start();  
  	});

})();