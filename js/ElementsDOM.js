let DOM = {
		root: document.getElementById("root"),
		arena: document.getElementById("arena"),
		cowboy: document.createElement("div"),
		menu: document.getElementById("menu"),
		score: document.createElement("div"),
		textBox: {
			"fireText" : createTextBoxtContainer("FIRE!!!"),
			"fastFire" : createTextBoxtContainer("You are very fast"),
			"deadText" : createTextBoxtContainer("You are dead!!!"),
			"winText" : createTextBoxtContainer("You win!!!")
		}
	}

	function createTextBoxtContainer (textOutput) {
		var container = document.createElement("div");
		var content = document.createTextNode(textOutput);

		container.appendChild(content);
		container.classList.add("alert_message");

		return container;
	}
export default DOM;