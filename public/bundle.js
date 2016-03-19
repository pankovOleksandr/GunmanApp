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
			battle.cowboyWin = setTimeout(function () {
				battle.changeState("cowboyWin");
			}, battle.delay.winningTime);
	
			document.addEventListener("click", function userShoot(e) {
				e.preventDefault();
				// player.shoot();
				_Sounds2.default.shoot.play();
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
		};
	
		Game.prototype.end = function () {};
	
		document.addEventListener("click", function startGame(e) {
			if (e.target.id === "start") {
				var _game = new Game();
				_game.init();
				_game.start();
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
			case "cowboyWin":
				// Start winning audio
				_Sounds2.default.death.play();
				// Add Dead Alert
				_Arena2.default.cowboyWin();
				// cowboy action
				cowboy.action("winning");
				break;
			case "faultStart":
				// Stop audio
				_Sounds2.default.intro.pause();
				_Arena2.default.showMenu();
	
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

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _ElementsDOM = __webpack_require__(/*! ./ElementsDOM */ 3);
	
	var _ElementsDOM2 = _interopRequireDefault(_ElementsDOM);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Enemy = function () {
	
		var Enemy = function Enemy(reactionTime) {
			this.element = _ElementsDOM2.default.cowboy;
			this.element.classList.add("gunman");
	
			// TODO delete consts > use calc reactionTime
			this.walkingTime = 5000;
			this.standingTime = 1000;
			this.shootingTime = 1500;
	
			this.fireStateFlag = false;
		};
	
		Enemy.prototype.action = function (newState) {
	
			var element = this.element;
	
			switch (newState) {
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
	
				case 'winning':
	
					break;
	
				case 'dead':
					$('.gunman_alert').hide();
					this.$gunman.removeClass("gunman_shooting").addClass("gunman_dead");
					setTimeout(function () {
						$(".gunman").hide();
					}, 1000);
					this.$result.text("Congratulations!!! You win!!!").appendTo(".wrapper");
					// Start audio
					Game.assets.sounds.win.play();
					// Add dead animation
					this.enemyDOMELement.classList.remove("gunman_shooting");
					this.enemyDOMELement.classList.add("gunman_dead");
					this.enemyDOMELement.style.animation = "dead 1s steps(1);";
					setTimeout(function () {
						_self.arena.removeChild(_self.textFire);
						_self.arena.appendChild(_self.winText);
						_self.arena.removeChild(_self.enemyDOMELement);
					}, 2500);
	
					break;
	
				default:
	
					break;
			};
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
		alertBox: {
			"fireText": createTextBoxtContainer("alertBox", "FIRE!!!"),
			"fastFire": createTextBoxtContainer("alertBox", "You are very fast")
		},
		resultBox: {
			"deadText": createTextBoxtContainer("resultBox", "You are dead!!!"),
			"winText": createTextBoxtContainer("resultBox", "You win!!!")
		}
	};
	
	function createTextBoxtContainer(typeBox, textOutput) {
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
				_ElementsDOM2.default.arena.appendChild(_ElementsDOM2.default.alertBox[newText]);
			},
			cowboyWin: function cowboyWin() {
				_ElementsDOM2.default.arena.removeChild(_ElementsDOM2.default.alertBox.fireText);
				setTimeout(function () {
					_ElementsDOM2.default.arena.appendChild(_ElementsDOM2.default.resultBox.deadText);
				}, 100);
				setTimeout(function () {
					_ElementsDOM2.default.arena.removeChild(_ElementsDOM2.default.cowboy);
				}, 2500);
			},
			showMenu: function showMenu() {
				while (_ElementsDOM2.default.arena.firstChild) {
					_ElementsDOM2.default.arena.removeChild(_ElementsDOM2.default.arena.firstChild);
				}
				_ElementsDOM2.default.arena.appendChild(_ElementsDOM2.default.menu);
			}
		};
	}();
	
	exports.default = Arena;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map