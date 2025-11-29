/******/ "use strict";
/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
/* unused harmony export define */
// const entry = {
//     init: (container: HTMLElement, api: any, options: any) => Promise.resolve(),
//     getState: () => ({}),
//     setState: (state: any) => { }
// }
function define(fn) {
    const entry = fn().default();
    const container = document.getElementById("emulator-container");
    const api = {
        enginePath: (path) => path,
        triggerStateSave: async () => {
            return new Promise((resolve) => {
                console.log("State save triggered");
                setTimeout(() => {
                    const state = entry.getState();
                    console.log("Saved state:", state);
                    resolve();
                }, 200);
            });
        },
        triggerStateRestore: async () => {
            return new Promise((resolve) => {
                console.log("State restore triggered");
                callSetState(null).then(() => {
                    resolve();
                });
            });
        }
    };
    const options = {};
    function callSetState(state) {
        return new Promise((resolve) => {
            setTimeout(() => {
                entry.setState(state);
                resolve();
            }, 200);
        });
    }
    fetch("engine.json").then(response => response.json()).then(async (engineManifest) => {
        console.log(engineManifest);
        options.data = engineManifest?.editor?.defaultData || {};
    }).then(() => {
        entry.init(container, api, options).then(() => {
            console.log("Engine initialized");
            // const lastState = localStorage.getItem("emulator-last-state");
            return fetch("savedata.json").then(response => {
                response.text().then(text => {
                    const lastState = (text.trim().startsWith("null") || text.trim().startsWith("undefined") || text.trim() === "") ? undefined : JSON.parse(text);
                    callSetState(lastState).then(() => {
                        console.log("Engine running");
                    });
                });
            });
        });
    });
}


//# sourceMappingURL=emulator.js.map