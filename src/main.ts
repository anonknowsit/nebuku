import { app, BrowserWindow, ipcMain, Menu, Tray } from "electron";
import * as fs from "fs";
import * as path from "path";

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;
let closeToTray = true; // Default behavior
let userChoice: "minimize" | "exit" | null = null; // Store user's choice

declare global {
  namespace Electron {
    interface App {
      isQuiting: boolean;
    }
  }
}

app.isQuiting = false;

const settingsPath = path.join(app.getPath("userData"), "settings.json");

function loadSettings() {
  try {
    const data = fs.readFileSync(settingsPath, "utf8");
    const settings = JSON.parse(data);
    closeToTray = settings.closeToTray;
  } catch (error) {
    console.log("No settings file found, using defaults");
  }
}

function saveSettings() {
  const data = JSON.stringify({ closeToTray });
  fs.writeFileSync(settingsPath, data);
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    icon: path.join(app.getAppPath(), "assets", "icon.png"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "../index.html"));

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  mainWindow.on("close", (event: Electron.Event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      handleCloseAttempt();
    }
    return false;
  });

  createTray();
}

function handleCloseAttempt() {
  if (closeToTray) {
    mainWindow?.hide();
  } else {
    showCloseDialog();
  }
}

function showCloseDialog() {
  if (!mainWindow) return;

  let dialogWindow: BrowserWindow | null = new BrowserWindow({
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

  ipcMain.once("close-dialog-selection", (event, selection) => {
    if (selection === "minimize") {
      closeToTray = true;
      mainWindow?.hide();
    } else {
      app.isQuiting = true;
      app.quit();
    }
    saveSettings();
    updateTrayMenu();
    dialogWindow?.close();
  });

  dialogWindow.on("closed", () => {
    dialogWindow = null;
    ipcMain.removeAllListeners("close-dialog-selection");
  });
}

function createTray() {
  const iconPath = path.join(app.getAppPath(), "assets", "icon.png");
  tray = new Tray(iconPath);
  updateTrayMenu();

  tray.on("click", () => {
    mainWindow?.show();
  });
}

function updateTrayMenu() {
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show App",
      click: () => {
        mainWindow?.show();
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
        app.isQuiting = true;
        app.quit();
      },
    },
  ]);

  tray?.setContextMenu(contextMenu);
  tray?.setToolTip("K8s Lens Clone");
}

app.on("ready", () => {
  loadSettings();
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("app-quit", () => {
  handleCloseAttempt();
});

ipcMain.on("app-minimize", () => {
  mainWindow?.minimize();
});

ipcMain.on("app-maximize", () => {
  if (mainWindow?.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow?.maximize();
  }
});
