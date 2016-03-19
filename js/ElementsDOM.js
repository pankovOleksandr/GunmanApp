let DOM = {
		root: document.getElementById("root"),
		arena: document.getElementById("arena"),
		cowboy: document.createElement("div"),
		menu: document.getElementById("menu"),
		score: document.createElement("div"),
		alertBox: {
			"fireText" : createTextBoxtContainer("alertBox", "FIRE!!!"),
			"fastFire" : createTextBoxtContainer("alertBox", "You are very fast"),
		},
		resultBox: {
			"deadText" : createTextBoxtContainer("resultBox", "You are dead!!!"),
			"winText" : createTextBoxtContainer("resultBox", "You win!!!")
		} 
	}

	function createTextBoxtContainer (typeBox, textOutput) {
		var container = document.createElement("div");
		var content = document.createTextNode(textOutput);

		container.appendChild(content);
		switch (typeBox) {
			case "alertBox":
				container.classList.add("alert_message");
				break;
			case "resultBox":
				container.classList.add("result_msg");
				break;
			default:
				break;
		} 
		return container;
	}
export default DOM;