"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("electronAPI", {
    minimize: function () {
        console.log("Minimize called from renderer");
        electron_1.ipcRenderer.send("minimize");
    },
    maximize: function () {
        console.log("Maximize called from renderer");
        electron_1.ipcRenderer.send("maximize");
    },
    close: function () {
        console.log("Close called from renderer");
        electron_1.ipcRenderer.send("close");
    },
});
