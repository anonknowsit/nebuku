"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let mainWindow = null;
let tray = null;
let closeToTray = true; // Default behavior
let userChoice = null; // Store user's choice
electron_1.app.isQuiting = false;
const settingsPath = path.join(electron_1.app.getPath("userData"), "settings.json");
function loadSettings() {
    try {
        const data = fs.readFileSync(settingsPath, "utf8");
        const settings = JSON.parse(data);
        closeToTray = settings.closeToTray;
    }
    catch (error) {
        console.log("No settings file found, using defaults");
    }
}
function saveSettings() {
    const data = JSON.stringify({ closeToTray });
    fs.writeFileSync(settingsPath, data);
}
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        width: 1200,
        height: 800,
        frame: false,
        icon: path.join(electron_1.app.getAppPath(), "assets", "icon.png"),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    mainWindow.loadFile(path.join(__dirname, "../index.html"));
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
    mainWindow.on("close", (event) => {
        if (!electron_1.app.isQuiting) {
            event.preventDefault();
            handleCloseAttempt();
        }
        return false;
    });
    createTray();
}
function handleCloseAttempt() {
    if (closeToTray) {
        mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.hide();
    }
    else {
        showCloseDialog();
    }
}
function showCloseDialog() {
    if (!mainWindow)
        return;
    let dialogWindow = new electron_1.BrowserWindow({
        width: 420,
        height: 220,
        parent: mainWindow,
        modal: true,
        frame: false,
        transparent: true,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        backgroundColor: "#00000000", // Transparent background
    });
    dialogWindow.loadFile(path.join(__dirname, "../closeDialog.html"));
    // Center the dialog on the parent window
    const [parentX, parentY] = mainWindow.getPosition();
    const [parentWidth, parentHeight] = mainWindow.getSize();
    const [dialogWidth, dialogHeight] = dialogWindow.getSize();
    const x = Math.round(parentX + (parentWidth - dialogWidth) / 2);
    const y = Math.round(parentY + (parentHeight - dialogHeight) / 2);
    dialogWindow.setPosition(x, y);
    electron_1.ipcMain.once("close-dialog-selection", (event, selection) => {
        if (selection === "minimize") {
            closeToTray = true;
            mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.hide();
        }
        else {
            electron_1.app.isQuiting = true;
            electron_1.app.quit();
        }
        saveSettings();
        updateTrayMenu();
        dialogWindow === null || dialogWindow === void 0 ? void 0 : dialogWindow.close();
    });
    dialogWindow.on("closed", () => {
        dialogWindow = null;
        electron_1.ipcMain.removeAllListeners("close-dialog-selection");
    });
}
function createTray() {
    const iconPath = path.join(electron_1.app.getAppPath(), "assets", "icon.png");
    tray = new electron_1.Tray(iconPath);
    updateTrayMenu();
    tray.on("click", () => {
        mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.show();
    });
}
function updateTrayMenu() {
    const contextMenu = electron_1.Menu.buildFromTemplate([
        {
            label: "Show App",
            click: () => {
                mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.show();
            },
        },
        {
            label: "Close to Tray",
            type: "checkbox",
            checked: closeToTray,
            click: () => {
                closeToTray = !closeToTray;
                saveSettings();
                updateTrayMenu();
            },
        },
        {
            label: "Quit",
            click: () => {
                electron_1.app.isQuiting = true;
                electron_1.app.quit();
            },
        },
    ]);
    tray === null || tray === void 0 ? void 0 : tray.setContextMenu(contextMenu);
    tray === null || tray === void 0 ? void 0 : tray.setToolTip("K8s Lens Clone");
}
electron_1.app.on("ready", () => {
    loadSettings();
    createWindow();
});
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});
electron_1.ipcMain.on("app-quit", () => {
    handleCloseAttempt();
});
electron_1.ipcMain.on("app-minimize", () => {
    mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.minimize();
});
electron_1.ipcMain.on("app-maximize", () => {
    if (mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.isMaximized()) {
        mainWindow.unmaximize();
    }
    else {
        mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.maximize();
    }
});
