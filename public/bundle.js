/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Battle = __webpack_require__(/*! ./Battle */ 1);
	
	var _Battle2 = _interopRequireDefault(_Battle);
	
	var _Sounds = __webpack_require__(/*! ./Sounds */ 4);
	
	var _Sounds2 = _interopRequireDefault(_Sounds);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(function () {
	
		var Game = function Game() {};
	
		Game.prototype.init = function () {
			this.battle = new _Battle2.default();
		};
	
		Game.prototype.start = function () {
			var battle = this.battle;
	
			battle.changeState("begin");
			battle.prepareToFire = setTimeout(function () {
				battle.changeState("prepareToFire");
			}, battle.delay.prepareToFireTime);
			battle.shooting = setTimeout(function () {
				battle.changeState("shooting");
			}, battle.delay.shootingTime);
			battle.winning = setTimeout(function () {
				battle.changeState("winning");
			}, battle.delay.winningTime);
	
			document.addEventListener("click", function (e) {
				// player.shoot();
				_Sounds2.default.shoot.play();
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
		};
	
		document.addEventListener("click", function (e) {
			if (e.target.id === "start") {
				var game = new Game();
				game.init();
				game.start();
			}
		});
	})();

/***/ },
/* 1 */
/*!**********************!*\
  !*** ./js/Battle.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _Enemy = __webpack_require__(/*! ./Enemy */ 2);
	
	var _Enemy2 = _interopRequireDefault(_Enemy);
	
	var _Sounds = __webpack_require__(/*! ./Sounds */ 4);
	
	var _Sounds2 = _interopRequireDefault(_Sounds);
	
	var _Arena = __webpack_require__(/*! ./Arena */ 5);
	
	var _Arena2 = _interopRequireDefault(_Arena);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Battle = function Battle() {
		this.cowboy = new _Enemy2.default();
	
		this.delay = {
			prepareToFireTime: this.cowboy.walkingTime,
			shootingTime: this.cowboy.walkingTime + this.cowboy.standingTime,
			winningTime: this.cowboy.walkingTime + this.cowboy.standingTime + this.cowboy.shootingTime
		};
	
		this.canFireFlag = false;
	};
	
	Battle.prototype.changeState = function (newState) {
		var state = newState;
		console.log("change state = ", state);
		var cowboy = this.cowboy;
	
		switch (state) {
			case "begin":
				_Arena2.default.create();
				// Start audio
				_Sounds2.default.intro.loop = true;
				_Sounds2.default.intro.play();
				// cowboy action
				cowboy.action("going");
				break;
			case "prepareToFire":
				// Stop audio
				_Sounds2.default.intro.pause();
				// cowboy action
				cowboy.action("stand");
				break;
			case "shooting":
				// Start fire audio
				_Sounds2.default.fire.play();
				// add info div with msg
				_Arena2.default.alertMsg("fireText");
	
				this.canFireFlag = true;
				// cowboy action
				cowboy.action("shooting");
				break;
			case "winning":
				break;
			default:
				break;
		}
	};
	
	exports.default = Battle;

/***/ },
/* 2 */
/*!*********************!*\
  !*** ./js/Enemy.js ***!
  \*********************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _ElementsDOM = __webpack_require__(/*! ./ElementsDOM */ 3);
	
	var _ElementsDOM2 = _interopRequireDefault(_ElementsDOM);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var element = _ElementsDOM2.default.cowboy;
	
	var Enemy = function () {
	
		var Enemy = function Enemy(reactionTime) {
			// create div for enemy
			// element = document.createElement("div");
	
			element.id = "cowboy";
			element.classList.add("gunman");
	
			// TODO delete consts > use calc reactionTime
			this.walkingTime = 3000;
			this.standingTime = 1000;
			this.shootingTime = 1500;
	
			this.fireStateFlag = false;
			// Text messages references
			// this.textFire = Game.assets.textBox.fireText;
			// this.deadText = Game.assets.textBox.deadText;
			// this.winText = Game.assets.textBox.winText;		
		};
	
		Enemy.prototype.action = function (newState) {
			var _self = this;
			this.state = newState;
	
			switch (this.state) {
				case 'going':
					// Add go animation
					element.classList.add("gunman_go");
					// Set position for battle
					$(element).animate({ right: "50%" }, this.walkingTime, "linear");
	
					break;
	
				case 'stand':
					// Add standing position
					element.classList.remove("gunman_go");
					element.classList.add("gunman_stand");
					break;
	
				case 'shooting':
					// Add shooting animation
					element.classList.remove("gunman_stand");
					element.classList.add("gunman_shooting");
					element.style.animation = "shooting " + this.shootingTime / 1000 + "s steps(4)";
					break;
	
				// case 'winning':
				// 	// delete shooting event
	
				// 	// Start winning audio
				// 	Game.assets.sounds.death.play();
				// 	// Add Dead Alert
				// 	this.arena.removeChild(this.textFire);
				// 	setTimeout(function() {	            		
				// 		_self.arena.appendChild(_self.deadText);
				// 		}, 100);
	
				//     break;
	
				// case 'dead':
				// 	// Start audio
				// 	Game.assets.sounds.win.play();
				// 	// Add dead animation
				// 	element.classList.remove("gunman_shooting");
				//     element.classList.add("gunman_dead");
				//     element.style.animation = "dead 1s steps(1);";
				//     setTimeout(function() {
				//     	_self.arena.removeChild(_self.textFire);
				//     	_self.arena.appendChild(_self.winText);
				//     	_self.arena.removeChild(_self.enemyDOMELement);
				//     }, 2500);
	
				//     break;
	
				default:
	
					break;
			};
	
			// function(newPos)
		};
	
		return Enemy;
	}();
	
	exports.default = Enemy;

/***/ },
/* 3 */
/*!***************************!*\
  !*** ./js/ElementsDOM.js ***!
  \***************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var DOM = {
		root: document.getElementById("root"),
		arena: document.getElementById("arena"),
		cowboy: document.createElement("div"),
		menu: document.getElementById("menu"),
		score: document.createElement("div"),
		textBox: {
			"fireText": createTextBoxtContainer("FIRE!!!"),
			"fastFire": createTextBoxtContainer("You are very fast"),
			"deadText": createTextBoxtContainer("You are dead!!!"),
			"winText": createTextBoxtContainer("You win!!!")
		}
	};
	
	function createTextBoxtContainer(textOutput) {
		var container = document.createElement("div");
		var content = document.createTextNode(textOutput);
	
		container.appendChild(content);
		container.classList.add("alert_message");
	
		return container;
	}
	exports.default = DOM;

/***/ },
/* 4 */
/*!**********************!*\
  !*** ./js/Sounds.js ***!
  \**********************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _Sounds;
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	// Create sounds effects
	var Sounds = (_Sounds = {
		"fire": new Audio("./sfx/fire.m4a"),
		"wait": new Audio("./sfx/wait.m4a"),
		"death": new Audio("./sfx/death.m4a"),
		"foul": new Audio("./sfx/foul.m4a"),
		"intro": new Audio("./sfx/intro.m4a")
	}, _defineProperty(_Sounds, "wait", new Audio("./sfx/wait.m4a")), _defineProperty(_Sounds, "shoot", new Audio("./sfx/shot.m4a")), _defineProperty(_Sounds, "win", new Audio("./sfx/win.m4a")), _Sounds);
	
	exports.default = Sounds;

/***/ },
/* 5 */
/*!*********************!*\
  !*** ./js/Arena.js ***!
  \*********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _ElementsDOM = __webpack_require__(/*! ./ElementsDOM */ 3);
	
	var _ElementsDOM2 = _interopRequireDefault(_ElementsDOM);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Arena = function () {
	
		return {
			create: function create() {
				_ElementsDOM2.default.arena.removeChild(_ElementsDOM2.default.menu);
				_ElementsDOM2.default.arena.appendChild(_ElementsDOM2.default.cowboy);
			},
			alertMsg: function alertMsg(newText) {
				_ElementsDOM2.default.arena.appendChild(_ElementsDOM2.default.textBox[newText]);
			}
		};
	}();
	
	exports.default = Arena;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map