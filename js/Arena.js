import elements from './ElementsDOM'; 

let Arena = (function() {
	
	return {
		create() {
			elements.arena.removeChild(elements.menu);
		},
		alertMsg(newText) {
			elements.arena.appendChild(elements.alertBox[newText]);
		},
		cowboyWin() {
			elements.arena.removeChild(elements.alertBox.fireText);
			setTimeout(() => {
				elements.arena.appendChild(elements.resultBox.deadText);
			}, 100);			
		},
		showMenu() {
			deleteChilds(elements.arena);
			elements.arena.appendChild(elements.menu);
		},
		congratulation() {
			elements.arena.removeChild(elements.alertBox.fireText);
			elements.arena.appendChild(elements.resultBox.winText);
			
		}
	}

})();

function deleteChilds(parentNode) {
	while (parentNode.firstChild) {
				parentNode.removeChild(parentNode.firstChild);
			}
}

export default Arena;


