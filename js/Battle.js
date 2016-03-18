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
	let state = newState;
	console.log("change state = ", state);
	let cowboy = this.cowboy;

	switch(state) {
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
		case "winning":
			break;
		default:
			break;
	}
}

export default Battle;