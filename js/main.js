import Battle from "./Battle";
import Sounds from "./Sounds";

(function () {	

	let Game = function (){
	};

	Game.prototype.init = function() {
		this.battle = new Battle();
	}

	Game.prototype.start = function() {
		let battle = this.battle;

		battle.changeState("begin");
		battle.prepareToFire = setTimeout(function() {battle.changeState("prepareToFire")} , battle.delay.prepareToFireTime);
		battle.shooting = setTimeout(function() {battle.changeState("shooting")} , battle.delay.shootingTime);
		battle.winning = setTimeout(function() {battle.changeState("winning")} , battle.delay.winningTime);

		document.addEventListener("click", function (e) {
			// player.shoot();
			Sounds.shoot.play();
			if (!e.target.classList.contains("gunman")) {
				console.log('You missed');
				return;
			}
			if (!battle.canFireFlag) {
				console.log('You are very fast');
			} else {
				clearInterval(battle.winning);				
			}		
		});
	}

	document.addEventListener("click", (e) => {		
		if(e.target.id === "start") {
			let game = new Game();
			game.init();
			game.start();
		}
	});

	



})()