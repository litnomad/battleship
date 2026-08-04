/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js"
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _logic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logic.js */ \"./src/logic.js\");\n\n\n\n\n//# sourceURL=webpack:///./src/dom.js?\n}");

/***/ },

/***/ "./src/logic.js"
/*!**********************!*\
  !*** ./src/logic.js ***!
  \**********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Player: () => (/* binding */ Player),\n/* harmony export */   Ship: () => (/* binding */ Ship),\n/* harmony export */   createBoard: () => (/* binding */ createBoard),\n/* harmony export */   placeShips: () => (/* binding */ placeShips)\n/* harmony export */ });\nclass Ship {\n  #hit = 0;\n  #sunk = false;\n  #length;\n\n  constructor(length) {\n    this.#length = length;\n  }\n\n  hit() {\n    this.#hit++;\n  }\n\n  isSunk() {\n    if (this.#hit === this.#length) {\n      this.#sunk = true;\n    }\n  }\n}\n\nfunction createBoard() {\n  const board = [];\n\n  // create rows\n  for (let i = 0; i < 10; i++) {\n    board.push([]);\n\n    // create columns\n    for (let j = 0; j < 10; j++) {\n      board[i].push([]);\n    }\n  }\n\n  return board;\n}\n\nfunction placeShips(coordinates, getBoard) {\n  let index = 0;\n\n  while (index < coordinates.length) {\n    const column = coordinates[index][0][0];\n    const row = coordinates[index][0][1];\n    const size = coordinates[index][1];\n\n    if (column > 10 || row > 10) {\n      throw new Error(\"Out of range. Coordinates must be between 0 and 10.\");\n    } else {\n      getBoard[column][row].push(new Ship(size));\n      // if length > 1, push adjacent?\n\n      index++;\n    }\n  }\n}\n\nclass Gameboard {\n  board = createBoard();\n\n  getBoard = () => this.board;\n\n  constructor([\n    [[a, b], length1],\n    [[c, d], length2],\n    [[e, f], length3],\n    [[g, h], length4],\n    [[i, j], length5],\n  ]) {\n    this.map = placeShips(\n      [\n        [[a, b], length1],\n        [[c, d], length2],\n        [[e, f], length3],\n        [[g, h], length4],\n        [[i, j], length5],\n      ],\n      this.getBoard(),\n    );\n  }\n\n  receiveAttack(column, row) {\n\n    if (this.board[column][row] == undefined) {\n      throw new Error(\"Out of range. Cooordinates must be between 0 and 10.\")\n    }\n\n    if (this.board[column][row].length > 0) {\n      this.board[column][row][0].hit();\n      console.log(this.board[column][row][0]);\n    } else {\n      this.board[column][row].push(\"miss\");\n      console.log(this.board[column][row][0]);\n    }\n  }\n\n  sunk() {\n    if (this.board.every(this.ship.sunk() === true)) {\n      return true;\n    }\n    return false;\n  }\n}\n\nclass Player {\n  constructor([\n    [[a, b], length1],\n    [[c, d], length2],\n    [[e, f], length3],\n    [[g, h], length4],\n    [[i, j], length5],\n  ]) {\n    this.board = new Gameboard([\n      [[a, b], length1],\n      [[c, d], length2],\n      [[e, f], length3],\n      [[g, h], length4],\n      [[i, j], length5],\n    ]);\n  }\n}\n\nconst player = new Player([\n  [[0, 8], 3],\n  [[5, 0], 4],\n  [[9, 5], 2],\n  [[5, 2], 5],\n  [[9, 7], 3],\n]);\n\nplayer.board.receiveAttack(0, 0);\nconsole.log(player.board.getBoard());\n\n\n\n\n//# sourceURL=webpack:///./src/logic.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	let __webpack_exports__ = __webpack_require__("./src/dom.js");
/******/ 	
/******/ })()
;