import Elements from './ElementsDOM'; 

let Arena = (function() {
	
	return {
		create() {
			Elements.arena.removeChild(Elements.menu);
			Elements.arena.appendChild(Elements.cowboy);
		},
		alertMsg(newText) {
			Elements.arena.appendChild(Elements.textBox[newText]);
		}

	}

})();

export default Arena;


