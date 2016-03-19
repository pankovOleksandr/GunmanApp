import Elements from './ElementsDOM'; 

let Arena = (function() {
	
	return {
		create() {
			Elements.arena.removeChild(Elements.menu);
			Elements.arena.appendChild(Elements.cowboy);
		},
		alertMsg(newText) {
			Elements.arena.appendChild(Elements.alertBox[newText]);
		},
		cowboyWin() {
			Elements.arena.removeChild(Elements.alertBox.fireText);
			setTimeout(() => {
				Elements.arena.appendChild(Elements.resultBox.deadText);
			}, 100);
			setTimeout(() =>{
				Elements.arena.removeChild(Elements.cowboy);
			}, 2500)
		},
		showMenu() {
			while (Elements.arena.firstChild) {
				Elements.arena.removeChild(Elements.arena.firstChild);
			}
			Elements.arena.appendChild(Elements.menu);
		}
	}

})();

export default Arena;


