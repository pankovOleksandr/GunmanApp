import Cowboy from "./Enemy";
import Sounds from "./Sounds";
import Arena from "./Arena";

let Battle = function() {
	this.cowboy = new Cowboy();

	this.delay = {
		prepareToFireTime: this.cowboy.walkingTime,
		shootingTime: this.cowboy.walkingTime + this.cowboy.standingTime,
		winningTime: this.cowboy.walkingTime + this.cowboy.standingTime + this.cowboy.shootingTime
	};

	this.canFireFlag = false;	
}

Battle.prototype.changeState = function(newState) {
	console.log("change state = ", newState);
	let cowboy = this.cowboy;

	switch(newState) {
		case "begin":
			Arena.create();
			// Start audio
			Sounds.intro.loop = true;
			Sounds.intro.play();
			// cowboy action
			cowboy.action("going");
			break;
		case "prepareToFire":
			// Stop audio
	        Sounds.intro.pause();
	        // cowboy action
			cowboy.action("stand");
			break;	
		case "shooting":
			// Start fire audio
	        Sounds.fire.play();
	        // add info div with msg
	        Arena.alertMsg("fireText");
			
			this.canFireFlag = true;
			// cowboy action
			cowboy.action("shooting");
			break;
		case "cowboyWin":
			Sounds.death.play();
        	// Add Dead Alert
        	Arena.cowboyWin();
        	cowboy.action("winning");
			break;
		case "faultStart":
			Sounds.intro.pause();
	        Arena.showMenu();
	        break;
	    case "userWin":
	    	Sounds.win.play();
	    	cowboy.action("dead");
	    	Arena.congratulation();
	    	break;

		default:
			break;
	}
}

export default Battle;