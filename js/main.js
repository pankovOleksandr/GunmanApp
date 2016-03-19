import Battle from "./Battle";
import Sounds from "./Sounds";

(function () {	

	let game = {
		init() {
			this.battle = new Battle();
		},
		start() {
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
					game.reset();				
				} else {
					clearInterval(battle.cowboyWin);
					battle.changeState("userWin");
				}		
			});	
		},
		reset() {
			this.battle = null;
		}
	}
	
	document.addEventListener("click", function startGame(e) {		
		if(e.target.id === "start") {
			
			game.init();
			game.start();
		}
	});

})()