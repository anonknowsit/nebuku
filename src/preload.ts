import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  minimize: () => {
    console.log("Minimize called from renderer");
    ipcRenderer.send("minimize");
  },
  maximize: () => {
    console.log("Maximize called from renderer");
    ipcRenderer.send("maximize");
  },
  close: () => {
    console.log("Close called from renderer");
    ipcRenderer.send("close");
  },
});
