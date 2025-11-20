
import { json } from "stream/consumers";
import * as amd from "../../src/main"

declare global {
    const __VERSION__: string;
}

const entry = amd.default();
const container = document.getElementById("emulator-container") as HTMLElement;
const api = {
    enginePath: (path: string) => path,

    triggerStateSave: async (): Promise<void> => {
        return new Promise((resolve) => {
            console.log("State save triggered");
            setTimeout(() => {
                const state = entry.getState()
                console.log("Saved state:", state);
                resolve();
            }, 200);
        });
    },
    triggerStateRestore: async (): Promise<void> => {
        return new Promise((resolve) => {
            console.log("State restore triggered");
            callSetState(null).then(() => {
                resolve();
            });
        });
    }
} as any;
const options = {} as any;

function callSetState(state: any): Promise<void> {
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

