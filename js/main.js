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
		battle.cowboyWin = setTimeout(function() {battle.changeState("cowboyWin")} , battle.delay.winningTime);

		document.addEventListener("click", function userShoot(e) {
			e.preventDefault();
			// player.shoot();
			Sounds.shoot.play();
			if (!e.target.classList.contains("gunman")) {
				console.log('You missed');
				return;
			}
			if (!battle.canFireFlag) {
				clearInterval(battle.prepareToFire);
				clearInterval(battle.shooting);
				clearInterval(battle.cowboyWin);
				battle.changeState("faultStart");
				console.log("game in", game);				
			} else {
				clearInterval(battle.cowboyWin);				
			}		
		});
	}

	Game.prototype.end = function() {
		
	}

	document.addEventListener("click", function startGame(e) {		
		if(e.target.id === "start") {
			let game = new Game();
			game.init();
			game.start();
		}
	});

	



})()